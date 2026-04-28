import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { HoverCard } from "@/components/hover-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogPostPreview } from "@/lib/sanity/types";

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function BlogPreviewCard({ post }: { post: BlogPostPreview }) {
  return (
    <HoverCard>
      <Card className="flex h-full flex-col">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {formatDate(post.date)}
          </p>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm leading-6 text-muted-foreground">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="link">
            <Link href={`/blog#${post.slug}`}>
              Read preview <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </HoverCard>
  );
}
