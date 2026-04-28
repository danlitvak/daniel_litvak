export type CourseworkItem = {
  title: string;
  type: "Project" | "Lab" | "Assignment";
  summary: string;
  skills: string[];
  reflection: CourseworkReflection;
};

export type CourseworkReflection = {
  intro: string;
  inlineCode: string;
  code: {
    language: string;
    filename: string;
    source: string;
  };
  table: {
    headers: string[];
    rows: string[][];
  };
  visual: {
    kind: "image" | "diagram" | "graph";
    title: string;
    caption: string;
    imageSrc?: string;
    bars?: {
      label: string;
      value: number;
    }[];
  };
  interactive?: {
    kind: "confidence-interval";
    title: string;
    caption: string;
  };
  references: {
    label: string;
    href: string;
  }[];
};

export type Course = {
  code: string;
  title: string;
  term: string;
  year: string;
  description: string;
  items: CourseworkItem[];
};

function reflection({
  intro,
  inlineCode,
  filename,
  source,
  visual,
  interactive,
}: {
  intro: string;
  inlineCode: string;
  filename: string;
  source: string;
  visual: CourseworkReflection["visual"];
  interactive?: CourseworkReflection["interactive"];
}): CourseworkReflection {
  return {
    intro,
    inlineCode,
    code: {
      language: filename.endsWith(".cpp")
        ? "cpp"
        : filename.endsWith(".s")
          ? "asm"
          : filename.endsWith(".py") || filename.endsWith(".ipynb")
            ? "python"
            : "c",
      filename,
      source,
    },
    table: {
      headers: ["Takeaway", "How I practiced it", "Real-world value"],
      rows: [
        ["Correctness", "Small tests before larger integration", "Reliable tools come from checking assumptions early."],
        ["Debugging", "Trace state at the boundary where behavior changes", "Most failures become fixable once the changing state is visible."],
        ["Design", "Separate helper logic from required public interfaces", "A clean interface makes technical work easier to reuse and explain."],
      ],
    },
    visual,
    interactive,
    references: [
      { label: "Course notes", href: "#" },
      { label: "Private implementation notes", href: "#" },
    ],
  };
}

export const coursework: Course[] = [
  {
    code: "CPEN 212",
    title: "Computing Systems II",
    term: "Year 2",
    year: "2025-2026",
    description:
      "Systems programming coursework organized around low-level C, ARM64 assembly, memory, processes, virtual memory, and performance optimization.",
    items: [
      {
        title: "Rapid Unplanned (Dis)assembly",
        type: "Lab",
        summary:
          "Disassembled executable code, traced behavior in a debugger, and connected binary bytes to ARM64 instructions.",
        skills: ["ARM64", "gdb", "objdump", "debugging"],
        reflection: reflection({
          intro:
            "This lab made the gap between source code and machine code feel much smaller. The useful habit was writing down one hypothesis before stepping through the next instruction.",
          inlineCode:
            "A small checkpoint like `x/i $pc` was enough to keep the debugging session grounded.",
          filename: "trace.s",
          source: "ldr x0, [sp, #16]\nbl puts\nadd sp, sp, #32\nret",
          visual: {
            kind: "diagram",
            title: "Disassembly workflow",
            caption:
              "A simple loop from bytes to instructions to debugger observations.",
          },
        }),
      },
      {
        title: "1337 h4xx",
        type: "Lab",
        summary:
          "Built and analyzed exploit inputs for generated executables while working with calling conventions, stack layout, and ASLR constraints.",
        skills: ["Binary exploitation", "ARM64", "stack layout", "security"],
        reflection: reflection({
          intro:
            "The main takeaway was that exploitation is mostly careful accounting. The payload only worked when offsets, return paths, and runtime assumptions all matched.",
          inlineCode:
            "I treated each payload as data and checked the expected offset before relying on a `ret` target.",
          filename: "payload.c",
          source: "char payload[64];\nmemset(payload, 'A', sizeof payload);\n/* overwrite saved control data at a known offset */",
          visual: {
            kind: "graph",
            title: "Exploit planning confidence",
            caption:
              "Example reflection graph showing how confidence rises as each assumption is verified.",
            bars: [
              { label: "Offset", value: 92 },
              { label: "Address", value: 68 },
              { label: "Input", value: 84 },
            ],
          },
        }),
      },
      {
        title: "Heap Management",
        type: "Lab",
        summary:
          "Implemented pieces of a memory allocator, including pointer arithmetic, block metadata, free-list behavior, and allocator debugging.",
        skills: ["C", "malloc/free", "pointers", "memory"],
        reflection: reflection({
          intro:
            "Allocator work rewarded simple invariants. I kept coming back to the same question: does this pointer refer to the user region, the header, or the next block?",
          inlineCode:
            "The safest helper was one that converted a user pointer back to its `block_header` consistently.",
          filename: "allocator.c",
          source: "static block_t *header_from_payload(void *ptr) {\n  return (block_t *)((char *)ptr - sizeof(block_t));\n}",
          visual: {
            kind: "diagram",
            title: "Block layout",
            caption:
              "The diagram separates allocator metadata from caller-owned payload bytes.",
          },
        }),
      },
      {
        title: "Fake Virtual Memory",
        type: "Lab",
        summary:
          "Implemented simplified virtual memory mechanisms using trie-like lookup structures, page mapping, translation, and unmapping logic.",
        skills: ["Virtual memory", "page tables", "C", "systems"],
        reflection: reflection({
          intro:
            "The virtual memory lab felt like a data-structure problem with systems consequences. Each level of lookup needed to preserve a very strict contract.",
          inlineCode:
            "I used helpers around `vpn` extraction so bit shifts did not leak across the implementation.",
          filename: "vm.c",
          source: "uint64_t level_index(uint64_t va, int level) {\n  return (va >> (12 + level * 9)) & 0x1ff;\n}",
          visual: {
            kind: "image",
            title: "Hierarchical lookup",
            caption:
              "Placeholder image demonstrating how a visual asset can sit inside a reflection.",
            imageSrc: "/project-images/mandlebrot.png",
          },
        }),
      },
      {
        title: "A Shell Game",
        type: "Project",
        summary:
          "Built a pared-back UNIX-style shell handling command parsing, process spawning, background jobs, and signal behavior.",
        skills: ["processes", "signals", "execvp", "waitpid"],
        reflection: reflection({
          intro:
            "The shell project was where edge cases became the real feature. Parsing was only half the work; signal behavior and child state had to stay predictable.",
          inlineCode:
            "A command ending in `&` changed ownership of waiting behavior without changing the parse shape much.",
          filename: "crash.c",
          source: "pid_t pid = fork();\nif (pid == 0) {\n  execvp(argv[0], argv);\n  _exit(127);\n}",
          visual: {
            kind: "graph",
            title: "Shell feature surface",
            caption:
              "Example bar graph for comparing implementation areas in a reflection.",
            bars: [
              { label: "Parsing", value: 75 },
              { label: "Signals", value: 88 },
              { label: "Jobs", value: 70 },
            ],
          },
        }),
      },
      {
        title: "Cache Optimization",
        type: "Project",
        summary:
          "Optimized C kernels for cache behavior while preserving correctness, compiler constraints, and reference-side effects.",
        skills: ["C", "cache locality", "optimization", "performance"],
        reflection: reflection({
          intro:
            "This project was a reminder that performance work needs measurement discipline. A change was only useful when it preserved output and improved locality under the actual constraints.",
          inlineCode:
            "Loop order mattered more once the access pattern stopped fighting the cache line layout.",
          filename: "mxmult.c",
          source: "for (int ii = 0; ii < n; ii += block) {\n  for (int jj = 0; jj < n; jj += block) {\n    /* tiled inner work */\n  }\n}",
          visual: {
            kind: "graph",
            title: "Cache locality comparison",
            caption:
              "Example graph for a later measured baseline versus optimized version.",
            bars: [
              { label: "Base", value: 38 },
              { label: "Tiled", value: 76 },
              { label: "Tuned", value: 91 },
            ],
          },
        }),
      },
    ],
  },
  {
    code: "STAT 302",
    title: "Statistics",
    term: "Year 2",
    year: "2025-2026",
    description:
      "Statistics coursework focused on uncertainty, sampling, estimation, and communicating what data can and cannot justify.",
    items: [
      {
        title: "Sampling Variation and Confidence Intervals",
        type: "Assignment",
        summary:
          "Built a one-example reflection around repeated sampling, interval width, and how confidence levels change statistical communication.",
        skills: ["sampling", "confidence intervals", "simulation", "statistics"],
        reflection: reflection({
          intro:
            "The useful lesson was that a confidence interval is not just a formula at the end of a problem. It is a communication tool: sample size, variability, and confidence level all change how much uncertainty should be shown to someone making a decision.",
          inlineCode:
            "I treated the interval as a repeatable process: compute a sample mean, attach `z * sigma / sqrt(n)`, then check whether the true mean is captured over repeated samples.",
          filename: "confidence-interval-demo.py",
          source:
            "mean = sample.mean()\nstandard_error = sigma / np.sqrt(n)\nmargin = z_score * standard_error\ninterval = (mean - margin, mean + margin)",
          visual: {
            kind: "graph",
            title: "Interval tradeoffs",
            caption:
              "The example separates precision from confidence so the tradeoff is visible rather than hidden inside a formula.",
            bars: [
              { label: "Sample size", value: 82 },
              { label: "Confidence", value: 74 },
              { label: "Interpretation", value: 90 },
            ],
          },
          interactive: {
            kind: "confidence-interval",
            title: "Confidence interval coverage",
            caption:
              "A small deterministic simulation showing how many repeated intervals capture the same true mean.",
          },
        }),
      },
    ],
  },
  {
    code: "MATH 256",
    title: "Differential Equations",
    term: "Year 2",
    year: "2025-2026",
    description:
      "Python-based differential equations assignments using NumPy, Matplotlib, SciPy, symbolic reasoning, numerical approximation, and visual interpretation.",
    items: [
      {
        title: "Slope Fields and First-Order ODEs",
        type: "Assignment",
        summary:
          "Used Python to plot slope fields, verify separable solutions, and compare solution curves against qualitative direction-field behavior.",
        skills: ["Python", "NumPy", "Matplotlib", "ODEs"],
        reflection: reflection({
          intro:
            "This assignment connected analytic ODE solutions with visual checks. Plotting a solution over a slope field made it easier to catch sign errors and confirm that the curve followed the local derivative structure.",
          inlineCode:
            "The useful pattern was defining an ODE as a callable like `f(t, y)` and then using the same function for both visual and numerical reasoning.",
          filename: "assignment1.ipynb",
          source:
            "def slopefield(f, t_range, y_range):\n    # evaluate f(t, y) over a grid\n    # draw short line segments with matching slopes\n    pass",
          visual: {
            kind: "diagram",
            title: "Direction-field workflow",
            caption:
              "Set up an ODE, plot its slope field, then overlay candidate solutions as a consistency check.",
          },
        }),
      },
      {
        title: "Damping, Forcing, and Resonance",
        type: "Assignment",
        summary:
          "Modeled damped oscillators, forced response amplitude, resonance behavior, and parameterized solution functions.",
        skills: ["second-order ODEs", "resonance", "Python", "plotting"],
        reflection: reflection({
          intro:
            "The main portfolio takeaway was treating formulas as functions that can be sampled, plotted, and stress-tested across parameter values. That made resonance and long-term damping behavior much more concrete.",
          inlineCode:
            "Vectorized functions let one expression handle scalar checks and plotted arrays, which kept tests and graphs tied to the same implementation.",
          filename: "assignment2.ipynb",
          source:
            "A = lambda w: F0 / (m * np.sqrt((2*w*p)**2 + (w0**2 - w**2)**2))\nw_values = np.linspace(0, 8, 500)",
          visual: {
            kind: "graph",
            title: "Oscillator modeling focus",
            caption:
              "Relative emphasis across the assignment: closed-form solutions, plotted behavior, and parameter interpretation.",
            bars: [
              { label: "Closed form", value: 78 },
              { label: "Visualization", value: 88 },
              { label: "Parameters", value: 82 },
            ],
          },
        }),
      },
      {
        title: "Laplace Transforms and Euler Approximation",
        type: "Assignment",
        summary:
          "Solved initial-value and circuit-response problems with Laplace transforms, step functions, exact solutions, and Euler's method.",
        skills: ["Laplace transforms", "Euler method", "circuits", "NumPy"],
        reflection: reflection({
          intro:
            "This notebook linked exact transform-based solutions with numerical approximations. The circuit problems were useful because the math had a physical interpretation and the plots showed where approximation error entered.",
          inlineCode:
            "A compact `odeEuler` helper made it easy to compare exact current functions against step-by-step numerical estimates.",
          filename: "assignment3.ipynb",
          source:
            "def odeEuler(f, t, y0):\n    y = np.zeros(len(t))\n    y[0] = y0\n    for n in range(len(t) - 1):\n        y[n + 1] = y[n] + f(t[n], y[n]) * (t[n + 1] - t[n])\n    return y",
          visual: {
            kind: "graph",
            title: "Exact versus approximate",
            caption:
              "The assignment emphasized comparing transform-derived functions with Euler-method samples.",
            bars: [
              { label: "Laplace", value: 84 },
              { label: "Euler", value: 76 },
              { label: "Circuit model", value: 80 },
            ],
          },
        }),
      },
      {
        title: "Eigenvalue Solutions for Linear Systems",
        type: "Assignment",
        summary:
          "Used SciPy eigenvalue routines to solve first-order linear systems, plot phase behavior, and model connected-tank mixing.",
        skills: ["SciPy", "linear systems", "eigenvalues", "phase plots"],
        reflection: reflection({
          intro:
            "The most useful habit here was separating the linear algebra setup from interpretation. Eigenvalues and eigenvectors generated the solution, while time-series and phase plots made the system behavior readable.",
          inlineCode:
            "The helper shape mattered: `odeA(A, x0, t)` made the matrix, initial condition, and time grid explicit inputs.",
          filename: "assignment4.ipynb",
          source:
            "def odeA(A, x0, t):\n    values, vectors = la.eig(A)\n    coefficients = la.solve(vectors, x0)\n    return build_solution(values, vectors, coefficients, t)",
          visual: {
            kind: "diagram",
            title: "Linear-system pipeline",
            caption:
              "Matrix model to eigen-decomposition to sampled solution and phase plot.",
          },
        }),
      },
      {
        title: "Fourier Series and Heat Equation",
        type: "Assignment",
        summary:
          "Built piecewise functions, computed Fourier coefficients numerically, and visualized heat-equation evolution from a Fourier expansion.",
        skills: ["Fourier series", "SciPy integrate", "piecewise functions", "heat equation"],
        reflection: reflection({
          intro:
            "This assignment tied together piecewise modeling, numerical integration, and long-term PDE behavior. The visualization made each Fourier mode feel like part of an evolving approximation rather than just a coefficient.",
          inlineCode:
            "Computing coefficients with integration helpers made it possible to reconstruct and compare partial sums directly against the original function.",
          filename: "assignment5.ipynb",
          source:
            "def fourier(f, L, N):\n    # integrate f(x), f(x)cos(...), and f(x)sin(...)\n    # return a0, cosine coefficients, and sine coefficients\n    pass",
          visual: {
            kind: "graph",
            title: "Fourier workflow",
            caption:
              "Piecewise definition, coefficient calculation, partial-sum reconstruction, and time evolution.",
            bars: [
              { label: "Piecewise", value: 72 },
              { label: "Coefficients", value: 86 },
              { label: "Heat flow", value: 90 },
            ],
          },
        }),
      },
    ],
  },
  {
    code: "CPSC 221",
    title: "Basic Algorithms and Data Structures",
    term: "Year 2",
    year: "2025-2026",
    description:
      "Data structures and algorithms labs implemented in C++, covering linked structures, trees, hash tables, balanced search trees, and graphs.",
    items: [
      {
        title: "Linked Lists",
        type: "Lab",
        summary:
          "Worked with pointer exercises, linked-list operations, and deque implementation patterns.",
        skills: ["C++", "pointers", "linked lists", "deque"],
        reflection: reflection({
          intro:
            "Linked-list work was about slowing down pointer updates. Drawing the before and after state made mutation bugs easier to catch.",
          inlineCode:
            "I checked every update to `next` and `prev` as a pair, not as isolated assignments.",
          filename: "linked_list.cpp",
          source: "node->next = current->next;\ncurrent->next = node;\nnode->prev = current;",
          visual: {
            kind: "diagram",
            title: "Pointer update order",
            caption:
              "A placeholder diagram for before/after linked-list mutation notes.",
          },
        }),
      },
      {
        title: "Quacks",
        type: "Lab",
        summary:
          "Implemented stack/queue-style exercises and recursive data-structure operations.",
        skills: ["stacks", "queues", "recursion", "C++"],
        reflection: reflection({
          intro:
            "The useful pattern was translating a recursive idea into stack and queue operations without losing the original invariant.",
          inlineCode:
            "For each helper, I wrote down what should remain true after `pop()` and before the next recursive call.",
          filename: "quackfun.cpp",
          source: "if (s.empty()) return;\nauto top = s.top();\ns.pop();\n/* recursive work */",
          visual: {
            kind: "image",
            title: "State snapshot",
            caption:
              "Placeholder image showing that reflections can include visual evidence or screenshots.",
            imageSrc: "/project-images/gameoflife.png",
          },
        }),
      },
      {
        title: "Trees",
        type: "Lab",
        summary:
          "Implemented binary tree operations and tested tree behavior against expected output.",
        skills: ["binary trees", "recursion", "testing", "C++"],
        reflection: reflection({
          intro:
            "Tree recursion became clearer once I treated each function as a promise about a subtree rather than the whole tree.",
          inlineCode:
            "A base case returning on `nullptr` kept the recursive cases focused.",
          filename: "binarytree.cpp",
          source: "int height(Node *subroot) {\n  if (subroot == nullptr) return -1;\n  return 1 + max(height(subroot->left), height(subroot->right));\n}",
          visual: {
            kind: "diagram",
            title: "Subtree contract",
            caption:
              "A compact diagram for parent and child recursive responsibilities.",
          },
        }),
      },
      {
        title: "Hash Tables",
        type: "Lab",
        summary:
          "Built hash-table-backed utilities for word counts, character counts, and anagram detection.",
        skills: ["hash tables", "iterators", "text processing", "C++"],
        reflection: reflection({
          intro:
            "Hash-table labs made performance feel practical because the same interface could hide very different collision behavior.",
          inlineCode:
            "I compared separate chaining with linear probing by watching where `insert` spent its work.",
          filename: "word_counter.cpp",
          source: "for (const string &word : words) {\n  counts[word]++;\n}",
          visual: {
            kind: "graph",
            title: "Collision strategy notes",
            caption:
              "Example graph for recording observed behavior across hash strategies.",
            bars: [
              { label: "SC", value: 70 },
              { label: "LP", value: 62 },
              { label: "Resize", value: 86 },
            ],
          },
        }),
      },
      {
        title: "AVL Trees",
        type: "Lab",
        summary:
          "Implemented AVL tree rotations, insertion, removal, and balancing behavior with structured tests.",
        skills: ["AVL trees", "rotations", "balancing", "C++"],
        reflection: reflection({
          intro:
            "AVL rotations were easiest to reason about as local rewrites. The global tree property follows only if the local height updates are correct.",
          inlineCode:
            "I treated `rotateLeftRight` as two smaller rotations rather than a special case.",
          filename: "avltree.cpp",
          source: "rotateLeft(subtree->left);\nrotateRight(subtree);\nupdateHeight(subtree);",
          visual: {
            kind: "diagram",
            title: "Rotation rewrite",
            caption:
              "A placeholder diagram for showing local AVL shape changes.",
          },
        }),
      },
      {
        title: "Graphs",
        type: "Lab",
        summary:
          "Worked with graph representations, disjoint sets, graph utilities, and randomized graph tooling.",
        skills: ["graphs", "disjoint sets", "algorithms", "C++"],
        reflection: reflection({
          intro:
            "Graph work pushed me to separate representation from algorithm behavior. The same graph could be inspected through traversal, connectivity, or edge-weight questions.",
          inlineCode:
            "Disjoint sets made connectivity checks feel almost constant after path compression.",
          filename: "graph_tools.cpp",
          source: "DisjointSets sets(vertices.size());\nfor (const Edge &edge : edges) {\n  sets.setunion(edge.source, edge.dest);\n}",
          visual: {
            kind: "image",
            title: "Graph visualization",
            caption:
              "Placeholder image showing where screenshots or graph renderings can be embedded.",
            imageSrc: "/project-images/boids.png",
          },
        }),
      },
    ],
  },
];

export const courseworkYears = Array.from(
  new Set(coursework.map((course) => course.year)),
).sort((a, b) => b.localeCompare(a));

export function getCourseworkYearLabel(year: string) {
  return coursework.find((course) => course.year === year)?.term ?? year;
}
