"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ProjectPreview } from "@/lib/sanity/types";

type ProjectCarouselProps = {
  projects: ProjectPreview[];
};

const AUTO_SCROLL_DELAY = 5500;

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!api || projects.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!isPausedRef.current) {
        api.scrollNext();
      }
    }, AUTO_SCROLL_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [api, projects.length]);

  if (!projects.length) {
    return null;
  }

  return (
    <Carousel
      aria-label="Featured projects carousel"
      className="px-10 sm:px-12"
      opts={{
        align: "start",
        loop: projects.length > 1,
      }}
      onFocusCapture={() => {
        isPausedRef.current = true;
      }}
      onBlurCapture={() => {
        isPausedRef.current = false;
      }}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      setApi={setApi}
    >
      <CarouselContent className="-ml-5 items-stretch">
        {projects.map((project) => (
          <CarouselItem
            className="flex basis-full pl-5 sm:basis-[24rem] lg:basis-[25rem]"
            key={project.title}
          >
            <ProjectCard project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 size-10 border-border bg-card text-foreground shadow-lg hover:bg-secondary" />
      <CarouselNext className="right-0 size-10 border-border bg-card text-foreground shadow-lg hover:bg-secondary" />
    </Carousel>
  );
}
