"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;

  constructor(w: number, h: number, dpr: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.baseVx = (Math.random() - 0.5) * 0.6 * dpr;
    this.baseVy = (Math.random() - 0.5) * 0.6 * dpr;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    this.radius = (Math.random() * 1.5 + 0.5) * dpr;
    this.alpha = Math.random() * 0.5 + 0.15;
  }

  update(
    w: number,
    h: number,
    mouse: { x: number; y: number; radius: number },
    dpr: number
  ) {
    // Basic screen boundary collision or continuous movement
    this.x += this.vx;
    this.y += this.vy;

    // Bounce back from boundaries
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    // Mouse interactivity logic
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouse.radius) {
      const forceDirectionX = dx / dist;
      const forceDirectionY = dy / dist;
      const force = (mouse.radius - dist) / mouse.radius;

      // Pushing particles away from the mouse
      const pushX = -forceDirectionX * force * 3 * dpr;
      const pushY = -forceDirectionY * force * 3 * dpr;

      this.vx += pushX;
      this.vy += pushY;
    }

    // Return to base velocity slowly
    this.vx += (this.baseVx - this.vx) * 0.04;
    this.vy += (this.baseVy - this.vy) * 0.04;

    // Speed limiting logic
    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 4 * dpr;
    if (currentSpeed > maxSpeed) {
      this.vx = (this.vx / currentSpeed) * maxSpeed;
      this.vy = (this.vy / currentSpeed) * maxSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = isDark
      ? `rgba(255, 255, 255, ${this.alpha})`
      : `rgba(0, 0, 0, ${this.alpha})`;
    ctx.fill();
  }
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef(resolvedTheme !== "light");

  useEffect(() => {
    isDarkRef.current = resolvedTheme !== "light";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Mouse state
    const mouse = {
      x: -9999,
      y: -9999,
      radius: 100 * dpr,
    };

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Re-initialize particles on resize based on screen size
      const particleCount = Math.min(Math.floor((width * height) / 8000), 150);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height, dpr));
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };

    // Reset mouse position when it leaves the window
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Initialize
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    handleResize();

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouse, dpr);
        particle.draw(ctx, isDarkRef.current);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup functions
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}