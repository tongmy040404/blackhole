"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ================================================================== */
/*  示波器波浪 Canvas —— 纯黑白矢量线框 + 中心电磁安全区               */
/* ================================================================== */

function OscilloscopeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const INTERFERENCE_RADIUS = 140;

    const LINE_COUNT = 14;
    const STEP = 6; // 每条线的采样步长（px）

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ffffff";
      ctx.lineJoin = "round";

      const gap = height / (LINE_COUNT + 1);

      // 中心电磁安全区
      const cx = width / 2;
      const cy = height / 2;
      const SAFE_INNER = 250; // 此范围内完全免疫（衰减系数 0）
      const SAFE_OUTER = 360; // 此范围外恢复正常剧烈干扰（衰减系数 1）

      for (let i = 1; i <= LINE_COUNT; i++) {
        const baseY = gap * i;
        const phase = i * 0.6;
        const amp = 8 + (i % 3) * 5;
        const speed = 0.6 + (i % 4) * 0.12;

        ctx.beginPath();
        for (let x = 0; x <= width; x += STEP) {
          // 平缓的双频波浪，持续向左移动（基础波动始终保留）
          const wave =
            Math.sin(x * 0.012 + t * speed + phase) * amp +
            Math.cos(x * 0.005 - t * speed * 0.7) * (amp * 0.4);

          let y = baseY + wave;

          // 磁场干扰：鼠标靠近时该点剧烈上下震荡
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < INTERFERENCE_RADIUS) {
              // 中心安全区平滑衰减：越靠近中心 dampen 越接近 0
              const distFromCenter = Math.hypot(x - cx, baseY - cy);
              const dampen = Math.min(
                1,
                Math.max(
                  0,
                  (distFromCenter - SAFE_INNER) / (SAFE_OUTER - SAFE_INNER)
                )
              );

              const intensity = 1 - dist / INTERFERENCE_RADIUS;
              const spike =
                (Math.random() - 0.5) * intensity * intensity * 160 * dampen;
              y += spike;
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.016;
      raf = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-black" />;
}

/* ================================================================== */
/*  示波器主页面                                                       */
/* ================================================================== */

const STATUS_LOG = [
  "> Digital Media Technologist & 3D Visual Artist",
  "> Department of Film & Television Technology, Beijing Film Academy",
];

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-mono text-white">
      {/* 底层示波器波浪 */}
      <OscilloscopeCanvas />

      {/* CRT 遮罩层：扫描线 + 暗角 + 闪烁（纯 CSS，穿透点击） */}
      <div className="crt-overlay z-20" aria-hidden />

      {/* 前景 UI：绝对居中 */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center uppercase">
        <h1
          className="text-6xl font-bold tracking-[0.15em] text-white sm:text-8xl"
          style={{
            textShadow:
              "0 0 6px rgba(255,255,255,0.45), 0 0 18px rgba(255,255,255,0.25)",
          }}
        >
          Mingyi Tong
        </h1>

        {/* 系统状态日志 */}
        <div className="mt-8 space-y-1 text-[10px] tracking-[0.25em] text-white sm:text-xs">
          {STATUS_LOG.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/about"
            className="group relative inline-flex items-center overflow-hidden border border-white px-8 py-3 text-xs tracking-[0.2em] text-white transition-colors duration-200 hover:text-black sm:text-sm"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-200 ease-out group-hover:scale-x-100" />
            <span className="relative z-10">[ Learn More ]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
