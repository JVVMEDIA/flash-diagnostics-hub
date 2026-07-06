"use client";

import { useEffect } from "react";

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

function drawFrame(ctx: CanvasRenderingContext2D, t: number) {
  const pulse = (Math.sin(t * 0.004) + 1) / 2;
  const spin = (t * 0.002) % (Math.PI * 2);

  ctx.clearRect(0, 0, SIZE, SIZE);

  ctx.fillStyle = "#09090b";
  roundRect(ctx, 0, 0, SIZE, SIZE, 8);
  ctx.fill();

  const glow = ctx.createRadialGradient(16, 16, 6, 16, 16, 16 + pulse * 5);
  glow.addColorStop(0, `rgba(52, 211, 153, ${0.25 + pulse * 0.35})`);
  glow.addColorStop(1, "rgba(52, 211, 153, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.save();
  ctx.translate(16, 16);
  ctx.rotate(spin);
  ctx.strokeStyle = `rgba(110, 231, 183, ${0.35 + pulse * 0.45})`;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const grad = ctx.createLinearGradient(5, 5, 27, 27);
  grad.addColorStop(0, "#6ee7b7");
  grad.addColorStop(1, "#10b981");
  roundRect(ctx, 5, 5, 22, 22, 6);
  ctx.fillStyle = grad;
  ctx.fill();

  roundRect(ctx, 6, 6, 20, 20, 5);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + pulse * 0.12})`;
  ctx.fill();

  const scanY = 6 + ((t * 0.06) % 20);
  ctx.fillStyle = `rgba(255, 255, 255, ${0.12 + pulse * 0.1})`;
  ctx.fillRect(7, scanY, 18, 1);

  ctx.fillStyle = "#09090b";
  ctx.font = "bold 11px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FD", 16, 17);
}

export default function AnimatedFavicon() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    link.setAttribute("data-animated", "true");

    const start = performance.now();
    let frameId = 0;

    const render = (now: number) => {
      drawFrame(ctx, now - start);
      link!.href = canvas.toDataURL("image/png");
      if (!reduced) {
        frameId = requestAnimationFrame(render);
      }
    };

    render(start);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return null;
}