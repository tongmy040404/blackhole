"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, BookOpen, ArrowLeft, Maximize2, X } from "lucide-react";

type TimelineItem = {
  year: string;
  type: "award" | "publication";
  title: string;
  org: string;
  href: string;
  image?: string; // 证书图片路径，放在 public/awards/ 下
};

const TIMELINE: TimelineItem[] = [
  {
    year: "2025.11",
    type: "award",
    title: "2025 中国创新影像大赛 · 一等奖",
    org: "数字人开发 & 短片 · National First Prize",
    href: "#",
    image: "/awards/innovation-image-first.jpg",
  },
  {
    year: "2025.11",
    type: "award",
    title: "2025 中国创新影像大赛 · 三等奖",
    org: "VR 体验 · National Third Prize",
    href: "#",
  },
  {
    year: "2025.10",
    type: "publication",
    title:
      "RainMirror: An Immersive VR System for Dance Learning and Real-Time CoDancing with Digital Dancer",
    org: "入选 ICXR 2025 XR Gallery · International Conference on Extended Reality",
    href: "#",
    image: "/awards/rainmirror-icxr.jpg",
  },
  {
    year: "2025.10",
    type: "award",
    title: "第十三届全国大学生数字媒体科技作品及创意竞赛 · 全国三等奖",
    org: "VR 体验 · National Third Prize",
    href: "#",
    image: "/awards/digital-media-third.jpg",
  },
  {
    year: "2025.09",
    type: "award",
    title: "2025 CCF 中国计算艺术大会 · 计算艺术展 · 最佳作品",
    org: "数字人开发 & 短片 · Best Work",
    href: "#",
    image: "/awards/ccf-best-work.jpg",
  },
  {
    year: "2024.10",
    type: "award",
    title: "2024 大学生 AI 艺术季 · AI 影像创作单元 · 提名",
    org: "AI 影像 · Nomination",
    href: "#",
  },
];

export default function AwardsPage() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Esc 关闭 + 打开时锁定页面滚动
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-28 text-zinc-400 sm:px-10">
      {/* 左上角返回按钮 */}
      <Link
        href="/about"
        className="group fixed left-6 top-24 z-40 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-white sm:left-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        RETURN
      </Link>

      <div className="mx-auto max-w-3xl">
        {/* 标题区 */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Awards &amp; Publications.
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            A chronological record of milestones and research.
          </p>
        </header>

        {/* 垂直时间轴 */}
        <ol className="relative border-l border-zinc-800">
          {TIMELINE.map((item, i) => {
            const Icon = item.type === "award" ? Award : BookOpen;
            return (
              <li key={i} className="group relative ml-6 pb-12 last:pb-0">
                {/* 节点圆圈：附着在竖线上，Hover 时亮起 */}
                <span className="absolute -left-[1.90rem] top-1.5 h-3 w-3 rounded-full bg-zinc-800 ring-4 ring-black transition-colors duration-300 group-hover:bg-white" />

                {/* 年份：始终高亮 */}
                <span className="font-mono text-xs tracking-[0.2em] text-white">
                  {item.year}
                </span>

                {/* 标题行 + 证书缩略图 */}
                <div className="mt-2 flex items-start justify-between gap-5">
                  <div className="flex-1">
                    <h2 className="flex items-center gap-2 text-lg font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white sm:text-xl">
                      <Icon
                        className="h-4 w-4 shrink-0 text-zinc-500 transition-colors duration-300 group-hover:text-white"
                        strokeWidth={1.5}
                      />
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
                      {item.org}
                    </p>
                  </div>

                  {/* 证书缩略图：点击弹出灯箱大图 */}
                  {item.image && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          src: item.image!,
                          alt: `${item.title} 证书`,
                        })
                      }
                      className="group/thumb relative h-20 w-32 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-colors duration-300 hover:border-zinc-500"
                      aria-label={`查看 ${item.title} 证书大图`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={`${item.title} 证书`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      />
                      {/* Hover 时浮现的放大提示 */}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                        <Maximize2 className="h-5 w-5 text-white" strokeWidth={1.5} />
                      </span>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 灯箱：点击背景或关闭按钮、按 Esc 退出 */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-200 hover:text-white"
            aria-label="关闭预览"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
            CLOSE
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full cursor-default rounded-lg border border-zinc-700 object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}
