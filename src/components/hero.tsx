'use client'

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Shield, Trophy } from 'lucide-react';
import Link from 'next/link'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        100
      );

      const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-30"
      ></canvas>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Discover the Next</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Generation of Tokens
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              Join the most secure and transparent launchpad platform for early
              access to innovative blockchain projects vetted by experts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/projects">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full sm:w-auto px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="bg-gray-800 hover:bg-gray-700 text-white w-full sm:w-auto px-8 py-3 rounded-xl font-medium transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="font-semibold">Fast</span>
                </div>
                <p className="text-gray-400 text-sm">Quick participation</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="font-semibold">Secure</span>
                </div>
                <p className="text-gray-400 text-sm">Vetted projects</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center mb-2">
                  <Trophy className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="font-semibold">Proven</span>
                </div>
                <p className="text-gray-400 text-sm">100+ launches</p>
              </div>
            </div>
          </div>

          <div className="mx-auto lg:mx-0 max-w-md">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-xl mb-6">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl">NOVA Token</h3>
                      <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded">
                        Live Now
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      The future of decentralized AI computing
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Raised</span>
                    <span className="font-medium">3.2M / 5M USDC</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: '64%' }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm pt-2">
                    <div>
                      <span className="text-gray-400 block">Price</span>
                      <span className="font-medium">0.05 USDC</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Ends in</span>
                      <span className="font-medium">2d 14h 22m</span>
                    </div>
                  </div>

                  <button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all">
                    Participate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero