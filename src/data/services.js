import { Code2, Sparkles, Workflow, AppWindow, BarChart3, Server } from 'lucide-react';

/** Service catalogue — used by the Services page, Home overview, footer anchors and the contact form. */
export const services = [
  {
    id: 'custom-software',
    icon: Code2,
    title: 'Custom Software Development',
    summary:
      'Web applications and business systems designed around the way your organisation actually works, instead of forcing your teams into a generic tool.',
    value:
      'You get software that matches your process, your terminology and your approval structure — and you are not paying for modules nobody uses.',
    items: [
      'Custom web applications',
      'Enterprise applications',
      'Business management systems',
      'Internal portals',
      'Workflow management',
      'API development',
      'Database-driven systems',
    ],
    applications: ['Operations portals', 'Visitor, permit and complaint systems', 'Department-specific tools that replace spreadsheets'],
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'AI & Generative AI',
    summary:
      'Practical AI features built into business applications: assistants that answer from your own documents, and automation for reading, sorting and summarising information.',
    value:
      'Teams spend less time searching, re-typing and summarising, while people stay in control of decisions and approvals.',
    items: [
      'AI-powered business applications',
      'Generative AI integration',
      'AI assistants',
      'Business chat interfaces',
      'Document processing',
      'Knowledge-base assistants',
      'AI-enabled automation',
    ],
    applications: ['Internal knowledge assistants', 'Document and form data extraction', 'Draft replies and report summaries for staff to review'],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Business Automation',
    summary:
      'Repetitive, manual steps — approvals, reminders, data entry between systems, routine reports — turned into reliable automated workflows.',
    value:
      'Work moves forward without someone chasing it, records stay consistent between systems, and every step leaves a trace.',
    items: [
      'Workflow automation',
      'Approval management',
      'Notification systems',
      'Data synchronisation',
      'Reporting automation',
      'Third-party integrations',
    ],
    applications: ['Multi-level approval flows', 'Email and in-app alerts on status changes', 'Scheduled reports and Google Sheets synchronisation'],
  },
  {
    id: 'saas',
    icon: AppWindow,
    title: 'SaaS & Business Applications',
    summary:
      'Multi-user applications with roles, permissions and admin controls — built either as your internal platform or as a product you offer to your own customers.',
    value:
      'A single, structured system that many users and locations can work in at once, with the right access for each role.',
    items: [
      'SaaS application development',
      'Multi-user systems',
      'Role-based access',
      'Administrative dashboards',
      'Subscription-based applications',
      'Custom enterprise modules',
    ],
    applications: ['Multi-site operations platforms', 'Customer or vendor portals', 'Modular ERP-style applications built in phases'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Data Analytics & BI',
    summary:
      'MIS dashboards and reports that bring scattered operational data into one clear view for managers and leadership.',
    value:
      'Decisions are based on current numbers rather than last month’s spreadsheet, and routine reporting stops consuming working hours.',
    items: [
      'MIS dashboards',
      'Business reporting',
      'KPI dashboards',
      'Power BI integration',
      'Data visualisation',
      'Reporting automation',
    ],
    applications: ['Management dashboards', 'Site and department performance reports', 'Meter-reading and consumption reporting'],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: 'IT Infrastructure',
    summary:
      'Deployment, hosting and upkeep for the applications we build: servers configured properly, releases handled carefully and systems kept running.',
    value:
      'Your application is hosted in an environment you control, with a team that knows the system looking after it.',
    items: [
      'VPS hosting',
      'Application deployment',
      'Nginx configuration',
      'Docker deployment',
      'Database setup',
      'Server configuration',
      'Application maintenance',
    ],
    applications: ['Production deployment on a VPS', 'Containerised application setups', 'Ongoing maintenance and updates'],
  },
];

/** The four headline categories shown on the home page. */
export const serviceOverview = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    text: 'Business applications, portals and management systems built around your process.',
    points: ['Custom web applications', 'Internal portals', 'API development'],
    to: '/custom-software-development',
  },
  {
    icon: Sparkles,
    title: 'AI & Intelligent Automation',
    text: 'AI assistants, document processing and automated workflows that remove repetitive work.',
    points: ['AI assistants', 'Document processing', 'Workflow automation'],
    to: '/agentic-ai-development',
  },
  {
    icon: AppWindow,
    title: 'Business Applications & SaaS',
    text: 'Multi-user platforms with roles, admin dashboards and modules that grow with you.',
    points: ['SaaS development', 'Role-based access', 'Custom enterprise modules'],
    to: '/saas-development',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & IT Solutions',
    text: 'MIS dashboards, Power BI reporting, deployment and ongoing application support.',
    points: ['MIS & KPI dashboards', 'Power BI integration', 'VPS deployment'],
    to: '/data-analytics',
  },
];

/** Options for the "Service Required" dropdown on the contact form. */
export const serviceOptions = [
  'Custom Software Development',
  'AI & Automation',
  'SaaS Development',
  'Business Applications',
  'Data Analytics',
  'IT Infrastructure',
  'Other',
];

/** Engagement models — pricing is always scoped per project; no rates are published. */
export const engagementModels = [
  {
    code: '01',
    title: 'Custom Software Projects',
    text: 'A defined scope delivered in agreed phases — from requirements and design through development, testing and deployment.',
    suits: 'Best for a specific system or portal with clear requirements.',
  },
  {
    code: '02',
    title: 'AI & Automation Projects',
    text: 'Start with one workflow or use case, prove it works with your real data, then extend it step by step.',
    suits: 'Best for reducing manual work in an existing process.',
  },
  {
    code: '03',
    title: 'SaaS Development',
    text: 'A multi-user product built module by module, with roles, administration and room to add features after launch.',
    suits: 'Best for platforms used across teams, sites or customers.',
  },
  {
    code: '04',
    title: 'Ongoing Maintenance & Support',
    text: 'Updates, fixes, hosting care and small improvements for applications that are already live.',
    suits: 'Best for keeping a running system healthy and current.',
  },
];
