export type Hero = {
  name: string
  role: string
  headline: string
  statement: string
  location: string
  availability: string
}

export const HERO: Hero = {
  name: 'Daniel Litvak',
  role: 'Engineer & Developer',
  headline: 'Building web experiences and Engineering embedded systems',
  statement:
    'Engineer passionate about computers, robotics, machine learning, and programming. I build data dashboards, admin portals, and interactive simulations across JavaScript, Python, and embedded toolchains.',
  location: 'Vancouver Based · Remote',
  availability: 'Open for work.',
}

type Education = {
  institution: string
  credential: string
  start: string
  end: string
  details: string
}

export const EDUCATION: Education[] = [
  {
    institution: 'University of British Columbia',
    credential: 'BASc, Computer Engineering',
    start: 'Sep 2024',
    end: 'May 2029 (expected)',
    details:
      'Pursuing a degree in applied sciences computer engineering focused on advanced mathematics, software and embedded systems.',
  },
  {
    institution: 'King David High School',
    credential: 'High School Diploma',
    start: 'Sep 2020',
    end: 'Jun 2024',
    details: 'Completed STEM-focused coursework while contributing to community through tutoring and teacher assistance.',
  },
]

export type Project = {
  name: string
  description: string
  link: string
  video: string
  image?: string
  id: string
  tools: string[]
  impact: string
}

export const FEATURED_PROJECTS: Project[] = [
  {
    name: 'Flocking Birds',
    description:
      'Boids simulation using quadtrees for spacial indexing.',
    link: '/projects/project-1',
    video: '',
    image: '/featured-images/boids.png',
    id: 'project-1',
    tools: ['JavaScript', 'p5.js', 'SystemVerilog', 'Java', 'React', 'C'],
    impact: 'Interact and explore the emergent behavior of boids and see the performance gains from spatial indexing.',
  },
  {
    name: '2D Gravity Simulation',
    description: 'Interactive Newtonian gravity sandbox with path prediction and field visualization.',
    link: '/projects/project-2',
    video: '',
    image: '/featured-images/gravity.png',
    id: 'project-2',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Deepened physics intuition while building an approachable simulator.',
  },
  {
    name: 'Mandelbrot Visualization',
    description: 'Zoomable Mandelbrot explorer with HUD controls and undo support.',
    link: '/projects/project-7',
    video: '',
    image: '/featured-images/mandlebrot.png',
    id: 'project-7',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Demonstrated fractal rendering techniques and interactive navigation.',
  },
  {
    name: "Conway's Game of Life",
    description: 'Interactive Game of Life with statistics, playback controls, and speed tuning.',
    link: '/projects/project-3',
    video: '',
    image: '/featured-images/gameoflife.png',
    id: 'project-3',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Showcased cellular automata and emergent complexity in a hands-on demo.',
  },
]

export const MORE_PROJECTS: Project[] = [
  {
    name: 'QuadTree',
    description: 'Spatial index demo comparing naive searches versus quadtree subdivision.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-4/project-4.html',
    video: '',
    id: 'project-4',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Illustrated recursion techniques and AABB handling in interactive visuals.',
  },
  {
    name: 'Machine Learning Pong',
    description: 'Evolutionary neural-network agents learn to play Pong autonomously.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-5/project-5.html',
    video: '',
    id: 'project-5',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Applied neural networks and evolutionary selection to an interactive game.',
  },
  {
    name: 'Curve Fitter',
    description: 'Gradient-descent curve fitting with panning, zooming, and live error updates.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-6/project-6.html',
    video: '',
    id: 'project-6',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Built responsive data-visualization tooling to explain iterative optimization.',
  },
  {
    name: 'Hamiltonian Path Solver',
    description: 'DFS-based Hamiltonian path visualizer inspired by Block Fill.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-8/project-8.html',
    video: '',
    id: 'project-8',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Explored graph search behaviors with interactive graph exploration.',
  },
  {
    name: 'Node Graph Visualization',
    description: 'Spring-physics node graph experiments with pan and zoom controls.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-9/project-9.html',
    video: '',
    id: 'project-9',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Prototyped graph layout behaviors while porting Hamiltonian solver ideas.',
  },
  {
    name: 'Matrix Transformation',
    description: 'Affine transformation visualizer highlighting eigenvectors in real time.',
    link: 'https://danlitvak.github.io/portfolio/projects/project-10/project-10.html',
    video: '',
    id: 'project-10',
    tools: ['JavaScript', 'p5.js'],
    impact: 'Connected linear algebra concepts to interactive canvas controls.',
  },
]

export const PROJECTS: Project[] = [...FEATURED_PROJECTS, ...MORE_PROJECTS]

export type CarouselItem = {
  id: string
  title: string
  image: string
  description: string
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'carousel-flocking',
    title: 'Flocking Birds',
    image: '/featured-images/boids.png',
    description: 'Boids simulation accelerated with a quadtree, featuring 500 agents and mouse interaction.',
  },
  {
    id: 'carousel-gravity',
    title: '2D Gravity Simulation',
    image: '/featured-images/gravity.png',
    description: 'Newtonian sandbox with orbit prediction, field vectors, and draggable origin controls.',
  },
  {
    id: 'carousel-mandelbrot',
    title: 'Mandelbrot Visualization',
    image: '/featured-images/mandlebrot.png',
    description: 'Zoomable Mandelbrot explorer with HUD, undo stack, and HSB coloring for smooth gradients.',
  },
  {
    id: 'carousel-game-of-life',
    title: "Conway's Game of Life",
    image: '/featured-images/gameoflife.png',
    description: '40x20 toroidal grid with stats overlay, drag-to-paint cells, and adjustable step speed.',
  },
]

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  summary: string
  achievements: string[]
  focus: string
  stack: string[]
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'UBC Bionics Design Team',
    title: 'Co-Lead, Web Development',
    start: 'Sep 2025',
    end: 'Present',
    link: '',
    id: 'work-ubc-bionics',
    summary:
      'Leading web development for the team’s admin systems, unifying blog management and member profile tooling.',
    achievements: [
      'Built a full admin backend with dedicated databases for blogs and member profiles.',
      'Developed secure authentication flows to restrict content management to authorized teammates.',
      'Designed an integrated admin portal combining blog creation, live markdown preview, and profile editing.',
      'Implemented markdown-based blog creation with live preview to speed up publication.',
    ],
    focus: 'Admin portals, authentication, content workflows',
    stack: ['JavaScript', 'Node.js', 'marked.js', 'Database design'],
  },
  {
    company: 'Sky AI',
    title: 'Front End Developer / Technical Adviser',
    start: 'Oct 2024',
    end: 'Jan 2025',
    link: '',
    id: 'work-sky-ai',
    summary:
      'Developed real-time data visualization and troubleshooting flows that improved reporting speed and reliability.',
    achievements: [
      'Built a real-time data visualization dashboard to streamline reporting for stakeholders.',
      'Collaborated with engineers to resolve API endpoint failures and stabilize integrations.',
      'Implemented front-end features in HTML, CSS, JavaScript, and Python to ship seamless data views.',
    ],
    focus: 'Data visualization, API integration, frontend delivery',
    stack: ['HTML', 'CSS', 'JavaScript', 'Python'],
  },
  {
    company: 'Self-Employed',
    title: 'Private Tutor (Math 11, Physics 11 & 12)',
    start: 'Sep 2023',
    end: 'Present',
    link: '',
    id: 'work-private-tutor',
    summary:
      'Provide personalized STEM tutoring while managing scheduling, preparation, and client relationships.',
    achievements: [
      'Guided six high school students through exams and coursework with tailored lesson plans.',
      'Developed clear explanations that simplify complex physics and math concepts for diverse learners.',
      'Ran end-to-end scheduling and communications to support families independently.',
    ],
    focus: 'STEM education, communication, self-management',
    stack: ['Physics', 'Mathematics', 'Lesson planning'],
  },
  {
    company: 'Cactus Club Café',
    title: 'Kitchen Partner / Back of House',
    start: 'Jun 2025',
    end: 'Present',
    link: '',
    id: 'work-cactus-club',
    summary:
      'Leads dish station operations in a fast-paced kitchen while training new crew members.',
    achievements: [
      'Trained new crew and coordinated with other stations to keep high-volume service running smoothly.',
      'Supported nightly prep and back-of-house duties while maintaining a clean, organized workspace.',
      'Strengthened teamwork and communication skills under pressure alongside kitchen partners.',
    ],
    focus: 'Team coordination, training, high-volume operations',
    stack: ['Operations', 'Training', 'Teamwork'],
  },
  {
    company: "Pajo's Fish and Chips Restaurant",
    title: 'General Worker',
    start: 'Jun 2024',
    end: 'Aug 2024',
    link: '',
    id: 'work-pajos',
    summary:
      'Delivered front-of-house support and kitchen prep to keep service efficient in a seasonal restaurant.',
    achievements: [
      'Assisted guests and handled orders to maintain smooth front-of-house operations.',
      'Completed inventory organization and restocking to prepare for peak service times.',
      'Collaborated with team members across kitchen and service roles to uphold standards.',
    ],
    focus: 'Customer service, operations support, teamwork',
    stack: ['Customer service', 'Inventory', 'Teamwork'],
  },
]

type Skill = {
  name: string
}

type SkillGroup = {
  category: string
  items: Skill[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Software Development',
    items: [
      { name: 'Java 17' },
      { name: 'Java 21' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'SystemVerilog' },
      { name: 'RISCV Assembly' },
      { name: 'MatLab' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Vue' },
      { name: 'Node.js' },
      { name: 'Next.js' },
      { name: 'GitHub Pages' },
      { name: 'Canvas' },
      { name: 'p5.js' },
      { name: 'API integration' },
    ],
  },
  {
    category: 'Hardware & Embedded',
    items: [
      { name: 'Arduino' },
      { name: 'Raspberry Pi' },
      { name: 'FPGA systems' },
      { name: 'Micro-architecture' },
      { name: 'Finite State Machines' },
      { name: 'Quartus Prime' },
      { name: 'Questa Sim' },
      { name: 'Circuit prototyping' },
    ],
  },
  {
    category: 'Domains & Interests',
    items: [
      { name: 'Newtonian simulations' },
      { name: 'Cellular automata' },
      { name: 'Recursive search algorithms' },
      { name: 'Evolutionary machine learning' },
      { name: 'Boid/flocking behaviors' },
      { name: 'Service and education' },
    ],
  },
]

type Testimonial = {
  quote: string
  name: string
  role: string
}

type Highlight = {
  title: string
  description: string
}

export const SOCIAL_PROOF: { testimonials: Testimonial[]; highlights: Highlight[] } = {
  testimonials: [],
  highlights: [
    {
      title: 'Schulich Leader Scholarship Nominee',
      description: 'Recognized for academic excellence and leadership in STEM initiatives.',
    },
    {
      title: 'UBC Bionics Web Systems',
      description: 'Co-leading admin portal development with authentication, markdown editing, and profile tooling.',
    },
    {
      title: 'Interactive Simulation Portfolio',
      description: 'Built a suite of p5.js simulations covering flocking, gravity, neural networks, and fractals.',
    },
  ],
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  date: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Understanding Quadtrees: A Visual Guide',
    description:
      'Explains how quadtrees optimize spatial partitioning for flocking simulations and gravity calculations, with links to demos.',
    link: '/blog/understanding-quadtrees',
    uid: 'understanding-quadtrees',
    date: 'May 15, 2025',
  },
  {
    title: 'Automating Word Count Display on a Static Blog with Python + Git Hooks',
    description:
      'Walkthrough of a Python + PowerShell workflow that auto-generates blog word counts during git commits and renders them on a static site.',
    link: '/blog/automatic-python',
    uid: 'automatic-python',
    date: 'May 15, 2025',
  },
  {
    title: 'Neural Networks in Game Development',
    description: 'Planned exploration of neural network applications in interactive games.',
    link: '/blog/neural-networks',
    uid: 'neural-networks',
    date: '—',
  },
  {
    title: 'Developing 2D Gravity Engines',
    description: 'Planned post on building and optimizing 2D gravity and physics engines.',
    link: '/blog/physics-engines',
    uid: 'physics-engines',
    date: '—',
  },
  {
    title: 'Test Drive of Blog Features',
    description: 'A sample post that exercises headings, media, data viz, tables, and links in one place.',
    link: '/blog/test-drive-of-blog-features',
    uid: 'test-drive-of-blog-features',
    date: 'Nov 30, 2026',
  },
]

type ContactLink = {
  label: string
  link: string
  description: string
}

export const EMAIL = 'daniel.litvak.64@gmail.com'

export const RESUME_URL = 'https://danlitvak.github.io/portfolio'

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    link: '/contact?open=true',
    description: 'Send me a note about collaborations or opportunities.',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/daniel-litvak-837224313',
    description: 'Connect to discuss roles, projects, or design team work.',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/danlitvak',
    description: 'Browse my projects, simulations, and web experiments.',
  },
  {
    label: 'View legacy portfolio',
    link: 'https://danlitvak.github.io/portfolio',
    description: 'View my portfolio site with interactive projects and demos.',
  },
]
