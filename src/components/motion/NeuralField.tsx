"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const LINK_DISTANCE = 130;
const POINTER_RADIUS = 170;
const SIGNAL = "59,130,255";
const INK = "245,245,244";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Animated "neural network" behind the hero: drifting nodes linked by
 * hairlines, which light up blue near the pointer. Pauses off-screen and
 * draws a single still frame for reduced-motion visitors.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const still = prefersReducedMotion();
    const pointer = { x: -999, y: -999 };
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let visible = true;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        if (Math.hypot(p.x - pointer.x, p.y - pointer.y) < 160) {
          p.x += (pointer.x - p.x) * 0.004;
          p.y += (pointer.y - p.y) * 0.004;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK_DISTANCE) continue;
          const near = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < POINTER_RADIUS;
          const fade = 1 - d / LINK_DISTANCE;
          ctx.strokeStyle = near ? `rgba(${SIGNAL},${0.55 * fade})` : `rgba(${INK},${0.1 * fade})`;
          ctx.lineWidth = near ? 1.1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const near = Math.hypot(a.x - pointer.x, a.y - pointer.y) < POINTER_RADIUS;
        ctx.fillStyle = near ? `rgb(${SIGNAL})` : `rgba(${INK},.45)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, near ? 2 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) {
        step();
        draw();
      }
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resize();
    if (still) {
      draw();
    } else {
      window.addEventListener("resize", resize);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
      visibility.observe(canvas);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
