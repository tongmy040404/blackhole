import Link from "next/link";
import { notFound } from "next/navigation";
import { Cloud } from "lucide-react";
import { PROJECTS, getProject } from "../projects";
import DocImage from "./DocImage";

// 预生成所有作品详情页的静态路径
export function generateStaticParams() {
  return PROJECTS.filter((p) => !p.noDetail).map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.noDetail) notFound();

  const biliList = project.bilibili ?? [];
  const videoList =
    project.videos && project.videos.length > 0
      ? project.videos
      : project.video
        ? [project.video]
        : [];
  const hasDoc = Boolean(project.doc && project.doc.length > 0);

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-28 text-zinc-400 sm:px-10">
      {/* 左上角返回按钮 */}
      <Link
        href="/portfolio"
        className="group fixed left-6 top-24 z-40 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-white sm:left-10"
      >
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:-translate-x-1"
        >
          &larr;
        </span>
        RETURN
      </Link>

      <article className="mx-auto max-w-4xl">
        {/* 标题 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>
          )}
        </header>

        {/* 顶部：视频。优先 B 站嵌入，其次本地视频；都没有则不显示 */}
        {biliList.length > 0 ? (
          <div className="space-y-6">
            {biliList.map((bvid) => (
              <div
                key={bvid}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-black"
              >
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
                  title={`${project.title} - ${bvid}`}
                  className="aspect-video w-full"
                  scrolling="no"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        ) : (
          videoList.length > 0 && (
            <div className="space-y-6">
              {videoList.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                >
                  <video
                    controls
                    playsInline
                    poster={project.image}
                    className="aspect-video w-full bg-black"
                    src={src}
                  />
                </div>
              ))}
            </div>
          )
        )}

        {/* 视频下载选项 */}
        {project.netdiskUrl && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.netdiskUrl && (
              <a
                href={project.netdiskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                <Cloud className="h-4 w-4" strokeWidth={1.5} />
                百度网盘下载
                {project.netdiskCode && (
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-black/60">
                    提取码 {project.netdiskCode}
                  </span>
                )}
              </a>
            )}
          </div>
        )}

        {/* 下方：技术文档（图文混排，无内容则不显示） */}
        {hasDoc && (
          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
              {project.docTitle ?? "Technical Documentation"}
            </h2>
            <div className="mt-6">
              {project.doc!.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h3
                        key={i}
                        className="mt-12 text-2xl font-bold text-white first:mt-0 sm:text-3xl"
                      >
                        {block.text}
                      </h3>
                    );
                  case "h3":
                    return (
                      <h4
                        key={i}
                        className="mt-8 text-lg font-semibold text-zinc-200"
                      >
                        {block.text}
                      </h4>
                    );
                  case "image":
                    return (
                      <DocImage
                        key={i}
                        src={block.src}
                        caption={block.caption}
                      />
                    );
                  default:
                    return (
                      <p
                        key={i}
                        className="mt-4 text-base leading-loose text-zinc-300"
                      >
                        {block.text}
                      </p>
                    );
                }
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
