import type { Metadata } from "next";
import Link from "next/link";

import { BlogPreviewCard } from "@/components/blog-preview-card";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog previews by Daniel Litvak about programming, simulations, automation, and technical experiments.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Blog
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          Technical notes from builds and experiments.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Imported notes from the old portfolio sit beside new Sanity-backed
          posts. The editing flow supports ordering and hiding posts before
          they appear here.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link href="/studio">Open Studio</Link>
        </Button>
      </FadeIn>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.slug} id={post.slug}>
            <BlogPreviewCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
