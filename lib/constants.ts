import type { BlogPostPreview, ProjectPreview } from "@/lib/sanity/types";

export const SITE = {
  name: "Daniel Litvak",
  role: "Computer Engineer",
  email: "daniel.litvak.64@gmail.com",
  phone: "778-855-1640",
  github: "https://github.com/danlitvak",
  linkedin: "https://www.linkedin.com/in/litvak-daniel/",
  location: "Vancouver, BC",
};

export const PROFILE_COPY = {
  shortIntro:
    "I build interactive tools, simulations, and small systems that make technical ideas easier to test, explain, and use.",
  bio:
    "I am a Computer Engineering student at UBC who likes turning course concepts, side projects, and half-formed technical questions into usable software. I started with Scratch, moved into C#, and now work across TypeScript, Python, C, C++, Java, and hardware-oriented tooling. The through-line is practical: build the model, make it visible, test the assumptions, then polish the interface until someone else can understand it too.",
  availability: "Open to work.",
};

export const SKILLS = {
  languages: ["JavaScript", "TypeScript", "Python", "C", "C++", "C#", "HTML", "CSS"],
  frameworks: ["Next.js", "React", "p5.js", "Tailwind CSS", "Sanity"],
  domains: [
    "Newtonian simulations",
    "Cellular automata",
    "Spatial data structures",
    "Evolutionary machine learning",
    "Interactive visualization",
  ],
};

export const EDUCATION = [
  {
    institution: "University of British Columbia",
    degree: "Bachelor of Applied Science",
    dates: "September 2024 - Present",
  },
  {
    institution: "King David High School",
    degree: "High School Diploma",
    dates: "September 2020 - June 2024",
  },
];

export type ProjectSection = {
  title: string;
  description: string;
  projects: ProjectPreview[];
};

export const fallbackProjects: ProjectPreview[] = [
  {
    title: "Flocking Birds",
    description:
      "A boids simulation where local steering rules create emergent flocking behavior, accelerated with quadtree neighbor lookup.",
    techStack: ["JavaScript", "p5.js", "Simulation"],
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/iFt_7ZoNQ",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/iFt_7ZoNQ",
    image: "/project-images/boids.png",
  },
  {
    title: "2D Gravity Simulation",
    description:
      "Interactive Newtonian gravity system with predicted paths, field visualization, and user-created bodies.",
    techStack: ["JavaScript", "p5.js", "Physics"],
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/bIWJHzTtS",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/bIWJHzTtS",
    image: "/project-images/gravity.png",
  },
  {
    title: "Conway's Game of Life",
    description:
      "Cellular automaton playground with playback controls, randomization, speed adjustment, and live statistics.",
    techStack: ["JavaScript", "p5.js", "Cellular automata"],
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/kha5GXUWU",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/kha5GXUWU",
    image: "/project-images/gameoflife.png",
  },
  {
    title: "Mandelbrot Visualization",
    description:
      "Zoomable fractal explorer with a compact HUD, undo controls, and iterative rendering experiments.",
    techStack: ["JavaScript", "p5.js", "Fractals"],
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/ZGehg9hRY",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/ZGehg9hRY",
    image: "/project-images/mandlebrot.png",
  },
  {
    title: "Machine Learning Pong",
    description:
      "Evolutionary neural-network agents learn to play Pong through selection, mutation, and repeated matches.",
    techStack: ["JavaScript", "p5.js", "Machine learning"],
    liveUrl: "https://pro-grammer3764.github.io/P5Pong2/P5/",
    githubUrl: "https://github.com/Pro-grammer3764/P5Pong2/tree/main/P5",
  },
  {
    title: "Curve Fitter",
    description:
      "Gradient-descent curve fitting demo with pan, zoom, data entry, and real-time coefficient updates.",
    techStack: ["JavaScript", "p5.js", "Data visualization"],
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/NoX-0fMWz",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/NoX-0fMWz",
  },
];

export const projectLinkOverrides: Record<string, Partial<ProjectPreview>> = {
  "Flocking Birds": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/iFt_7ZoNQ",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/iFt_7ZoNQ",
  },
  "2D Gravity Simulation": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/bIWJHzTtS",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/bIWJHzTtS",
  },
  "Gravity Simulation": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/bIWJHzTtS",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/bIWJHzTtS",
  },
  "Conway's Game of Life": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/kha5GXUWU",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/kha5GXUWU",
  },
  Conway: {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/kha5GXUWU",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/kha5GXUWU",
  },
  "Mandelbrot Visualization": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/ZGehg9hRY",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/ZGehg9hRY",
  },
  "Machine Learning Pong": {
    liveUrl: "https://pro-grammer3764.github.io/P5Pong2/P5/",
    githubUrl: "https://github.com/Pro-grammer3764/P5Pong2/tree/main/P5",
  },
  "Curve Fitter": {
    liveUrl: "https://editor.p5js.org/DanielLitvak/full/NoX-0fMWz",
    githubUrl: "https://editor.p5js.org/DanielLitvak/sketches/NoX-0fMWz",
  },
};

export const projectSections: ProjectSection[] = [
  {
    title: "Web Applications",
    description:
      "Browser-based tools and course applications that turn small workflows into inspectable interfaces.",
    projects: [
      {
        title: "NURS 180 Wellness Log",
        description:
          "A mobile-first accountability tracker for daily commitments, status review, and self-care reflection, built around local browser storage.",
        techStack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        liveUrl: "https://danlitvak.github.io/accountabilitytracker/",
        githubUrl: "https://github.com/danlitvak/accountabilitytracker",
        image: "/project-images/nurs-180-wellness-log.png",
      },
      {
        title: "CPEN 212 Course Rating",
        description:
          "A planned course-rating interface for collecting structured feedback and turning subjective course notes into comparable data.",
        techStack: ["Web app", "Forms", "Course tooling"],
        githubUrl: "https://github.com/CPEN-221-2025/project-acacia",
        liveNote: "Local build",
      },
      {
        title: "Simple GPX Viewer",
        description:
          "A lightweight GPX viewing concept for loading route files, inspecting paths, and making spatial data easier to read in the browser.",
        techStack: ["JavaScript", "Maps", "GPX"],
        liveUrl: "/project-demos/simple-gpx-viewer/index.html",
        codeNote: "Single-file HTML",
      },
      {
        title: "Package Fit Visualizer",
        description:
          "A 3D package-fit experiment with GLB upload support, dimension controls, and a dense sidebar for testing product-to-box fit.",
        techStack: ["HTML", "CSS", "JavaScript", "3D"],
        liveUrl: "/project-demos/package-fit-visualizer/index.html",
        codeNote: "Single-file HTML",
        image: "/project-images/package-fit-visualizer.png",
      },
      {
        title: "Ping Test Dashboard",
        description:
          "A small latency dashboard that samples remote assets, graphs round-trip timing, and reports jitter-style statistics.",
        techStack: ["Chart.js", "JavaScript", "Networking"],
        liveUrl: "/project-demos/ping-test/index.html",
        codeNote: "Single-file HTML",
        image: "/project-images/ping-test-dashboard.png",
      },
    ],
  },
  {
    title: "Tooling Applications",
    description:
      "Focused utilities where the useful work is parsing, modeling, or automating a task that would otherwise be repetitive.",
    projects: [
      {
        title: "ClipTrim",
        description:
          "A Rust desktop utility for trimming clips quickly, designed around a narrow workflow instead of a full video-editing suite.",
        techStack: ["Rust", "Desktop tooling", "Media"],
        githubUrl: "https://github.com/danlitvak/tool_cliptrim",
        liveNote: "Local build",
        image: "/project-images/cliptrim.png",
      },
      {
        title: "Simple Nodal Analysis Tool",
        description:
          "An ELEC 201 circuit solver using modified nodal analysis to compute node voltages, currents, power, and diagnostics.",
        techStack: ["Python", "Flask", "NumPy", "Circuits"],
        liveNote: "Local Flask app",
        codeNote: "Local Python source",
      },
    ],
  },
  {
    title: "Learning Projects",
    description:
      "Practice projects used to build fluency before the ideas became part of larger tools or simulations.",
    projects: [
      {
        title: "Java Gravity Simulation",
        description:
          "A Java gravity sandbox with 2D and 3D simulation classes for practicing vector math, object modeling, and force integration.",
        techStack: ["Java", "Physics", "Simulation"],
        liveNote: "Local Java run",
        codeNote: "Local Java source",
      },
      {
        title: "Project Euler Practice",
        description:
          "A collection of Java solutions for algorithmic math problems, used to practice loops, number theory, dynamic programming, and careful debugging.",
        techStack: ["Java", "Algorithms", "Math"],
        detailUrl: "/projects/project-euler",
        liveNote: "Java CLI output",
        codeNote: "Local Java source",
      },
    ],
  },
];

export const fallbackPosts: BlogPostPreview[] = [
  {
    title: "Automating Word Count Display on a Static Blog with Python + Git Hooks",
    slug: "automatic-python",
    date: "2025-05-28",
    excerpt:
      "A small automation project that generated blog word counts with Python and wired the result into a static site workflow.",
  },
  {
    title: "Understanding Quadtrees: A Visual Guide",
    slug: "understanding-quadtrees",
    date: "2025-05-15",
    excerpt:
      "A practical explanation of quadtrees, spatial partitioning, and how they improve interactive simulations.",
  },
  {
    title: "Neural Networks in Game Development",
    slug: "neural-networks",
    date: "Planned",
    excerpt:
      "A planned post on using neural-network agents and evolutionary selection inside small browser games.",
  },
  {
    title: "Developing 2D Gravity Engines",
    slug: "physics-engines",
    date: "Planned",
    excerpt:
      "A planned post on building and optimizing 2D gravity engines for browser-based simulations.",
  },
];
