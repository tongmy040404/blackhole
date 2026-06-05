import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { POSTS } from "./posts";

export default function BlogPage() {
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

      <div className="mx-auto max-w-3xl">
        {/* 头部标题 */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            The Singularity.
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            Thoughts, experiments, and technical deep dives.
          </p>
        </header>

        {POSTS.length > 0 ? (
          /* 文章列表 */
          <div className="flex flex-col space-y-12">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <span className="font-mono text-xs text-zinc-500">
                  {post.date}
                </span>
                <h2 className="mt-2 flex items-start text-2xl font-bold leading-tight tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                  {post.title}
                  <ArrowRight
                    className="ml-3 mt-1 h-6 w-6 shrink-0 -translate-x-4 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400 transition-transform duration-300 group-hover:translate-x-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          /* 空状态 */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/30 py-24 text-center">
            <PenLine className="h-10 w-10 text-zinc-600" strokeWidth={1.25} />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              No Entries Yet
            </p>
            <p className="mt-3 text-sm text-zinc-600">暂无内容，敬请期待。</p>
          </div>
        )}
      </div>
    </main>
  );
}
