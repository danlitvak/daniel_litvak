export type Hero = {
  name: string
  role: string
  headline: string
  statement: string
  location: string
  availability: string
}

export const HERO: Hero = {
  name: 'Daniel Litvak (he/him)',
  role: 'Front End Developer & Technical Adviser',
  headline: 'Engineer building web experiences and embedded systems with real-world impact.',
  statement:
    'Engineer passionate about computers, robotics, machine learning, and programming. Recently shipped data dashboards, admin portals, and interactive simulations across JavaScript, Python, and embedded toolchains.',
  location: 'Richmond, British Columbia · Open to Vancouver area & remote',
  availability: 'Open to collaborations and front end opportunities.',
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
      'Schulich Leader Scholarship nominee pursuing applied computer engineering with a focus on software and embedded systems.',
  },
  {
    institution: 'King David High School',
    credential: 'High School Diploma',
    start: 'Sep 2020',
    end: 'Jun 2024',
    details: 'Completed STEM-focused coursework while contributing to band and community outreach performances.',
  },
]

type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
  tools: string[]
  impact: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Tidal Tracker',
    description: 'Flood-response console showing live sensors and fastest routes.',
    link: 'https://example.com/tidal-tracker',
    video: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    id: 'project-tidal-tracker',
    tools: ['Next.js', 'Typescript', 'Leaflet', 'Supabase'],
    impact: 'Planning time cut 40% in field tests.',
  },
  {
    name: 'Canopy CoLab',
    description: 'Participatory hub for coalitions to rank tree projects and share stories.',
    link: 'https://example.com/canopy-colab',
    video: 'https://storage.googleapis.com/coverr-main/mp4/Night_Lights.mp4',
    id: 'project-canopy-colab',
    tools: ['Figma', 'React', 'D3.js', 'Notion'],
    impact: 'Volunteer engagement up 3x after launch.',
  },
  {
    name: 'Pulse Beacon',
    description: 'Hardware + software kit tracking microgrid uptime with SMS alerts.',
    link: 'https://example.com/pulse-beacon',
    video: 'https://storage.googleapis.com/coverr-main/mp4/Microchips.mp4',
    id: 'project-pulse-beacon',
    tools: ['Python', 'Arduino', 'Tailwind CSS', 'Framer'],
    impact: 'Unified service blueprint adopted by five pilot sites.',
  },
]

export type CarouselItem = {
  id: string
  title: string
  image: string
  description: string
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'carousel-coastal-grid',
    title: 'Coastal sensor mesh',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    description:
      'LoRa-connected tide and air-quality nodes feeding a unified dashboard for harbor safety teams.',
  },
  {
    id: 'carousel-lab-prototype',
    title: 'Inclusive lab kiosk',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    description:
      'Touch-friendly wayfinding prototype with ambient cues for multilingual visitors and screen readers.',
  },
  {
    id: 'carousel-climate-sim',
    title: 'Climate workshop sim',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    description:
      'Desktop simulator that lets facilitators rehearse decision playbooks before community workshops.',
  },
  {
    id: 'carousel-field-handoff',
    title: 'Field kit handoff',
    image:
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80',
    description:
      'Hardware handoff flow connecting volunteers with localized checklists and SMS updates.',
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
    ],
    focus: 'Admin portals, authentication, content workflows',
    stack: ['JavaScript', 'Node.js', 'marked.js', 'Database design'],
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
    category: 'Product & Research',
    items: [
      { name: 'Design strategy' },
      { name: 'Mixed-methods research' },
      { name: 'Service blueprints' },
      { name: 'Design ops facilitation' },
    ],
  },
  {
    category: 'Interaction & Visual',
    items: [
      { name: 'Figma' },
      { name: 'Prototyping in Framer' },
      { name: 'Motion primitives' },
      { name: 'Accessibility audits' },
    ],
  },
  {
    category: 'Engineering',
    items: [
      { name: 'TypeScript' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'Node.js' },
    ],
  },
  {
    category: 'Collaboration',
    items: [
      { name: 'Workshop facilitation' },
      { name: 'Public speaking' },
      { name: 'Mentorship' },
      { name: 'Spanish' },
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
  testimonials: [
    {
      quote:
        'Alex blends rigorous research with rapid prototyping. Their ability to visualize complex systems keeps our teams aligned.',
      name: 'Priya Natarajan',
      role: 'Director of Product, Lumen Collective',
    },
    {
      quote: 'A calm, thoughtful collaborator who elevates every workshop with empathy and clarity.',
      name: 'Jordan Lee',
      role: 'Service Design Lead, City of Austin',
    },
  ],
  highlights: [
    {
      title: 'UX for Social Good Scholar',
      description: 'Awarded by Interaction Design Foundation for work on equitable emergency response tools.',
    },
    {
      title: 'Climate Tech Innovation Challenge Winner',
      description: 'Led Pulse Beacon team to first place among 42 global submissions.',
    },
    {
      title: 'ACM Student Chapter President',
      description: 'Grew membership 3x by launching mentorship programs and inclusive hackathons.',
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
    title: 'Test Drive of Blog Features',
    description:
      'A sample post showing typography, media, charts, tables, and links in one place.',
    link: '/blog/test-drive-of-blog-features',
    uid: 'blog-test-drive',
    date: 'January 15, 2025',
  },
  {
    title: 'Sketching Decision Playbooks for Climate Operations',
    description:
      'Three facilitation moves that help emergency planners translate research into actionable dashboards.',
    link: '/blog/sketching-decision-playbooks',
    uid: 'blog-decision-playbooks',
    date: 'January 7, 2025',
  },
  {
    title: 'Rapid Research in Resource-Constrained Teams',
    description:
      'A field-tested approach to mixing diary studies with SMS feedback loops.',
    link: '/blog/rapid-research-field-notes',
    uid: 'blog-rapid-research',
    date: 'December 12, 2024',
  },
  {
    title: 'Designing with Microgrids in Mind',
    description:
      'What rural clinics taught me about resilience, maintenance, and trust.',
    link: '/blog/designing-with-microgrids',
    uid: 'blog-microgrids',
    date: 'October 3, 2024',
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
    link: 'mailto:daniel.litvak.64@gmail.com',
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
    label: 'Portfolio',
    link: 'https://danlitvak.github.io/portfolio',
    description: 'View my portfolio site with interactive projects and demos.',
  },
]
