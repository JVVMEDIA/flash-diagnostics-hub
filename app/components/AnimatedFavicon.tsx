"use client";

import { useEffect } from "react";
import { detectPerformanceMode } from "../hooks/usePerformanceMode";

const SIZE = 32;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawBolt(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;
  const grad = ctx.createLinearGradient(0, 0, 10, 16);
  grad.addColorStop(0, "#ecfdf5");
  grad.addColorStop(1, "#a7f3d0");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(6.2, 0.5);
  ctx.lineTo(0, 9.2);
  ctx.lineTo(4.1, 9.2);
  ctx.lineTo(1.8, 19.5);
  ctx.lineTo(11, 9.1);
  ctx.lineTo(6.7, 9.1);
  ctx.lineTo(7.2, 1.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPulse(ctx: CanvasRenderingContext2D, y: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#6ee7b7";
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(7, y);
  ctx.quadraticCurveTo(10, y - 2, 13, y);
  ctx.quadraticCurveTo(16, y + 2, 19, y);
  ctx.stroke();
  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, t: number) {
  const pulse = (Math.sin(t * 0.0045) + 1) / 2;
  const spin = (t * 0.0018) % (Math.PI * 2);

  ctx.clearRect(0, 0, SIZE, SIZE);

  ctx.fillStyle = "#09090b";
  roundRect(ctx, 0, 0, SIZE, SIZE, 8);
  ctx.fill();

  const glow = ctx.createRadialGradient(16, 14, 4, 16, 14, 17 + pulse * 4);
  glow.addColorStop(0, `rgba(52, 211, 153, ${0.3 + pulse * 0.4})`);
  glow.addColorStop(1, "rgba(52, 211, 153, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.save();
  ctx.translate(16, 16);
  ctx.rotate(spin);
  ctx.strokeStyle = `rgba(110, 231, 183, ${0.25 + pulse * 0.35})`;
  ctx.lineWidth = 0.9;
  ctx.setLineDash([2.5, 5]);
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const ringR = 10 + pulse * 3;
  ctx.strokeStyle = `rgba(52, 211, 153, ${0.2 + pulse * 0.45})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(16, 16, ringR, 0, Math.PI * 2);
  ctx.stroke();

  const grad = ctx.createLinearGradient(4, 4, 28, 28);
  grad.addColorStop(0, "#6ee7b7");
  grad.addColorStop(0.5, "#34d399");
  grad.addColorStop(1, "#059669");
  roundRect(ctx, 4, 4, 24, 24, 7);
  ctx.fillStyle = grad;
  ctx.fill();

  roundRect(ctx, 5, 5, 22, 22, 6);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.06 + pulse * 0.1})`;
  ctx.fill();

  drawBolt(ctx, 11, 5, 1, 0.95 + pulse * 0.05);
  drawPulse(ctx, 23.5, 0.45 + pulse * 0.55);

  const scanY = 5 + ((t * 0.055) % 18);
  ctx.fillStyle = `rgba(236, 253, 245, ${0.08 + pulse * 0.12})`;
  ctx.fillRect(6, scanY, 20, 1);
}

export default function AnimatedFavicon() {
  useEffect(() => {
    let frameId = 0;
    let cancelled = false;

    const startAnimation = () => {
      if (cancelled) return;

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || detectPerformanceMode();
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"][data-animated="true"]') ??
      document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.type = "image/png";
    link.sizes = "32x32";
    link.setAttribute("data-animated", "true");

    const start = performance.now();

    const render = (now: number) => {
      drawFrame(ctx, now - start);
      link!.href = canvas.toDataURL("image/png");
      if (!reduced) {
        frameId = requestAnimationFrame(render);
      }
    };

    render(start);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(startAnimation, { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = setTimeout(startAnimation, 1200);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}