import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  samples: number[];
  className?: string;
  height?: number;
};

export function EcgCanvas({ samples, className, height = 120 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || samples.length < 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#1a6b66";
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const min = Math.min(...samples);
    const max = Math.max(...samples);
    const range = max - min || 1;

    ctx.beginPath();
    samples.forEach((v, i) => {
      const x = (i / (samples.length - 1)) * w;
      const y = h - ((v - min) / range) * (h * 0.85) - h * 0.075;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [samples, height]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full rounded-md bg-surface", className)}
      style={{ height }}
    />
  );
}
