"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function DocImage({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <figure className="my-2">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        {error ? (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-zinc-600">
            <ImageOff className="h-8 w-8" strokeWidth={1} />
            <span className="font-mono text-xs tracking-[0.2em]">
              IMAGE PENDING
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={caption ?? ""}
            onError={() => setError(true)}
            className="w-full"
          />
        )}
      </div>
    </figure>
  );
}
