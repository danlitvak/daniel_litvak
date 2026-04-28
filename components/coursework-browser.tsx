"use client";

import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  FlaskConical,
  Folder,
  FolderKanban,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stats302ConfidenceDemo } from "@/components/stats-302-confidence-demo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  coursework,
  courseworkYears,
  getCourseworkYearLabel,
  type Course,
  type CourseworkItem,
  type CourseworkReflection,
} from "@/lib/coursework";
import { cn } from "@/lib/utils";

function getCoursesForYear(year: string) {
  return coursework.filter((course) => course.year === year);
}

const courseworkItemTypes: CourseworkItem["type"][] = [
  "Project",
  "Lab",
  "Assignment",
];

function getItemCount(course: Course, type: CourseworkItem["type"]) {
  return course.items.filter((item) => item.type === type).length;
}

function getCourseMeta(course: Course) {
  return courseworkItemTypes
    .map((type) => {
      const count = getItemCount(course, type);
      const label = type.toLowerCase();

      return count === 1 ? `1 ${label}` : `${count} ${label}s`;
    })
    .filter((item) => !item.startsWith("0 "))
    .join(" / ");
}

function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          className="border border-border bg-secondary px-1.5 py-0.5 text-[0.85em] text-foreground"
          key={`${part}-${index}`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function ReflectionVisual({
  visual,
}: {
  visual: CourseworkReflection["visual"];
}) {
  if (visual.kind === "image" && visual.imageSrc) {
    return (
      <figure>
        <div className="relative aspect-[16/9] overflow-hidden border border-border bg-secondary">
          <Image
            src={visual.imageSrc}
            alt={visual.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
          {visual.caption}
        </figcaption>
      </figure>
    );
  }

  if (visual.kind === "graph" && visual.bars) {
    return (
      <figure>
        <div className="space-y-3 border border-border bg-secondary/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {visual.title}
          </p>
          {visual.bars.map((bar) => (
            <div className="grid gap-1" key={bar.label}>
              <div className="flex items-center justify-between text-xs">
                <span>{bar.label}</span>
                <span className="text-muted-foreground">{bar.value}%</span>
              </div>
              <div className="h-2 border border-border bg-background">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
          {visual.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border border-border bg-secondary/50 p-4">
        <div className="border border-border bg-background p-3 text-center text-xs font-medium">
          Observe
        </div>
        <div className="h-px w-8 bg-border" />
        <div className="border border-border bg-background p-3 text-center text-xs font-medium">
          Refine
        </div>
        <div className="col-span-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="h-px bg-border" />
          <div className="border border-accent/45 bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
            {visual.title}
          </div>
          <div className="h-px bg-border" />
        </div>
        <div className="border border-border bg-background p-3 text-center text-xs font-medium">
          Test
        </div>
        <div className="h-px w-8 bg-border" />
        <div className="border border-border bg-background p-3 text-center text-xs font-medium">
          Document
        </div>
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
        {visual.caption}
      </figcaption>
    </figure>
  );
}

function Breadcrumbs({
  selectedYear,
  selectedCourse,
  selectedItem,
  goHome,
  goYear,
  goCourse,
}: {
  selectedYear?: string;
  selectedCourse?: Course;
  selectedItem?: CourseworkItem;
  goHome: () => void;
  goYear: () => void;
  goCourse: () => void;
}) {
  return (
    <nav
      aria-label="Coursework breadcrumbs"
      className="flex flex-wrap items-center gap-1 border border-border bg-card p-2 text-sm"
    >
      <button
        className="px-2 py-1 font-medium transition-colors hover:bg-secondary"
        onClick={goHome}
        type="button"
      >
        Coursework
      </button>
      {selectedYear ? (
        <>
          <ChevronRight className="size-4 text-muted-foreground" />
          <button
            className="px-2 py-1 font-medium transition-colors hover:bg-secondary"
            onClick={goYear}
            type="button"
          >
            {getCourseworkYearLabel(selectedYear)}
          </button>
        </>
      ) : null}
      {selectedCourse ? (
        <>
          <ChevronRight className="size-4 text-muted-foreground" />
          <button
            className="px-2 py-1 font-medium transition-colors hover:bg-secondary"
            onClick={goCourse}
            type="button"
          >
            {selectedCourse.code}
          </button>
        </>
      ) : null}
      {selectedItem ? (
        <>
          <ChevronRight className="size-4 text-muted-foreground" />
          <span className="px-2 py-1 text-muted-foreground">
            {selectedItem.title}
          </span>
        </>
      ) : null}
    </nav>
  );
}

function BrowserToolbar({
  backLabel,
  onBack,
}: {
  backLabel?: string;
  onBack?: () => void;
}) {
  if (!onBack) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft aria-hidden="true" />
        {backLabel ?? "Back"}
      </Button>
    </div>
  );
}

function BrowserTile({
  children,
  description,
  icon,
  meta,
  onClick,
  title,
}: {
  children?: React.ReactNode;
  description: string;
  icon: React.ReactNode;
  meta: string;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      className="group grid h-full gap-4 border border-border bg-card p-4 text-left transition-colors hover:border-accent/60 hover:bg-secondary/60"
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="border border-border bg-background p-2 text-accent transition-colors group-hover:border-accent/60">
            {icon}
          </div>
          <div className="min-w-0 overflow-hidden">
            <h3 className="break-words font-semibold leading-6">{title}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {meta}
            </p>
          </div>
        </div>
        <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      {children}
    </button>
  );
}

function ReflectionArticle({
  course,
  item,
}: {
  course: Course;
  item: CourseworkItem;
}) {
  const { reflection } = item;

  return (
    <article className="grid gap-5">
      <div className="border border-border bg-card p-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {course.code} / {item.type}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {item.summary}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <CardTitle>Reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-6">
            <p className="text-muted-foreground">{reflection.intro}</p>
            <p className="text-muted-foreground">
              {renderInlineCode(reflection.inlineCode)}
            </p>

            <div>
              <div className="flex items-center justify-between border border-b-0 border-border bg-secondary px-3 py-2 text-xs">
                <span className="font-semibold">
                  {reflection.code.filename}
                </span>
                <span className="text-muted-foreground">
                  {reflection.code.language}
                </span>
              </div>
              <pre className="overflow-x-auto border border-border bg-background p-3 text-xs leading-5 text-foreground">
                <code>{reflection.code.source}</code>
              </pre>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr>
                    {reflection.table.headers.map((header) => (
                      <th
                        className="border border-border bg-secondary p-2 font-semibold"
                        key={header}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reflection.table.rows.map((row) => (
                    <tr key={row.join("-")}>
                      {row.map((cell) => (
                        <td
                          className="border border-border p-2 text-muted-foreground"
                          key={cell}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-5 content-start">
          <Card>
            <CardHeader>
              <CardTitle>Visual Note</CardTitle>
            </CardHeader>
            <CardContent>
              <ReflectionVisual visual={reflection.visual} />
            </CardContent>
          </Card>

          {reflection.interactive?.kind === "confidence-interval" ? (
            <Card>
              <CardHeader>
                <CardTitle>{reflection.interactive.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Stats302ConfidenceDemo />
                <p className="text-xs leading-5 text-muted-foreground">
                  {reflection.interactive.caption}
                </p>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {reflection.references.map((reference) => (
                <a
                  className="inline-flex items-center justify-between gap-2 border border-border px-3 py-2 text-sm text-accent transition-colors hover:bg-secondary"
                  href={reference.href}
                  key={reference.label}
                >
                  {reference.label}
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  );
}

export function CourseworkBrowser() {
  const [selectedYear, setSelectedYear] = useState<string | undefined>();
  const [selectedCourseCode, setSelectedCourseCode] = useState<
    string | undefined
  >();
  const [selectedItemTitle, setSelectedItemTitle] = useState<
    string | undefined
  >();

  const coursesForYear = useMemo(
    () => (selectedYear ? getCoursesForYear(selectedYear) : []),
    [selectedYear],
  );

  const selectedCourse = coursesForYear.find(
    (course) => course.code === selectedCourseCode,
  );
  const selectedItem = selectedCourse?.items.find(
    (item) => item.title === selectedItemTitle,
  );

  const backAction = selectedItem
    ? goCourse
    : selectedCourse
      ? goYear
      : selectedYear
        ? goHome
        : undefined;
  const backLabel = selectedItem
    ? `Back to ${selectedCourse?.code}`
    : selectedCourse
      ? `Back to ${selectedYear ? getCourseworkYearLabel(selectedYear) : "Year"}`
      : selectedYear
        ? "Back to Coursework"
        : undefined;

  function goHome() {
    setSelectedYear(undefined);
    setSelectedCourseCode(undefined);
    setSelectedItemTitle(undefined);
  }

  function goYear() {
    setSelectedCourseCode(undefined);
    setSelectedItemTitle(undefined);
  }

  function goCourse() {
    setSelectedItemTitle(undefined);
  }

  return (
    <section className="space-y-5">
      <Breadcrumbs
        selectedYear={selectedYear}
        selectedCourse={selectedCourse}
        selectedItem={selectedItem}
        goHome={goHome}
        goYear={goYear}
        goCourse={goCourse}
      />

      <BrowserToolbar backLabel={backLabel} onBack={backAction} />

      {!selectedYear ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courseworkYears.map((year) => {
            const courses = getCoursesForYear(year);
            const itemCount = courses.reduce(
              (total, course) => total + course.items.length,
              0,
            );

            return (
              <BrowserTile
                key={year}
                title={getCourseworkYearLabel(year)}
                meta={`${courses.length} courses / ${itemCount} files`}
                description="Open this academic year to browse course folders and coursework files."
                icon={<Folder className="size-5" aria-hidden="true" />}
                onClick={() => setSelectedYear(year)}
              />
            );
          })}
        </div>
      ) : null}

      {selectedYear && !selectedCourse ? (
        <div className="grid gap-4 md:grid-cols-2">
          {coursesForYear.map((course) => (
            <BrowserTile
              key={course.code}
              title={course.code}
              meta={getCourseMeta(course)}
              description={course.description}
              icon={<BookOpen className="size-5" aria-hidden="true" />}
              onClick={() => setSelectedCourseCode(course.code)}
            >
              <p className="text-xs text-muted-foreground">{course.title}</p>
            </BrowserTile>
          ))}
        </div>
      ) : null}

      {selectedCourse && !selectedItem ? (
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {selectedCourse.term}
                  </p>
                  <CardTitle className="mt-2 text-2xl">
                    {selectedCourse.code}: {selectedCourse.title}
                  </CardTitle>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseworkItemTypes.map((type) => {
                    const count = getItemCount(selectedCourse, type);

                    if (!count) {
                      return null;
                    }

                    return (
                      <Badge key={type} variant="outline">
                        {count} {type.toLowerCase()}
                        {count === 1 ? "" : "s"}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                {selectedCourse.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selectedCourse.items.map((item) => (
              <BrowserTile
                key={`${selectedCourse.code}-${item.title}`}
                title={item.title}
                meta={item.type}
                description={item.summary}
                icon={
                  item.type === "Project" ? (
                    <FolderKanban className="size-5" aria-hidden="true" />
                  ) : item.type === "Lab" ? (
                    <FlaskConical className="size-5" aria-hidden="true" />
                  ) : (
                    <FileText className="size-5" aria-hidden="true" />
                  )
                }
                onClick={() => setSelectedItemTitle(item.title)}
              >
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <Badge
                      className="pointer-events-none max-w-full whitespace-normal break-words text-left leading-5"
                      key={skill}
                      variant="secondary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <span
                  className={cn(
                    "inline-flex w-fit items-center gap-1 border px-2.5 py-1 text-xs font-medium",
                    item.type === "Project"
                      ? "border-accent/45 bg-accent/10 text-accent"
                      : "border-primary/25 bg-primary/5 text-primary",
                  )}
                >
                  <FileText className="size-3" aria-hidden="true" />
                  Open reflection
                </span>
              </BrowserTile>
            ))}
          </div>
        </div>
      ) : null}

      {selectedCourse && selectedItem ? (
        <ReflectionArticle
          course={selectedCourse}
          item={selectedItem}
        />
      ) : null}
    </section>
  );
}
