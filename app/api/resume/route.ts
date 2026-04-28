import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resumeDirectory = path.join(process.cwd(), "private", "resume");

export async function GET() {
  const resume = await findLatestResume();

  if (!resume) {
    return new Response("Resume PDF not found.", { status: 404 });
  }

  const file = await readFile(resume.path);

  return new Response(file, {
    headers: {
      "Content-Disposition": `inline; filename="${resume.name}"`,
      "Content-Type": "application/pdf",
      "Cache-Control": "private, no-store",
    },
  });
}

async function findLatestResume() {
  try {
    const entries = await readdir(resumeDirectory, { withFileTypes: true });
    const pdfs = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".pdf"))
        .map(async (entry) => {
          const filePath = path.join(resumeDirectory, entry.name);
          const fileStat = await stat(filePath);

          return {
            name: entry.name,
            path: filePath,
            updatedAt: fileStat.mtimeMs,
          };
        }),
    );

    return pdfs.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  } catch {
    return null;
  }
}
