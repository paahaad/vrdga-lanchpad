use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface, transfer_checked},
};

use anchor_spl::token_interface;
use anchor_spl::token_interface::MintTo;
pub mod math;
pub mod state;
pub mod error;

use error::VRGDAError;
use math::cast::Cast;
use state::{Schedule, VRGDA};


declare_id!("2vUvbNpNc1PrALu9qCEkU1KmaoKu7tz9yMWSopgnf9ZB");

#[program]
pub mod vrgda {

    use anchor_spl::token_2022::{spl_token_2022::solana_zk_token_sdk::instruction::transfer, TransferChecked};

    use crate::math::{calculate_refund, to_mint_amount};

    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        target_price: u64,
        decay_constant_percent: u64,
        vrgda_start_timestamp: i64,
        total_supply: u64,
        r: i128,
    ) -> Result<()> {
        let vrgda = &mut ctx.accounts.vrgda;
        vrgda.total_supply = total_supply;
        vrgda.target_price = target_price;
        vrgda.decay_constant_percent = decay_constant_percent; 
        vrgda.schedule = Schedule::LinearSchedule { r };
        vrgda.tokens_sold = 0;
        vrgda.created_at_timestamp = Clock::get()?.unix_timestamp.cast::<i64>()?;

        vrgda.vrgda_start_timestamp = if vrgda_start_timestamp < Clock::get()?.unix_timestamp.cast::<i64>()? {
            Clock::get()?.unix_timestamp.cast::<i64>()?
        } else {
            vrgda_start_timestamp
        };

        vrgda.authority = *ctx.accounts.authority.key;
        vrgda.mint = ctx.accounts.mint.key();
        vrgda.bump = ctx.bumps.vrgda;
        // Add mint to vrgda_vault
        msg!("Minting token to associated token account...");
        
        token_interface::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.vrgda_vault.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            total_supply,
        )?;

        msg!("VRGDA PDA: {:?}", vrgda.key());
        msg!("VRGDA Mint: {:?}", vrgda.mint);
        msg!("VRGDA Authority: {:?}", vrgda.authority);
        msg!("VRGDA VAULT: {:?}", ctx.accounts.vrgda_vault.key());
        msg!("VRGDA TOTAL SUPPLY: {}", vrgda.total_supply);
        msg!("VRGDA TARGET PRICE: {}", vrgda.target_price);
        msg!("VRGDA DECAY CONSTANT: {}", vrgda.decay_constant_percent);
        msg!("VRGDA SCHEDULE: {:?}", vrgda.schedule);
        msg!("VRGDA CREATED AT TIMESTAMP: {}", vrgda.created_at_timestamp);
        msg!("VRDGA START TIMESTAMP: {}", vrgda.vrgda_start_timestamp);
        Ok(())
    }

    pub fn buy(ctx: Context<Buy>, amount: u64) -> Result<()> {
        {
            // First, update the VRGDA state in its own scope.
            let vrgda = &mut ctx.accounts.vrgda;
            require!(amount != 0, VRGDAError::AmountCantBeZero);
            require!(amount < vrgda.total_supply, VRGDAError::AmountExceedsTotalSupply);

            require!(vrgda.auction_ended == false, VRGDAError::AuctionEnded);

            vrgda.total_supply = vrgda.total_supply.checked_sub(amount).unwrap();
            vrgda.tokens_sold = vrgda.tokens_sold.checked_add(amount).unwrap();
    
            let now = Clock::get()?.unix_timestamp;
            let sold = vrgda.tokens_sold;
            let schedule = &vrgda.schedule;
    
            msg!("Now: {}", now);
            msg!("Tokens sold: {}", sold);
            msg!("R val: {:?}", schedule);
    
            let price_in_sol = vrgda.vrgda_price(now, sold)?;
            let price_scaled_down = to_mint_amount(&price_in_sol, ctx.accounts.mint.decimals, false);
            msg!("Price in SOL: {:?}", price_scaled_down);
    
            // Save the updated current_price in state.
            vrgda.current_price = price_scaled_down;
        } // <- The mutable borrow of ctx.accounts.vrgda ends here.
    
        // Now, create the signer seeds using the (immutable) account data.
        let mint_key = ctx.accounts.vrgda.mint;
        let authority_key = ctx.accounts.vrgda.authority;
        let bump = ctx.accounts.vrgda.bump;
    
        let vrgda = &ctx.accounts.vrgda;
         // transfer from buyer to vrgda_wallet
         transfer_checked(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                TransferChecked {
                    from: ctx.accounts.buyer_wsol_ata.to_account_info(),
                    to: ctx.accounts.vrgda_sol_ata.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                    mint: ctx.accounts.wsol_mint.to_account_info(),
                },
            ),
            vrgda.current_price,
            ctx.accounts.wsol_mint.decimals,
        )?;
        
        let vrgda_seeds = &[
            b"vrgda".as_ref(),
            mint_key.as_ref(),
            authority_key.as_ref(),
            &[bump],
        ];
        let signer = &[&vrgda_seeds[..]];
    
        // Call the CPI to mint tokens.
        token_interface::transfer_checked(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                TransferChecked {
                    from: ctx.accounts.vrgda_vault.to_account_info(),
                    to: ctx.accounts.buyer_ata.to_account_info(),
                    authority: ctx.accounts.vrgda.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                },
            ).with_signer(signer),
            amount,
            ctx.accounts.mint.decimals,
        )?;
    
        Ok(())
    }


    pub fn close_auction(ctx: Context<CloseAuction>) -> Result<()> {
        require!(ctx.accounts.vrgda.auction_ended == false, VRGDAError::AuctionEnded);
        // Close the VRGDA account and transfer any remaining SOL to the authority.
        {
            let vrgda = &mut ctx.accounts.vrgda;
            vrgda.auction_ended = true;
        }

        let authority = &ctx.accounts.authority;

        let vrgda = &ctx.accounts.vrgda;
        // Transfer any remaining SOL from the VRGDA vault to the authority.
        let remaining_sol = ctx.accounts.vrgda_sol_ata.amount;
        if remaining_sol > 0 {
            token_interface::transfer_checked(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    TransferChecked {
                        from: ctx.accounts.vrgda_sol_ata.to_account_info(),
                        mint: ctx.accounts.wsol_mint.to_account_info(),
                        to: ctx.accounts.authority.to_account_info(),
                        authority: ctx.accounts.vrgda.to_account_info(),
                    },
                ),
                remaining_sol,
                ctx.accounts.wsol_mint.decimals,
            )?;
        }
        // Close the VRGDA account and transfer any remaining tokens to the authority.
        vrgda.close(authority.to_account_info())?;

        Ok(())
    }

    // pub fn sell(ctx: Context<Sell>, amount: u64) -> Result<()> {
    //     // Make sure the seller is not trying to sell 0 tokens.
    //     require!(amount != 0, VRGDAError::AmountCantBeZero);
    //     // It makes sense to require that the amount to sell is no more than what has been sold
    //     // (i.e. the VRGDA’s tokens_sold value), so that we can “reverse” part of the sale.
    //     require!(amount <= ctx.accounts.vrgda.tokens_sold, VRGDAError::AmountExceedsTotalSupply);

    //     // Get the current time (in seconds) as a fixed-point i128.
    //     let now = Clock::get()?.unix_timestamp;
    //     let sold = ctx.accounts.vrgda.tokens_sold;
    //     let schedule = &ctx.accounts.vrgda.schedule;

    //     // Compute the current price per token according to the VRGDA pricing formula.
    //     let price_in_sol = ctx.accounts.vrgda.vrgda_price(now, sold)?;
    //     msg!("Current price per token in SOL: {:?}", price_in_sol);

    //     // Compute the total refund as (price per token) * (amount being sold)
    //     let refund = calculate_refund(amount, &ctx.accounts.wsol_mint, price_in_sol);

    //     msg!("Total refund amount in SOL: {}", refund);

    //       // Prepare the VRGDA PDA signer seeds – they must match the ones used when minting.
    //     let vrgda_seeds = &[
    //         b"vrgda".as_ref(),
    //         ctx.accounts.vrgda.mint.as_ref(),
    //         ctx.accounts.authority.key.as_ref(),
    //         &[ctx.accounts.vrgda.bump],
    //     ];
    //     let signer = &[&vrgda_seeds[..]];
    //     // Burn the tokens from the seller's token account.
    //     // This call burns `amount` tokens from seller_ata.
    //     token_interface::burn(
    //         CpiContext::new(
    //             ctx.accounts.token_program.to_account_info(),
    //             token_interface::Burn {
    //                 mint: ctx.accounts.mint.to_account_info(),
    //                 from: ctx.accounts.seller_ata.to_account_info(),
    //                 authority: ctx.accounts.seller.to_account_info(),
    //             },
    //         ).with_signer(signer),
    //         amount,
    //     )?;

      

    //     // Transfer WSOL from the VRGDA WSOL vault back to the seller's WSOL account.
    //     anchor_spl::token::transfer_checked(
    //         CpiContext::new_with_signer(
    //             ctx.accounts.token_program.to_account_info(),
    //             anchor_spl::token::TransferChecked {
    //                 from: ctx.accounts.vrgda_sol_ata.to_account_info(),
    //                 to: ctx.accounts.seller_wsol_ata.to_account_info(),
    //                 // The VRGDA account acts as the authority over the WSOL vault, so we use it as signer.
    //                 authority: ctx.accounts.vrgda.to_account_info(),
    //                 mint: ctx.accounts.wsol_mint.to_account_info(),
    //             },
    //             signer,
    //         ),
    //         refund,
    //         ctx.accounts.wsol_mint.decimals,
    //     )?;

    //     // Update VRGDA state: when selling tokens back, the tokens sold decreases
    //     // and the total supply increases.
    //     let vrgda = &mut ctx.accounts.vrgda;
    //     vrgda.tokens_sold = vrgda.tokens_sold.checked_sub(amount).unwrap();
    //     vrgda.total_supply = vrgda.total_supply.checked_add(amount).unwrap();
    //     vrgda.current_price = refund;

    //     Ok(())
    // }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + VRGDA::INIT_SPACE,
        seeds = [b"vrgda".as_ref(), mint.key().as_ref(), authority.key().as_ref()],
        bump
    )]
    pub vrgda: Box<Account<'info, state::VRGDA>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = vrgda,
        associated_token::token_program = token_program,
    )]
    pub vrgda_vault: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mint::token_program = token_program,
    )]
    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = wsol_mint,
        associated_token::authority = authority,
        associated_token::token_program = token_program,
    )]
    pub vrgda_sol_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        // address = WSOL_MINT,
        mint::token_program = token_program,
    )]
    pub wsol_mint: InterfaceAccount<'info, Mint>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Buy<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        mut,
        has_one = mint,
        has_one = authority,
    )]
    pub vrgda: Box<Account<'info, state::VRGDA>>,

    #[account(
        mut,
        address = vrgda.mint,
        mint::token_program = token_program,
    )]
    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        // address = WSOL_MINT,
        mint::token_program = token_program,
    )]
    pub wsol_mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = wsol_mint,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
    )]
    pub buyer_wsol_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = buyer,
        associated_token::token_program = token_program,
        // constraint = buyer_ata.owner == buyer.key() @ VRGDAError::AddressesDontMatch,
    )]
    pub buyer_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = vrgda,
        associated_token::token_program = token_program,
        // constraint = vrgda_vault.owner == vrgda.key() @ VRGDAError::AddressesDontMatch,
    )]
    pub vrgda_vault: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        mut,
        associated_token::mint = wsol_mint,
        associated_token::authority = authority,
        associated_token::token_program = token_program,
    )]
    pub vrgda_sol_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    /// CHECK: checked in the constraint has_one
    #[account(
        address = vrgda.authority,
    )]
    pub authority: AccountInfo<'info>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CloseAuction<'info> {
    #[account(
        mut,
        address = vrgda.authority,
    )]
    pub authority: Signer<'info>,

    #[account(
        mut,
        close = authority,
        address = vrgda.mint,
        has_one = authority,
    )]
    pub vrgda: Box<Account<'info, state::VRGDA>>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = vrgda,
        associated_token::token_program = token_program,
    )]
    pub vrgda_vault: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        associated_token::mint = wsol_mint,
        associated_token::authority = authority,
        associated_token::token_program = token_program,
    )]
    pub vrgda_sol_ata: Box<InterfaceAccount<'info, TokenAccount>>,
   
    #[account(
        mut,
        mint::token_program = token_program,
    )]
    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        mint::token_program = token_program,
    )]
    pub wsol_mint: InterfaceAccount<'info, Mint>,

    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}