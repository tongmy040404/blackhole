import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "../posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-28 text-zinc-400 sm:px-10">
      {/* 左上角返回按钮 */}
      <Link
        href="/blog"
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

      <article className="mx-auto max-w-3xl">
        {/* 标题 */}
        <header className="mb-10 border-b border-zinc-800 pb-8">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500">
            {post.date}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
        </header>

        {/* 正文 */}
        <div className="space-y-6">
          {post.content.map((block, i) =>
            block.type === "h" ? (
              <h2
                key={i}
                className="pt-6 text-xl font-bold text-white sm:text-2xl"
              >
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                className="text-base leading-loose text-zinc-300"
              >
                {block.text}
              </p>
            )
          )}
        </div>
      </article>
    </main>
  );
}
