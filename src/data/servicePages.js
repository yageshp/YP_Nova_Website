import { Code2, Bot, Blocks, Workflow, AppWindow, BarChart3 } from 'lucide-react';

/**
 * Dedicated service landing pages — one per search intent (see docs/SEO-KEYWORD-MAP.md).
 * Honesty rule: `experience.delivered` lists only verified project work; everything else is
 * described as a capability offered for custom development.
 *
 * Inline links in body text use [anchor text](/path) and are rendered as internal links.
 */
export const servicePages = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'custom-software-development',
    icon: Code2,
    navLabel: 'Custom Software Development',
    seoTitle: 'Custom Software Development Services in India',
    metaDescription:
      'Custom software development services from YP Nova: business applications, enterprise software, web applications and workflow systems built around your process.',
    eyebrow: 'Custom software development company in India',
    h1: ['Custom Software Development Services', 'for Growing Businesses'],
    intro:
      'YP Nova is a software development company in India offering custom software services for growing businesses: custom business software development, custom web application development, enterprise software development and business application development — all shaped around how your organisation actually works. We work with businesses across India and with international clients, delivering projects remotely.',
    experience: {
      delivered: [
        'A Management Information System that reads operational data through the Google Sheets API, with meter-reading reports and dashboards.',
        'A Visitor Management System deployed on a VPS, with a Work Permit System and Complaint Management in the same environment.',
      ],
      note: 'These were delivered for a facility management and MEP operations client. Other application types below are offered as custom development.',
    },
    sections: [
      {
        id: 'what-is-custom-software',
        heading: 'What is custom software development?',
        body: [
          'Custom software development means designing and building an application for one organisation’s specific requirements, rather than adapting a ready-made product that was built for everyone. The screens, fields, approval steps, reports and user roles follow your process and your terminology.',
          'In practice, most custom business software replaces a combination of spreadsheets, paper registers, email threads and messaging groups that a team has been using to hold a process together. The aim is a single system where information is entered once and is available to everyone who needs it.',
        ],
      },
      {
        id: 'why-custom',
        heading: 'Why businesses choose custom software services',
        cards: [
          { title: 'The process does not fit a product', text: 'Approval levels, site structures or reporting formats that generic software cannot model without workarounds.' },
          { title: 'Spreadsheets have reached their limit', text: 'Several people editing the same files, versions drifting apart, and reports that take days to compile.' },
          { title: 'Per-user licences are adding up', text: 'Subscription costs that grow with headcount for features most users never touch.' },
          { title: 'Data needs to stay under your control', text: 'Hosting, access rules and data retention decided by you, not by a vendor’s plan.' },
        ],
        body: [
          'Custom development is not always the right answer. For standard functions such as email or accounting, an established product is usually better. We explain this trade-off in [custom software vs off-the-shelf software](/insights/custom-software-vs-saas).',
        ],
      },
      {
        id: 'what-we-build',
        heading: 'Business application development: what we build',
        cards: [
          { title: 'Custom web application development', text: 'Browser-based systems that work on desktops, tablets and phones without installation.' },
          { title: 'Enterprise software development', text: 'Multi-department applications with roles, approvals and reporting — including [custom ERP development](/custom-erp-development).' },
          { title: 'Internal portals', text: 'Employee, site or vendor portals that bring documents, requests and status into one place.' },
          { title: 'Workflow management systems', text: 'Requests that move through defined steps with owners, status and history — see [business process automation](/business-process-automation).' },
          { title: 'APIs and integrations', text: 'REST APIs that connect your application with other systems, spreadsheets or reporting tools.' },
          { title: 'Database-driven systems', text: 'Structured records with search, filters, exports and audit history, built on MySQL or PostgreSQL.' },
        ],
      },
      {
        id: 'use-cases',
        heading: 'Business use cases',
        body: [
          'Typical requirements we are asked to solve include replacing a paper gate register with a [visitor management system](/solutions/visitor-management-system), moving permit approvals into a [work permit management system](/solutions/work-permit-management-system), giving every complaint an owner with a [complaint management system](/solutions/complaint-management-system), and consolidating operational spreadsheets into an [MIS dashboard](/solutions/management-information-system).',
        ],
        bullets: [
          'Operations registers and daily logs for multi-site teams',
          'Approval workflows for purchases, permits or requests',
          'Stores and stock tracking linked to purchasing',
          'Management reporting built from data teams already record',
          'Customer- or vendor-facing portals',
        ],
      },
      {
        id: 'process',
        heading: 'Our custom software development process',
        steps: [
          { title: 'Discovery', text: 'We map how the work is done today, who is involved and where time or information is being lost.' },
          { title: 'Requirements and architecture', text: 'Modules, data structure, user roles, integrations and phases are agreed and written down.' },
          { title: 'UI/UX design and development', text: 'Screens are designed and built in stages, and you review working software regularly.' },
          { title: 'Testing and deployment', text: 'The application is tested with real scenarios, deployed to your hosting and handed over with training.' },
          { title: 'Support and improvement', text: 'We maintain the system and extend it as real usage shows what to improve next.' },
        ],
      },
    ],
    stack: true,
    industries: ['facility-management', 'construction-mep', 'manufacturing', 'security-services', 'logistics', 'startups-growing-businesses'],
    relatedSolutions: ['visitor-management-system', 'management-information-system', 'work-permit-management-system', 'inventory-management-system'],
    relatedServices: ['custom-erp-development', 'business-process-automation', 'saas-development'],
    relatedInsights: ['custom-software-vs-saas', 'how-custom-software-connects-departments', 'benefits-of-custom-business-software'],
    faqs: [
      { q: 'What is custom software development?', a: 'It is the design and development of an application built for one organisation’s own processes, users and reports, instead of adapting a ready-made product. The result fits the way your team already works and can be changed as your business changes.' },
      { q: 'How much does custom software development cost?', a: 'Cost depends on the number of modules, user roles, integrations and the level of reporting required. We do not publish fixed prices; after an initial discussion we provide a written estimate for your actual scope. Starting with one well-defined module keeps the first investment modest.' },
      { q: 'How long does a custom software project take?', a: 'A focused single-module application usually takes weeks rather than months, while multi-module systems are delivered in phases. We agree a phase plan during discovery so you have usable software early instead of waiting for everything at once.' },
      { q: 'Can custom software integrate with our existing systems?', a: 'Usually, yes. We build REST API integrations and can read from or write to tools such as Google Sheets. Whether a particular system can be connected depends on the access it provides, which we confirm during discovery.' },
      { q: 'Does YP Nova provide ongoing support after launch?', a: 'Yes. We offer maintenance and support for the applications we build, covering fixes, updates, hosting care and improvements identified through real use.' },
      { q: 'What do your custom software development services include?', a: 'Requirement analysis, solution planning, UI/UX design, development, testing, deployment and ongoing support. Depending on the project this covers web applications, internal portals, workflow and approval systems, APIs and integrations, and reporting dashboards.' },
      { q: 'Who owns the software and the data?', a: 'Ownership terms are set out in the project agreement. Your business data remains yours, and we agree hosting and access arrangements with you before deployment.' },
    ],
    cta: { title: 'Planning a custom application?', text: 'Describe the process you want to improve. We will reply with questions, a suggested first phase and an estimate based on your actual requirements.' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'agentic-ai-development',
    icon: Bot,
    navLabel: 'Agentic AI Development',
    seoTitle: 'Agentic AI & AI Agent Development Services',
    metaDescription:
      'AI agent development, generative AI integration and AI-assisted workflow automation for business operations, with human approval and clear controls.',
    eyebrow: 'Agentic AI development',
    h1: ['Agentic AI & AI Agent', 'Development for Business'],
    intro:
      'Our agentic AI development and AI agent development services cover business assistants, generative AI development, AI integration services and AI automation solutions that work with your own documents, data and software — with people kept in control of the decisions that matter.',
    experience: {
      delivered: [],
      note: 'Agentic AI and AI agent solutions are offered as custom development. YP Nova has not published a deployed autonomous AI agent case study; our delivered project experience is in business applications, MIS dashboards and workflow systems, which is where AI features are added.',
    },
    sections: [
      {
        id: 'what-is-agentic-ai',
        heading: 'What is agentic AI?',
        body: [
          'Agentic AI describes AI systems that do more than answer a single question. An agentic system is given a goal, plans the steps needed, uses tools — such as searching documents, reading a database or calling an API — checks the result, and continues until the task is done or it needs a person to decide.',
          'For a business, the useful question is not whether a system is “agentic” but which multi-step tasks it can reliably carry out, what it is allowed to change, and where a human must approve.',
        ],
      },
      {
        id: 'what-are-ai-agents',
        heading: 'What are AI agents?',
        body: [
          'An AI agent is a software component built around a large language model that can take actions through defined tools. A support-triage agent might read an incoming request, look up the customer’s history, classify the issue and draft a reply for a staff member to approve. Each tool the agent can use is explicitly granted and logged.',
        ],
      },
      {
        id: 'agentic-vs-automation',
        heading: 'Agentic AI vs traditional automation',
        table: {
          columns: ['', 'Traditional workflow automation', 'Agentic AI'],
          rows: [
            ['Works best with', 'Structured data and fixed rules', 'Unstructured text, documents and judgement-like steps'],
            ['Behaviour', 'Follows the same path every time', 'Chooses steps and tools to reach a goal'],
            ['Predictability', 'Fully predictable', 'Needs limits, checks and review points'],
            ['Typical example', 'Send approval request when a form is submitted', 'Read a supplier email, extract the order details and prepare a draft purchase request'],
          ],
        },
        body: [
          'Most real solutions combine both: rule-based [business process automation](/business-process-automation) for the predictable steps, and AI only where language or documents are involved.',
        ],
      },
      {
        id: 'use-cases',
        heading: 'Business use cases for AI agents and AI automation solutions',
        cards: [
          { title: 'Request and email triage', text: 'Classify incoming requests, extract key details and route them to the right team with a draft response.' },
          { title: 'Document processing', text: 'Read invoices, forms or reports and turn them into structured data for staff to verify.' },
          { title: 'Knowledge-base assistants', text: 'Answer staff questions from your SOPs, manuals and policies, with links to the source.' },
          { title: 'Report summaries', text: 'Turn dashboards and operational logs into short written summaries for managers.' },
          { title: 'Data entry assistance', text: 'Pre-fill records in your business application from unstructured inputs, ready for review.' },
          { title: 'Operations follow-up', text: 'Identify overdue items in a workflow and prepare reminders or escalations for approval.' },
        ],
      },
      {
        id: 'architecture',
        heading: 'AI agent architecture and AI integration services',
        body: [
          'A production AI agent is a small system rather than a single prompt. We design four parts: the model, chosen for the task and data-handling needs; the tools the agent may use, each a narrow, audited function such as “search documents” or “create draft record”; the context it is given, retrieved from your approved sources; and the controls — permissions, limits, logging and approval steps.',
          'Agents connect to your environment through APIs — your [custom business application](/custom-software-development), databases, Google Sheets or other systems that offer access.',
        ],
      },
      {
        id: 'documents-knowledge',
        heading: 'Document and knowledge-base automation',
        body: [
          'Knowledge-base assistants use retrieval: your documents are indexed, the most relevant passages are found for each question, and the model answers from those passages only. Answers can show their source so staff can check them, and access can follow the same roles as your business application.',
        ],
      },
      {
        id: 'assistants',
        heading: 'AI assistants for business operations',
        body: [
          'An assistant inside an existing application is often the most practical starting point: a “summarise this record”, “draft a reply” or “explain this report” action placed where staff already work, rather than a separate chatbot. See how this applies in [AI in day-to-day business operations](/insights/ai-in-business-operations).',
        ],
      },
      {
        id: 'human-oversight',
        heading: 'Human approval and oversight workflows',
        bullets: [
          'Agents prepare drafts and suggestions; a named person approves anything that changes records, money or customer communication.',
          'Every tool call and decision is logged for review.',
          'Confidence thresholds route uncertain cases to people rather than guessing.',
          'Agents can be paused or limited per task without changing the rest of the system.',
        ],
      },
      {
        id: 'security',
        heading: 'Enterprise AI solutions: security and data considerations',
        body: [
          'Before building, we agree which data the AI may see, where it is processed, how long it is kept and who can use each feature. Sensitive fields can be excluded or masked, access follows user roles, and the choice of AI model provider is made with your data-handling requirements in mind. AI output is treated as a draft that can be wrong, and the design reflects that.',
        ],
      },
      {
        id: 'process',
        heading: 'Our AI development process',
        steps: [
          { title: 'Pick one workflow', text: 'Choose a task where staff spend time reading, sorting or re-typing information.' },
          { title: 'Test with real examples', text: 'Build a prototype and measure it against real, anonymised cases before committing further.' },
          { title: 'Design controls', text: 'Define permissions, approval points, logging and failure handling.' },
          { title: 'Integrate', text: 'Connect the agent to your application and data sources through APIs.' },
          { title: 'Monitor and extend', text: 'Review accuracy in use, then extend to the next workflow.' },
        ],
      },
    ],
    stack: false,
    industries: ['professional-services', 'facility-management', 'logistics', 'healthcare'],
    relatedSolutions: ['complaint-management-system', 'management-information-system'],
    relatedServices: ['business-process-automation', 'custom-software-development', 'data-analytics'],
    relatedInsights: ['what-is-agentic-ai', 'ai-in-business-operations', 'business-workflow-automation'],
    faqs: [
      { q: 'What is agentic AI development?', a: 'It is the design and development of AI systems that can carry out multi-step tasks — planning steps, using approved tools such as document search or APIs, and checking results — within limits and approval points you define.' },
      { q: 'What is an AI agent?', a: 'An AI agent is software built around a language model that can take actions through specific, permitted tools. For example, it can read a request, look up related records and prepare a draft response for a staff member to approve.' },
      { q: 'What business tasks can AI agents automate?', a: 'Good candidates involve reading and organising information: triaging requests, extracting data from documents, answering questions from internal knowledge, summarising reports and preparing drafts. Tasks with legal, financial or safety consequences should keep a human approval step.' },
      { q: 'Can AI agents connect to our existing business software?', a: 'Yes, where the software offers an API or another reliable access method. The agent is given narrow tools — for example “create a draft ticket” — rather than broad access, and every action is logged.' },
      { q: 'How are AI agents monitored and controlled?', a: 'Through permissions on each tool, approval steps for consequential actions, logs of every decision and action, confidence thresholds that send uncertain cases to people, and the ability to pause an agent at any time.' },
      { q: 'Do you offer generative AI development?', a: 'Yes, as custom development: assistants that answer from your own documents, drafting and summarising features inside business applications, and document processing — each with review steps and access controls agreed in advance.' },
      { q: 'Has YP Nova deployed AI agents for clients?', a: 'Not yet as a published case study. Our delivered work is in business applications, MIS dashboards and workflow systems. AI agents and assistants are offered as custom development, and we recommend starting with a tested prototype on one workflow.' },
    ],
    cta: { title: 'Exploring AI for a specific workflow?', text: 'Tell us which task takes your team the most reading, sorting or re-typing. We will assess whether AI is a good fit and suggest a small, testable first step.' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'custom-erp-development',
    icon: Blocks,
    navLabel: 'Custom ERP Development',
    seoTitle: 'Custom ERP Development Services in India',
    metaDescription:
      'Custom ERP development for operations, inventory, procurement, HR, approvals and reporting — modular business software with role-based access.',
    eyebrow: 'ERP development company · ERP services',
    h1: ['Custom ERP Development', 'for Connected Business Operations'],
    intro:
      'As an ERP development company, YP Nova provides ERP software development services for growing businesses: custom ERP software development in modules — operations, inventory, procurement, HR, approvals and reporting — on one connected database, with ERP integration services for the tools you already use.',
    experience: {
      delivered: [
        'Operational modules in a connected environment: MIS reporting, visitor management, work permits and complaint management for a facility management and MEP operations client.',
      ],
      note: 'YP Nova has not published a complete ERP implementation. ERP modules such as inventory, procurement and HR are offered as custom development, built on the same approach as our delivered operational systems.',
    },
    sections: [
      {
        id: 'what-is-custom-erp',
        heading: 'What is custom ERP development?',
        body: [
          'ERP (enterprise resource planning) software connects the core activities of a business — purchasing, stores, operations, people, finance-related records and reporting — so that information flows between departments instead of being re-entered in each one.',
          'Custom ERP development means building those modules around your organisation’s structure and processes, usually in phases, rather than configuring a large packaged ERP and adapting your business to it.',
        ],
      },
      {
        id: 'when-needed',
        heading: 'When does a business need a custom ERP?',
        bullets: [
          'Departments keep separate spreadsheets that must be reconciled every month.',
          'Approvals for purchases, issues or expenses happen over email and messaging and are hard to trace.',
          'A packaged ERP was tried but the processes it imposes do not match how you operate.',
          'You need site-wise, project-wise or client-wise views that standard products do not provide.',
          'The business is growing and needs a foundation that can add modules over time.',
        ],
      },
      {
        id: 'custom-vs-packaged',
        heading: 'Custom ERP vs off-the-shelf ERP',
        table: {
          columns: ['', 'Off-the-shelf ERP', 'Custom ERP'],
          rows: [
            ['Fit to process', 'You adapt to the product’s workflows', 'Built around your workflows and terminology'],
            ['Scope', 'Large suite; many unused modules', 'Only the modules you need, added in phases'],
            ['Cost model', 'Usually per-user licences plus implementation', 'Development cost per phase; hosting and support agreed separately'],
            ['Time to first use', 'Depends on configuration and data migration', 'First module can go live while others are built'],
            ['Changes later', 'Limited to what the vendor allows', 'Changed or extended as the business evolves'],
          ],
        },
        body: [
          'Where accounting is concerned, most businesses are best served by keeping established accounting software and connecting it to a custom ERP, rather than rebuilding accounting from scratch.',
        ],
      },
      {
        id: 'modules',
        heading: 'Core modules in our business ERP solutions',
        cards: [
          { title: 'Inventory management', text: 'Item masters, receipts, issues, transfers and location-wise stock. See [inventory management system](/solutions/inventory-management-system).' },
          { title: 'Procurement and purchase orders', text: 'Requisitions, approval levels, vendors and purchase orders. See [procurement management system](/solutions/procurement-management-system).' },
          { title: 'HR and workforce management', text: 'Employee records, site deployment, attendance and leave, with month-end reports.' },
          { title: 'Operations management', text: 'Registers, permits, complaints and daily logs for sites and departments.' },
          { title: 'Finance and accounts integration', text: 'Purchase, stock and expense records prepared for, or exchanged with, your accounting software.' },
          { title: 'Reports and dashboards', text: 'Department and management reports, KPI dashboards and Power BI where required.' },
        ],
      },
      {
        id: 'finance',
        heading: 'Finance and accounts integration',
        body: [
          'A custom ERP usually feeds finance rather than replacing it. Purchase orders, goods receipts, stock movements and approved expenses can be exported in agreed formats or exchanged through an API where your accounting software provides one. The integration approach depends on the accounting product in use and is confirmed during discovery.',
        ],
      },
      {
        id: 'inventory',
        heading: 'Inventory management',
        body: [
          'Stock is recorded as it moves — receipts against purchase orders, issues against requests, transfers between locations — so balances are always current. Minimum levels can trigger purchase requisitions, linking stores directly to procurement.',
        ],
      },
      {
        id: 'procurement',
        heading: 'Procurement and purchase orders',
        body: [
          'Requirements are raised in the system, approved at levels that mirror your organisation, converted to purchase orders and received against the order. Every step has an owner and a date, so pending approvals and open orders are always visible.',
        ],
      },
      {
        id: 'hr',
        heading: 'HR and workforce management',
        body: [
          'For organisations with staff deployed across many sites, the HR module tracks employee records, site deployment, attendance and leave, and produces month-end reports that feed your payroll process.',
        ],
      },
      {
        id: 'operations',
        heading: 'Operations management',
        body: [
          'Operational modules are where our delivered experience lies: [visitor management](/solutions/visitor-management-system), [work permits](/solutions/work-permit-management-system), [complaint management](/solutions/complaint-management-system) and [MIS reporting](/solutions/management-information-system). In a custom ERP these sit alongside purchasing, stores and HR on the same data.',
        ],
      },
      {
        id: 'reports',
        heading: 'Reports and dashboards',
        body: [
          'Every module produces its own registers and reports, and management dashboards combine them. For deeper analysis we connect ERP data to Power BI — see [data analytics and MIS](/data-analytics).',
        ],
      },
      {
        id: 'access',
        heading: 'Role-based access',
        body: [
          'Users see and do only what their role allows: a storekeeper records issues, a site engineer raises requisitions, a manager approves, and leadership views dashboards. Roles can be limited by site, department or project.',
        ],
      },
      {
        id: 'integrations',
        heading: 'ERP integration services',
        body: [
          'ERP modules can exchange data with accounting software, Google Sheets, email and messaging notifications, Power BI and other systems through REST APIs or agreed file formats. Third-party integrations depend on the access each product provides and are scoped individually.',
        ],
      },
      {
        id: 'process',
        heading: 'Our ERP application development process',
        steps: [
          { title: 'Map processes', text: 'Document how each department works today and where information is re-entered.' },
          { title: 'Prioritise modules', text: 'Choose the module that will remove the most friction first.' },
          { title: 'Build phase one', text: 'Design, develop and test the first module with real data and users.' },
          { title: 'Go live and train', text: 'Deploy, train users and gather feedback from daily use.' },
          { title: 'Add modules', text: 'Extend the ERP phase by phase on the same database.' },
        ],
      },
    ],
    stack: true,
    industries: ['manufacturing', 'construction-mep', 'facility-management', 'logistics', 'retail', 'startups-growing-businesses'],
    relatedSolutions: ['inventory-management-system', 'procurement-management-system', 'management-information-system', 'work-permit-management-system'],
    relatedServices: ['custom-software-development', 'business-process-automation', 'data-analytics'],
    relatedInsights: ['custom-erp-development-guide', 'how-custom-software-connects-departments', 'technology-for-growing-businesses'],
    faqs: [
      { q: 'What is custom ERP development?', a: 'It is building ERP software — connected modules for purchasing, stores, operations, HR and reporting — around your own processes and organisation structure, usually in phases, rather than configuring a large packaged ERP.' },
      { q: 'What modules can a custom ERP include?', a: 'Common modules are inventory, procurement and purchase orders, HR and workforce management, operations registers, approvals, reports and dashboards, plus integration with accounting software. You choose the modules and their order.' },
      { q: 'Is custom ERP suitable for small businesses?', a: 'Often, yes — because you can start with one module that solves your most pressing problem and add others later. A phased approach spreads the investment and avoids paying for features you do not use.' },
      { q: 'Can a custom ERP integrate with our existing accounting software?', a: 'In most cases. Depending on what your accounting product supports, we exchange data through an API or agreed import/export formats. We confirm the method during discovery.' },
      { q: 'How is custom ERP different from ready-made ERP?', a: 'Ready-made ERP gives you a large set of predefined workflows to configure. Custom ERP is built for your workflows, includes only what you need, and can be changed as your business changes — in exchange for a development phase before each module goes live.' },
      { q: 'Do you provide ERP integration services?', a: 'Yes. We connect custom ERP modules with accounting software, Google Sheets, reporting tools such as Power BI and other systems through REST APIs or agreed import/export formats, depending on the access each product provides.' },
      { q: 'How long does it take to build a custom ERP?', a: 'It depends on the number of modules and integrations. Because we deliver in phases, the first module can be in use while later modules are still being built. A phase plan with timelines is part of the estimate.' },
    ],
    cta: { title: 'Considering a custom ERP?', text: 'Tell us which departments and processes you want to connect first. We will suggest a phased module plan and an estimate for phase one.' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'business-process-automation',
    icon: Workflow,
    navLabel: 'Business Process Automation',
    seoTitle: 'Business Process Automation Services',
    metaDescription:
      'Automate approvals, reporting, notifications, data synchronisation and operational workflows with custom software, API integrations and AI-assisted automation.',
    eyebrow: 'Business automation services',
    h1: ['Business Process', 'Automation Services'],
    intro:
      'Our business process automation services and business automation solutions take over the repetitive steps that slow a business down — workflow automation for approvals, data synchronisation, reminders and routine reports — so work moves forward on its own and every step leaves a record.',
    experience: {
      delivered: [
        'Automated operational reporting: an MIS that retrieves data from Google Sheets through the Google Sheets API and produces meter-reading reports and dashboards without manual consolidation.',
        'Digital permit and complaint workflows that replaced paper and verbal processes.',
      ],
      note: 'Other automation types below are offered as custom development.',
    },
    sections: [
      {
        id: 'what-to-automate',
        heading: 'What business process automation covers',
        body: [
          'Business process automation (BPA) uses software to carry out the predictable parts of a process: moving a request to the next person, notifying the right people, updating related records and compiling reports. People keep the parts that need judgement; the system handles the movement and the record-keeping.',
          'A practical way to start is described in our guide to [business workflow automation](/insights/business-workflow-automation).',
        ],
      },
      {
        id: 'approvals',
        heading: 'Approval workflow automation',
        body: [
          'Purchase requests, permits, leave, expenses and document sign-offs are routed through defined approval levels. Each approver sees what is waiting for them, decisions are recorded with time and comments, and rejected items return to the requester with the reason. See a delivered example in the [work permit management system](/solutions/work-permit-management-system).',
        ],
      },
      {
        id: 'reporting',
        heading: 'Reporting automation',
        body: [
          'Reports that are assembled by hand every week or month are generated from source data on a schedule or on demand. This is how our [MIS](/solutions/management-information-system) produces meter-reading and operational reports directly from the sheets site teams already maintain.',
        ],
      },
      {
        id: 'sync',
        heading: 'Data synchronisation',
        body: [
          'When the same information lives in more than one place — a spreadsheet and an application, or two systems — synchronisation keeps them consistent automatically, removing re-typing and the errors it introduces.',
        ],
      },
      {
        id: 'notifications',
        heading: 'Notification automation',
        body: [
          'Status changes trigger the right alert to the right person: a new complaint notifies the help-desk, an approved permit notifies the requester, an overdue item escalates to a supervisor. Notifications can be sent by email or in-app, and other channels are scoped per project.',
        ],
      },
      {
        id: 'documents',
        heading: 'Document workflows',
        body: [
          'Forms, attachments and generated documents travel with the request they belong to, with versions and approvals kept together. Where documents arrive as unstructured text, [AI-assisted extraction](/agentic-ai-development) can prepare structured data for review.',
        ],
      },
      {
        id: 'operations',
        heading: 'Enterprise process automation for operations',
        cards: [
          { title: 'Site registers', text: 'Visitor, permit and complaint registers that update dashboards as entries are made.' },
          { title: 'Stores and purchasing', text: 'Low stock raising purchase requisitions automatically for approval.' },
          { title: 'Attendance and deployment', text: 'Site-wise attendance compiled into month-end reports.' },
          { title: 'Recurring tasks', text: 'Scheduled checks, reminders and follow-ups created without manual tracking.' },
        ],
      },
      {
        id: 'apis',
        heading: 'API integrations',
        body: [
          'Automation often depends on connecting systems. We build REST API integrations between your business application and tools such as Google Sheets, accounting software or reporting platforms, provided those systems offer suitable access.',
        ],
      },
      {
        id: 'ai-assisted',
        heading: 'AI workflow automation',
        body: [
          'Rule-based automation handles structured steps. Where a step involves reading emails or documents, an AI component can classify, extract or summarise the content and pass it into the workflow for a person to confirm. We explain the difference in [agentic AI development](/agentic-ai-development).',
        ],
      },
    ],
    stack: true,
    industries: ['facility-management', 'construction-mep', 'security-services', 'manufacturing', 'professional-services'],
    relatedSolutions: ['work-permit-management-system', 'complaint-management-system', 'procurement-management-system', 'management-information-system'],
    relatedServices: ['agentic-ai-development', 'custom-software-development', 'data-analytics'],
    relatedInsights: ['business-workflow-automation', 'work-permit-automation', 'ai-in-business-operations'],
    faqs: [
      { q: 'What is business process automation?', a: 'It is the use of software to carry out the predictable steps of a business process — routing approvals, sending notifications, updating records and producing reports — so people spend their time on decisions rather than on moving information around.' },
      { q: 'Which processes should we automate first?', a: 'Start with a process that is repeated often, follows clear rules, involves hand-offs between people and is already well understood — for example purchase approvals, permit approvals or a weekly report.' },
      { q: 'Do we need to replace our existing software?', a: 'Not necessarily. Automation can connect existing tools through APIs or work alongside spreadsheets your teams already use. We recommend replacing a tool only when it is the source of the problem.' },
      { q: 'Can automation include AI?', a: 'Yes, for steps involving unstructured text or documents. AI prepares the result and a person confirms it before it affects records, payments or customers.' },
      { q: 'How do we know automation is working?', a: 'Every automated step is logged, and dashboards show volumes, pending items and turnaround times, so you can see where work is flowing and where it is stuck.' },
    ],
    cta: { title: 'Which process slows your team down?', text: 'Describe it step by step — who does what, and where it waits. We will suggest what to automate first and what to leave with people.' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'saas-development',
    icon: AppWindow,
    navLabel: 'SaaS Development',
    seoTitle: 'SaaS Application Development Company',
    metaDescription:
      'SaaS application development: multi-user and multi-tenant platforms with role-based access, admin dashboards, subscriptions, integrations and hosting.',
    eyebrow: 'SaaS product development services',
    h1: ['SaaS Application', 'Development'],
    intro:
      'YP Nova is a SaaS development company offering SaaS application development, custom SaaS development and SaaS product development — multi-user SaaS applications and enterprise SaaS solutions with the user management, roles, administration and hosting a dependable product needs.',
    experience: {
      delivered: [
        'Multi-user operational systems with role-based use by site teams, supervisors and management (MIS, visitor, permit and complaint modules).',
      ],
      note: 'YP Nova does not currently offer a launched SaaS product of its own. SaaS architecture, subscriptions and multi-tenancy are offered as custom development for your product or internal platform.',
    },
    sections: [
      {
        id: 'architecture',
        heading: 'SaaS architecture',
        body: [
          'A SaaS application serves many users or organisations from one codebase. The key early decision is tenancy: whether each customer’s data is separated by account within a shared database, by schema, or by a separate database. The right choice depends on the number of customers, data-isolation requirements and budget, and is made during planning rather than after launch.',
          'We build on React for the front end and Node.js with Express for the back end, with MySQL or PostgreSQL (often through Prisma ORM) for data.',
        ],
      },
      {
        id: 'users',
        heading: 'User management',
        bullets: [
          'Sign-up, invitation and account management',
          'Password reset and secure session handling',
          'Organisation or team accounts with their own users',
          'Activity and audit logs for administrators',
        ],
      },
      {
        id: 'roles',
        heading: 'Role-based access',
        body: [
          'Permissions are defined by role — for example owner, administrator, manager and user — and can be scoped to an organisation, site or project. This keeps each user’s view focused and protects data between customers.',
        ],
      },
      {
        id: 'subscriptions',
        heading: 'Subscription management',
        body: [
          'Plans, limits and billing periods are modelled in the application, with features enabled per plan. Online payment collection is added through a payment gateway chosen for your market; gateway integration is scoped per project.',
        ],
      },
      {
        id: 'multi-user',
        heading: 'Multi-user SaaS applications',
        body: [
          'Many organisations do not need a public SaaS product — they need an internal platform that many sites or departments use at once. The same architecture applies, and it is how our [operations management case study](/case-studies/integrated-digital-operations) brings several modules into one environment.',
        ],
      },
      {
        id: 'admin',
        heading: 'Admin dashboards',
        body: [
          'Administrators manage customers, users, plans and settings from a dedicated console, with usage reports and operational dashboards. See [data analytics and MIS](/data-analytics) for reporting.',
        ],
      },
      {
        id: 'integrations',
        heading: 'Application integrations',
        body: [
          'SaaS products are expected to connect with other tools. We build REST APIs for your customers to use, webhooks for events, and integrations with services such as Google Sheets, email delivery and payment gateways.',
        ],
      },
      {
        id: 'deployment',
        heading: 'Deployment and maintenance',
        body: [
          'Applications are deployed with Docker and Nginx on a VPS, with database setup, backups and server configuration handled as part of the project. After launch we provide maintenance: updates, fixes, monitoring and new features.',
        ],
      },
      {
        id: 'process',
        heading: 'SaaS product development: from idea to launch',
        steps: [
          { title: 'Validate the idea', text: 'Define the first users, the problem they pay to solve and the smallest useful product.' },
          { title: 'Architecture', text: 'Decide tenancy, roles, data model and integrations.' },
          { title: 'Build the MVP', text: 'Develop core workflows, user management and administration.' },
          { title: 'Launch', text: 'Deploy, onboard the first customers and monitor usage.' },
          { title: 'Iterate', text: 'Add features and plans based on real usage.' },
        ],
      },
    ],
    stack: true,
    industries: ['startups-growing-businesses', 'professional-services', 'facility-management', 'education'],
    relatedSolutions: ['management-information-system', 'visitor-management-system'],
    relatedServices: ['custom-software-development', 'custom-erp-development', 'data-analytics'],
    relatedInsights: ['before-building-a-saas-product', 'custom-software-vs-saas', 'technology-for-growing-businesses'],
    faqs: [
      { q: 'What is SaaS application development?', a: 'It is building software that customers or teams use through a browser on a subscription or shared-platform basis, from one codebase that serves many users or organisations.' },
      { q: 'What is a multi-tenant SaaS application?', a: 'A multi-tenant application serves several customer organisations from the same system while keeping each organisation’s data separate. The method of separation is chosen during architecture planning.' },
      { q: 'Should we start with an MVP?', a: 'Usually, yes. A minimum viable product with the core workflow lets you test demand with real users before investing in a full feature set.' },
      { q: 'Can you add subscriptions and online payments?', a: 'Yes. Plans and limits are built into the application, and payment collection is integrated through a payment gateway suitable for your market, scoped per project.' },
      { q: 'Who hosts and maintains the SaaS application?', a: 'We can deploy to a VPS using Docker and Nginx and provide ongoing maintenance, or deploy to hosting you control. Responsibilities are agreed in the project scope.' },
    ],
    cta: { title: 'Building a SaaS product or platform?', text: 'Tell us who will use it and the problem it solves. We will help you define a realistic first release and estimate it.' },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'data-analytics',
    icon: BarChart3,
    navLabel: 'Data Analytics & MIS',
    seoTitle: 'MIS Software & Power BI Dashboard Development',
    metaDescription:
      'MIS software development, operational dashboards, Power BI reporting, Google Sheets API integration and automated KPI reporting for management teams.',
    eyebrow: 'Data analytics & business intelligence',
    h1: ['MIS Software & Power BI', 'Dashboard Development'],
    intro:
      'Our data analytics services cover MIS software development, Management Information System design, business intelligence dashboards, operational reporting software, Power BI dashboard development and business reporting automation — bringing scattered operational data into one consistent view.',
    experience: {
      delivered: [
        'A Management Information System that retrieves operational data through the Google Sheets API.',
        'Meter-reading reporting and dashboard functionality for a facility management and MEP operations client.',
      ],
      note: 'Power BI dashboards and other data sources are offered as custom development.',
    },
    sections: [
      {
        id: 'mis',
        heading: 'MIS dashboards',
        body: [
          'A Management Information System connects to where data is recorded and turns it into consistent reports and dashboards. Figures are calculated the same way every time, and managers can review them when they need to. Read [how MIS software improves operations](/insights/why-businesses-need-mis-dashboards).',
        ],
      },
      {
        id: 'data-collection',
        heading: 'Data collection and integration',
        body: [
          'Data rarely lives in one place. We connect spreadsheets, business applications and databases, standardise names, dates and categories, and build a reliable data model that reports can depend on.',
        ],
      },
      {
        id: 'google-sheets',
        heading: 'Google Sheets API integrations',
        body: [
          'Many teams already record operational data in Google Sheets. Through the Google Sheets API, an MIS can read that data directly — site teams keep the entry method they know, and management gets dashboards without anyone copying data. This is the approach used in our [delivered MIS project](/case-studies/integrated-digital-operations).',
        ],
      },
      {
        id: 'power-bi',
        heading: 'Power BI dashboard development',
        body: [
          'For interactive analysis, we build Power BI reports on prepared data: agreed KPI definitions, clean data models and visuals designed for the people who read them. Practical guidance is in [Power BI dashboards for operational reporting](/insights/power-bi-business-reporting).',
        ],
      },
      {
        id: 'operational',
        heading: 'Operational reporting software',
        cards: [
          { title: 'Meter readings and consumption', text: 'Utility readings by site, period and meter, with trends.' },
          { title: 'Complaints and service levels', text: 'Open, closed and repeat issues by category, site and team.' },
          { title: 'Visitors and access', text: 'Visit volumes and history by site and host.' },
          { title: 'Stock and purchasing', text: 'Balances, consumption and pending orders.' },
        ],
      },
      {
        id: 'kpi',
        heading: 'KPI reporting',
        body: [
          'A useful KPI dashboard answers a small number of agreed questions. We begin with the figures already discussed in management meetings, define each precisely and agree the source, so the dashboard matches the numbers people trust.',
        ],
      },
      {
        id: 'management',
        heading: 'Business intelligence dashboards for management',
        body: [
          'Leadership dashboards summarise operations across sites or departments, with drill-down to detail and role-based views so each manager sees their own area.',
        ],
      },
      {
        id: 'automated',
        heading: 'Business reporting automation',
        body: [
          'Routine reports are generated from source data on demand or on a schedule, replacing hours of manual consolidation — part of our wider [business process automation](/business-process-automation) work.',
        ],
      },
    ],
    stack: true,
    industries: ['facility-management', 'construction-mep', 'manufacturing', 'retail', 'logistics'],
    relatedSolutions: ['management-information-system', 'complaint-management-system', 'inventory-management-system'],
    relatedServices: ['business-process-automation', 'custom-erp-development', 'custom-software-development'],
    relatedInsights: ['why-businesses-need-mis-dashboards', 'power-bi-business-reporting', 'how-custom-software-connects-departments'],
    faqs: [
      { q: 'What is MIS software?', a: 'MIS (Management Information System) software collects data from the places it is recorded and presents it as consistent reports and dashboards for managers, removing manual report preparation.' },
      { q: 'Can an MIS use data from Google Sheets?', a: 'Yes. Using the Google Sheets API, an MIS can read data directly from the sheets teams already maintain. Our delivered MIS works this way.' },
      { q: 'Do you build Power BI dashboards?', a: 'Yes. We prepare the data, agree KPI definitions and build Power BI reports designed for the people who will use them.' },
      { q: 'Should we use a custom dashboard or Power BI?', a: 'Custom dashboards suit fixed operational views inside your application; Power BI suits interactive analysis across many sources. Many organisations use both, and we recommend based on your users and data.' },
      { q: 'How often can dashboards update?', a: 'It depends on the source. Dashboards reading live application data update as records change; scheduled sources refresh on an agreed interval.' },
    ],
    cta: { title: 'Want reports without the manual work?', text: 'Tell us which reports take the most time to prepare and where the data comes from. We will suggest how to automate them.' },
  },
];

export const getServicePage = (slug) => servicePages.find((p) => p.slug === slug);
export const servicePath = (slug) => `/${slug}`;
