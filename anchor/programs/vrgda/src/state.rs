
use math::{
    cast::Cast,
    utils::{to_wad, wad_exp_checked, wad_mul, VrgdaSchedule, Wad, WAD},
};

use crate::{error::VrgdaResult, math::{precise_number::PreciseNumber, ONE, ONE_PREC, U192}};
use super::*;

pub const WSOL_MINT: Pubkey = Pubkey::new_from_array([
    5, 75, 241, 90, 194, 246, 107, 215, 197, 77, 10, 129, 16, 97, 158, 122, 32, 92, 138, 255, 155,
    78, 106, 228, 38, 81, 21, 101, 179, 158, 220, 99,
]);

#[account]
#[derive(InitSpace)]
pub struct VRGDA {
    pub mint: Pubkey,
    // The max amount that can be minted to a buyer's account.
    pub total_supply: u64,
    /// The account that receives payments.
    pub authority: Pubkey,
    /// The target price for a token (wad).
    pub target_price: u64, // p0
    /// The decay constant (wad) computed as ln(1 - price_decay_percent).
    pub decay_constant_percent: u64, // k
    /// Number of tokens sold so far.
    pub tokens_sold: u64,
    /// The timestamp at which this account was initialized.
    pub created_at_timestamp: i64,
    /// Unix timestamp when the VRGDA began.
    pub vrgda_start_timestamp: i64,
    /// ended?
    pub auction_ended: bool,
    pub schedule: Schedule,
    pub current_price: u64,
    /// Bump for PDA.
    pub bump: u8,
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone, Debug, InitSpace)]
pub enum Schedule {
    LinearSchedule { r: i128 },
}

impl VrgdaSchedule for Schedule {
    fn get_target_sale_time(&self, sold: Wad) -> Wad {
        match self {
            Schedule::LinearSchedule { r } => sold.saturating_mul(WAD) / r,
        }
    }
}

impl VRGDA {
    pub fn new(
        mint: Pubkey,
        authority: Pubkey,
        target_price: u64,
        decay_constant_percent: u64,
        schedule: Schedule,
        created_at_timestamp: i64,
        vrgda_start_timestamp: i64,
        bump: u8,
    ) -> Self {
        Self {
            mint,
            total_supply: 0,
            authority,
            target_price,
            decay_constant_percent,
            tokens_sold: 0,
            created_at_timestamp,
            vrgda_start_timestamp,
            auction_ended: false,
            schedule,
            current_price: 0,
            bump,
        }
    }
    // pub fn get_vrgda_price<T: VrgdaSchedule>(
    //     &self,
    //     time_since_start: Wad,
    //     sold: u64,
    //     schedule: &T,
    // ) -> Wad {
    //     // Convert sold + 1 to wad (the formula uses the nth token, sold is n-1).
    //     let sold_wad = to_wad(sold + 1);
    //     // Get the target sale time for this token (wad)
    //     let target_sale_time = schedule.get_target_sale_time(sold_wad);
    //     // Compute the time deviation: current time minus target sale time.
    //     let time_deviation = time_since_start - target_sale_time;
    //     // Multiply the deviation by the decay constant.
    //     let exponent = wad_mul(to_wad(self.decay_constant_percent), time_deviation);
    //     // Compute the multiplier using our wad exponentiation function.
    //     let multiplier = wad_exp_checked(exponent).expect("ERROR OCCURED IN WAD EXP CHECKED");
    //     // Final price: target_price * multiplier.
    //     wad_mul(self.target_price.cast().unwrap(), multiplier)
    // }

    fn f_inverse(&self, n: u64) -> PreciseNumber {
        // Match on the schedule variant.
        match self.schedule {
            // In the LinearSchedule variant, we assume `r` is positive.
            Schedule::LinearSchedule { r } => {
                // Multiply n by wad to get it in fixed-point.
                let n_fixed = PreciseNumber::new(n as u128)
                    .unwrap();
                    // .checked_mul(&PreciseNumber::new(wad).unwrap())
                    // .unwrap();
                // Convert r into a PreciseNumber.
                let r_fixed = PreciseNumber::new(r as u128).unwrap();
                // Divide to get the target sale time.
                n_fixed
                .checked_mul(&ONE_PREC)
                .unwrap()
                .checked_div(&r_fixed).unwrap()
            }
        }
    }

    pub fn vrgda_price(&self, now: i64, sold: u64) -> VrgdaResult<PreciseNumber> {
        // Compute time elapsed since auction start (t - t₀) and scale it (wad).
        let time_since_start = PreciseNumber::new(now as u128)
            .unwrap()
            .checked_sub(&PreciseNumber::new(self.vrgda_start_timestamp as u128).unwrap())
            .ok_or(VRGDAError::MathOverflow)?
            .checked_mul(&ONE_PREC)
            .unwrap();
        msg!("TIME SINCE START: {:?}", time_since_start);
    
        // f⁻¹(n) for the (sold + 1)th token.
        let f_inv = self.f_inverse(sold + 1u64);
        msg!("F INVERSE (TIME): {:?}", f_inv);
    
        // Compute the deviation: (t - t₀) - f⁻¹(n)
        let exponent_input = 
        
        // if f_inv.value > time_since_start.value {
        //     // If f_inv is larger, log detailed information for debugging
        //     msg!("F INVERSE: {:?}", f_inv);
        //     msg!("TIME SINCE START: {:?}", time_since_start);
        //     msg!("F INV VALUE: {}", f_inv.value);
        //     msg!("TIME SINCE START VALUE: {}", time_since_start.value);
            
        //     return Err(VRGDAError::ExponentErrorInTMinusFInverse);
        // } else {
            
        time_since_start
            .signed()
            .checked_sub(&f_inv.signed())
            .ok_or(VRGDAError::ExponentErrorInTMinusFInverse)?;
        // };

        let normalized_exponent_input = exponent_input
            .checked_div(&ONE_PREC.signed())
            .unwrap();
        msg!("Normalized T MINUS F INVERSE: {:?}", normalized_exponent_input);
    
        // Convert the decay percentage (for example, if it’s 50, we want 0.50) into wad units.
        // Here we assume ONE_PREC is your wad constant (e.g. 1e18).
        let decay_fraction = PreciseNumber::new(self.decay_constant_percent as u128)
            .unwrap()
            .checked_mul(&ONE_PREC)
            .unwrap()
            .checked_div(&PreciseNumber::new(100).unwrap())
            .unwrap();
        
        msg!("DECAY FRACTION (wad): {:?}", decay_fraction);
        // Compute 1 - k in wad form.
        let one = PreciseNumber::new(ONE).unwrap();
        msg!("ONE (wad): {:?}", one);

        let one_minus_k = one.checked_sub(&decay_fraction).ok_or(VRGDAError::OneMinusKError)?;
        msg!("ONE MINUS K (wad): {:?}", one_minus_k);
    
        // *** FIX: Normalize one_minus_k by dividing by ONE_PREC so that the log function gets a number < 1.
        let normalized_one_minus_k = one_minus_k
            .checked_div(&PreciseNumber::new(ONE).unwrap())
            .unwrap();
        msg!("Normalized ONE MINUS K: {:?}", normalized_one_minus_k);
    
        // Compute ln(1 - k) on the normalized value. Now ln(normalized_one_minus_k)
        // should be negative (e.g. ln(0.5) ≈ -0.693...).
        let ln_one_minus_k = normalized_one_minus_k.log().ok_or(VRGDAError::LogError)?;
        msg!("ln(ONE MINUS K): {:?}", ln_one_minus_k);
    
        // Convert exponent_input to a signed number.
        // let exponent_input_signed = exponent_input.signed();
    
        // let normalized_exponent_input_signed = normalized_exponent_input.signed();
        // Multiply to get the raw exponent: (t - t₀ - f⁻¹(n)) * ln(1 - k)
        let raw_exponent = normalized_exponent_input
            .checked_mul(&ln_one_minus_k)
            .and_then(|result| {
                // More explicit bounds checking
                if result.value > PreciseNumber::new(u64::MAX as u128).unwrap() ||
                result.value < PreciseNumber::new(0).unwrap() {
                    msg!("Exponent out of bounds: {:?}", result);
                    None
                } else {
                    Some(result)
                }
            })
            .ok_or(VRGDAError::ExponentError)?;
        msg!("RAW EXPONENT (pre-scale): {:?}", raw_exponent);
    
        // Since time_since_start was scaled by ONE_PREC and we normalized ln(1-k),
        // the product is off by ONE_PREC. Downscale by dividing by ONE_PREC.
        // let exponent = raw_exponent
        //     .checked_div(&PreciseNumber::new(ONE).unwrap().signed())
        //     .ok_or(VRGDAError::DivisionError)?;
        // msg!("SCALED EXPONENT: {:?}", exponent);
    
        // Compute the multiplier: e^(exponent)
        let multiplier = raw_exponent.exp().ok_or(VRGDAError::ExponentTooLarge)?;
        msg!("MULTIPLIER: {:?}", multiplier);
    
        // Multiply the target price (converted to a PreciseNumber) by the multiplier.
        let target_price_scaled = PreciseNumber::new(self.target_price as u128).unwrap();
        Ok(target_price_scaled.checked_mul(&multiplier).unwrap())
    }
}