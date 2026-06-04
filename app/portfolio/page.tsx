import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "./projects";

// 网格占位背景（海报缺失时使用）
const GRID_BG = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export default function PortfolioPage() {
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-28 text-zinc-400 sm:px-10">
      {/* 左上角返回按钮 */}
      <Link
        href="/about"
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

      <div className="mx-auto max-w-5xl">
        {/* 头部标题 */}
        <header className="mb-14">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Core Creations.
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            Exploring the possibilities of immersive storytelling at the
            intersection of technology and art.
          </p>
        </header>

        {/* 置顶：最重要作品 */}
        <FeaturedCard project={featured} />

        {/* 其余作品网格 */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50 transition-all duration-300 hover:border-white md:grid-cols-2"
    >
      {/* 右上角浮现的跳转箭头 */}
      <ArrowUpRight
        className="absolute right-6 top-6 z-10 h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        strokeWidth={1.5}
      />

      {/* 海报区（左） */}
      <div className="relative h-72 overflow-hidden border-b border-zinc-800 md:h-[28rem] md:border-b-0 md:border-r">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={GRID_BG}
          >
            <Icon
              className="h-32 w-32 text-zinc-600 sm:h-40 sm:w-40"
              strokeWidth={0.6}
            />
          </div>
        )}
      </div>

      {/* 信息区（右） */}
      <div className="flex flex-col justify-center p-10 sm:p-14">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          Featured
        </span>
        <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
          {project.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const cardClass =
    "group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50 transition-all duration-300 hover:border-white";

  const inner = (
    <>
      {/* 右上角浮现的跳转箭头（有详情页时才显示） */}
      {!project.noDetail && (
        <ArrowUpRight
          className="absolute right-5 top-5 z-10 h-5 w-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          strokeWidth={1.5}
        />
      )}

      {/* 海报区（上） */}
      <div className="relative h-52 overflow-hidden border-b border-zinc-800">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={GRID_BG}
          >
            <Icon className="h-16 w-16 text-zinc-700" strokeWidth={1} />
          </div>
        )}
      </div>

      {/* 信息区（下） */}
      <div className="flex flex-1 flex-col p-7">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {project.title}
        </h2>
        {project.description && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>
        )}
      </div>
    </>
  );

  // 无详情页：渲染为不可点击的卡片
  if (project.noDetail) {
    return <div className={cardClass}>{inner}</div>;
  }

  return (
    <Link href={`/portfolio/${project.slug}`} className={cardClass}>
      {inner}
    </Link>
  );
}
