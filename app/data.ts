export type Hero = {
  name: string
  role: string
  headline: string
  statement: string
  location: string
  availability: string
}

export const HERO: Hero = {
  name: 'Alex Rivera',
  role: 'Product Design Technologist',
  headline: 'Designing inclusive, climate-resilient digital products.',
  statement:
    'Graduate researcher translating systems thinking into actionable product strategy. I partner with mission-driven teams to prototype services that balance sustainability goals with measurable user outcomes.',
  location: 'Austin, TX · Remote friendly',
  availability: 'Actively interviewing for Summer 2025 product design roles.',
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
    institution: 'University of Cascadia',
    credential: 'M.S. Human–Computer Interaction',
    start: '2023',
    end: '2025 (expected)',
    details:
      'Research assistant in the Inclusive Futures Lab studying decision-support tools for climate adaptation teams.',
  },
  {
    institution: 'Coastal State University',
    credential: 'B.S. Computer Science, UX Design minor',
    start: '2019',
    end: '2023',
    details: 'Graduated magna cum laude; Honors thesis on resilient design systems for civic technology.',
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
    company: 'Lumen Collective',
    title: 'Product Design Intern',
    start: 'Jun 2024',
    end: 'Present',
    link: 'https://example.com/lumen',
    id: 'work-lumen',
    summary: 'Designing planning tools that help climate tech founders calibrate go-to-market experiments.',
    achievements: [
      'Led discovery sprints with 18 founders to define decision criteria for capital-efficient product bets.',
      'Co-created a design system in Figma + Storybook that reduced prototype handoff time by 60%.',
    ],
    focus: 'Product discovery, experimentation strategy, design systems',
    stack: ['Figma', 'Storybook', 'TypeScript'],
  },
  {
    company: 'CivicLab ATX',
    title: 'UX Research Fellow',
    start: 'Aug 2023',
    end: 'May 2024',
    link: 'https://example.com/civiclab',
    id: 'work-civiclab',
    summary: 'Partnered with the City of Austin innovation office to shape digital services for climate migration support.',
    achievements: [
      'Synthesized 120+ qualitative insights into decision frameworks adopted by three municipal partners.',
      'Facilitated co-design workshops with residents to validate multilingual navigation prototypes.',
    ],
    focus: 'Participatory research, civic service design, multilingual UX',
    stack: ['Dovetail', 'Figma', 'Airtable'],
  },
  {
    company: 'Open Source Observatory',
    title: 'Design Engineer',
    start: 'May 2021',
    end: 'Aug 2023',
    link: 'https://example.com/oso',
    id: 'work-oso',
    summary: 'Shipped inclusive data visualizations for researchers and journalists covering environmental equity.',
    achievements: [
      'Implemented accessibility-first component library and paired with engineers to meet WCAG 2.2 AA.',
      'Scaled contentful-driven publishing workflow that now supports 30+ partner organizations.',
    ],
    focus: 'Design engineering, accessibility systems, data storytelling',
    stack: ['React', 'TypeScript', 'Contentful'],
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

export const EMAIL = 'hello@alexrivera.dev'

export const RESUME_URL = 'https://alex-rivera.dev/resume.pdf'

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    link: '/contact?open=true',
    description: 'Open the EmailJS form and reach out directly.',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/alex-rivera',
    description: 'Let’s connect for product and research chats.',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/alexrivera',
    description: 'Browse prototypes, component experiments, and tooling.',
  },
]
