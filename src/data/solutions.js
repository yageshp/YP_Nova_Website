import {
  UserCheck, LayoutDashboard, MessageSquareWarning, FileCheck2, Building2,
  Boxes, Users, ShoppingCart, PieChart, Blocks,
} from 'lucide-react';

/**
 * status:
 *  - 'delivered'  → YP Nova has built this type of system in a real project (see the featured case study).
 *  - 'custom'     → offered as custom development; scoped and built to the client's requirements.
 * `delivered` lists only what is known to have been implemented. `modules` are typical modules that
 * are confirmed per project. `enhancements` are optional and not implied to exist already.
 */
export const STATUS = {
  delivered: { label: 'Project experience', tone: 'green', note: 'Built by YP Nova in a client project.' },
  custom: { label: 'Custom development', tone: 'outline', note: 'Designed and built to your requirements.' },
};

export const solutions = [
  {
    slug: 'visitor-management-system',
    icon: UserCheck,
    status: 'delivered',
    title: 'Visitor Management System',
    summary: 'A digital record of who is entering your premises, who they are meeting and when they leave.',
    problem:
      'Paper registers at the gate are slow to fill in, hard to read later and almost impossible to search or report on when someone asks who visited a site.',
    solution:
      'A web-based visitor system where entries are recorded digitally, hosts are identified, and visit history is searchable by date, person or location.',
    delivered: ['A Visitor Management System deployed on a VPS for a facility management and MEP operations client.'],
    modules: ['Visitor registration', 'Host and purpose-of-visit capture', 'Check-in and check-out log', 'Visit history and search', 'Reports'],
    workflow: ['Visitor arrives and details are recorded', 'Host and purpose are confirmed', 'Entry is logged with time', 'Exit is recorded', 'Records are available for review and reporting'],
    roles: ['Security / reception staff', 'Hosts and employees', 'Site administrators', 'Management'],
    benefits: ['Legible, searchable visitor records', 'Clear accountability at entry points', 'Less time spent on manual registers'],
    enhancements: ['Pre-registration by hosts', 'Visitor passes or badges', 'Host notifications'],
    industries: ['Facility Management', 'Security Services', 'Construction & MEP', 'Manufacturing'],
  },
  {
    slug: 'management-information-system',
    icon: LayoutDashboard,
    status: 'delivered',
    title: 'Management Information System',
    summary: 'Operational data collected from where your teams already record it and presented as dashboards and reports.',
    problem:
      'Operational figures live in separate spreadsheets maintained by different people, so preparing a management report means copying, merging and re-checking data every time.',
    solution:
      'An MIS that reads data from its source — including Google Sheets — and turns it into consistent dashboards and reports without manual consolidation.',
    delivered: [
      'An MIS that retrieves operational data through the Google Sheets API.',
      'Meter-reading reporting and dashboard functionality.',
    ],
    modules: ['Data connection (e.g. Google Sheets API)', 'Dashboards', 'Meter-reading and operational reports', 'Filters by period, site or category', 'Report export'],
    workflow: ['Teams record data in their existing sheets or forms', 'The MIS retrieves the data', 'Figures are organised into reports', 'Dashboards show the current position', 'Managers review and act'],
    roles: ['Data-entry / site teams', 'Supervisors', 'Management'],
    benefits: ['One consistent view of operations', 'Less manual report preparation', 'Teams keep the data-entry method they already know'],
    enhancements: ['Power BI dashboards', 'Scheduled email reports', 'Additional data sources'],
    industries: ['Facility Management', 'Construction & MEP', 'Manufacturing', 'Professional Services'],
  },
  {
    slug: 'complaint-management-system',
    icon: MessageSquareWarning,
    status: 'delivered',
    title: 'Complaint Management System',
    summary: 'Complaints and service requests logged in one place, assigned to someone and tracked until they are closed.',
    problem:
      'Complaints arrive by phone, message and word of mouth. Without a single log, issues are forgotten, duplicated or closed without anyone confirming the work was done.',
    solution:
      'A structured complaint register with categories, assignment and status tracking so every issue has an owner and a visible outcome.',
    delivered: ['Complaint management functionality integrated into the client’s MIS / VMS environment.'],
    modules: ['Complaint registration', 'Categories and priority', 'Assignment', 'Status tracking', 'Closure and history'],
    workflow: ['Complaint is logged', 'It is categorised and assigned', 'The assignee works on it and updates status', 'Complaint is closed', 'History remains available for review'],
    roles: ['Complainants / occupants', 'Help-desk staff', 'Technicians or service teams', 'Supervisors'],
    benefits: ['Nothing depends on memory or chat threads', 'Clear ownership of each issue', 'Visibility of open and repeated problems'],
    enhancements: ['Escalation rules', 'Notifications on status change', 'Feedback after closure'],
    industries: ['Facility Management', 'Real Estate', 'Hospitality', 'Education'],
  },
  {
    slug: 'work-permit-management-system',
    icon: FileCheck2,
    status: 'delivered',
    title: 'Work Permit Management System',
    summary: 'Permit requests, approvals and closures handled digitally instead of on paper forms.',
    problem:
      'Paper permits travel between desks for signatures, get misplaced, and leave no easy way to see which jobs are approved, in progress or closed on a given day.',
    solution:
      'A permit workflow where requests are raised, reviewed and approved in the system, with a record of who authorised what and when.',
    delivered: ['A Work Permit System deployed within the client’s VMS environment.'],
    modules: ['Permit request', 'Review and approval', 'Permit status', 'Closure', 'Permit register and history'],
    workflow: ['Requester raises a permit', 'Authorised person reviews it', 'Permit is approved or returned', 'Work is carried out', 'Permit is closed and archived'],
    roles: ['Contractors / requesters', 'Site engineers', 'Safety or approving officers', 'Administrators'],
    benefits: ['A clear approval trail', 'Current view of active permits', 'Less paperwork to store and retrieve'],
    enhancements: ['Permit-type specific checklists', 'Expiry reminders', 'Document attachments'],
    industries: ['Construction & MEP', 'Facility Management', 'Manufacturing'],
  },
  {
    slug: 'facility-management-solutions',
    icon: Building2,
    status: 'custom',
    title: 'Facility Management Solutions',
    summary: 'Visitor, permit, complaint and reporting modules brought together for site and building operations.',
    problem:
      'Facility teams juggle separate registers and sheets for visitors, permits, complaints and readings, with no joined-up picture of what is happening on site.',
    solution:
      'A connected set of modules — drawing on our VMS, permit, complaint and MIS experience — configured to the sites, teams and reports you need.',
    modules: ['Visitor management', 'Work permits', 'Complaint / help-desk', 'Meter readings and logs', 'MIS dashboards'],
    workflow: ['Agree which modules each site needs', 'Configure users, sites and categories', 'Teams record daily activity', 'Supervisors track open items', 'Management reviews dashboards'],
    roles: ['Site teams', 'Help-desk', 'Facility managers', 'Client representatives'],
    benefits: ['Daily operations recorded in one environment', 'Consistent reporting across sites', 'Modules added in phases as needs grow'],
    enhancements: ['Asset and maintenance schedules', 'Checklists and inspections', 'Vendor records'],
    industries: ['Facility Management', 'Real Estate', 'Hospitality'],
  },
  {
    slug: 'inventory-management-system',
    icon: Boxes,
    status: 'custom',
    title: 'Inventory Management System',
    summary: 'Stock, issues and receipts tracked by item and location so you know what you have and where it is.',
    problem:
      'Stock is tracked in spreadsheets that fall out of date, leading to shortages on site, duplicate purchases and time lost counting.',
    solution:
      'A custom inventory application with item masters, stock movements and location-wise balances, shaped to your stores and issue process.',
    modules: ['Item master', 'Receipts and issues', 'Location-wise stock', 'Minimum-level alerts', 'Stock reports'],
    workflow: ['Material is received and recorded', 'Stock is issued against a request', 'Balances update automatically', 'Low stock is flagged', 'Reports support purchasing decisions'],
    roles: ['Storekeepers', 'Requesters / site teams', 'Purchase team', 'Management'],
    benefits: ['Current stock position at any time', 'Traceable issues and receipts', 'Better-informed purchasing'],
    enhancements: ['Barcode or QR labels', 'Link to purchase orders', 'Consumption analysis'],
    industries: ['Manufacturing', 'Construction & MEP', 'Retail', 'Logistics'],
  },
  {
    slug: 'hr-workforce-management',
    icon: Users,
    status: 'custom',
    title: 'HR & Workforce Management',
    summary: 'Employee records, deployment, attendance and leave managed in one system for distributed teams.',
    problem:
      'When staff are deployed across many sites, attendance and deployment are tracked on paper and phone calls, and HR spends days compiling the month.',
    solution:
      'A workforce application built around your structure — employee records, site deployment, attendance and leave — with reports that feed your payroll process.',
    modules: ['Employee records', 'Site deployment / rostering', 'Attendance', 'Leave requests', 'HR reports'],
    workflow: ['Employee is onboarded', 'They are assigned to a site or shift', 'Attendance is recorded', 'Leave is requested and approved', 'Month-end reports are generated'],
    roles: ['Employees', 'Supervisors', 'HR team', 'Management'],
    benefits: ['One reliable source of employee data', 'Faster month-end compilation', 'Visibility of deployment across sites'],
    enhancements: ['Document expiry reminders', 'Payroll export formats', 'Mobile-friendly attendance'],
    industries: ['Security Services', 'Facility Management', 'Manufacturing', 'Hospitality'],
  },
  {
    slug: 'procurement-management-system',
    icon: ShoppingCart,
    status: 'custom',
    title: 'Procurement Management System',
    summary: 'Purchase requests, approvals and purchase orders moved through a defined, trackable process.',
    problem:
      'Purchase requests are raised over email and chat, approvals are hard to trace, and nobody is sure which orders are pending, placed or received.',
    solution:
      'A procurement workflow from requisition to purchase order, with approval levels that mirror your organisation and a register of every order.',
    modules: ['Purchase requisition', 'Approval levels', 'Vendor records', 'Purchase orders', 'Order status and register'],
    workflow: ['Requirement is raised', 'It is approved at the right level', 'A vendor is selected', 'Purchase order is issued', 'Receipt is recorded against the order'],
    roles: ['Requesters', 'Approvers', 'Purchase team', 'Accounts'],
    benefits: ['Traceable approvals', 'Clear view of pending orders', 'Consistent purchase documentation'],
    enhancements: ['Quotation comparison', 'Link to inventory receipts', 'Spend reports'],
    industries: ['Construction & MEP', 'Manufacturing', 'Facility Management'],
  },
  {
    slug: 'business-intelligence-dashboards',
    icon: PieChart,
    status: 'custom',
    title: 'Business Intelligence Dashboards',
    summary: 'KPI dashboards built on your existing data using custom dashboards or Power BI.',
    problem:
      'Leadership wants a clear view of performance, but the numbers sit in different files and systems and reach them late.',
    solution:
      'Dashboards that connect to your data sources and present agreed KPIs clearly — drawing on our MIS dashboard experience and Power BI.',
    modules: ['Data source connections', 'KPI definitions', 'Interactive dashboards', 'Drill-down views', 'Scheduled refresh'],
    workflow: ['Agree the questions the dashboard must answer', 'Connect and tidy the data', 'Design the dashboard', 'Review with users', 'Refine and hand over'],
    roles: ['Analysts / data owners', 'Department heads', 'Leadership'],
    benefits: ['Agreed numbers in one place', 'Faster, better-informed reviews', 'Less manual report building'],
    enhancements: ['Additional data sources', 'Role-based views', 'Email report snapshots'],
    industries: ['Professional Services', 'Retail', 'Manufacturing', 'Logistics'],
  },
  {
    slug: 'custom-erp-business-applications',
    icon: Blocks,
    status: 'custom',
    title: 'Custom ERP & Business Applications',
    summary: 'A modular business system built in phases around the departments and processes that matter most to you.',
    problem:
      'Off-the-shelf ERP products are either too rigid or too large, and the gaps are filled with spreadsheets that nobody fully trusts.',
    solution:
      'We build the modules you need, in the order you need them, on one database — so the system grows with the business instead of dictating how it works.',
    modules: ['Core masters and users', 'Operations modules', 'Approvals and workflows', 'Reports and dashboards', 'Integrations'],
    workflow: ['Map current processes', 'Prioritise modules', 'Build and release phase one', 'Train users and gather feedback', 'Add further modules'],
    roles: ['Department users', 'Managers and approvers', 'Administrators', 'Leadership'],
    benefits: ['Software that fits your process', 'Investment spread across phases', 'One connected source of data'],
    enhancements: ['Third-party integrations', 'AI-assisted features', 'Customer or vendor portals'],
    industries: ['Startups & Growing Businesses', 'Manufacturing', 'Professional Services', 'Logistics'],
  },
];

/** Shorter list for the home page "Featured solutions" grid. */
export const homeSolutionSlugs = [
  'visitor-management-system',
  'management-information-system',
  'complaint-management-system',
  'work-permit-management-system',
  'inventory-management-system',
  'hr-workforce-management',
  'procurement-management-system',
  'business-intelligence-dashboards',
  'custom-erp-business-applications',
];

/**
 * Extra content for the dedicated solution pages (/solutions/:slug).
 * Only solutions listed here get their own URL; the rest stay as sections on /solutions.
 */
export const solutionPages = {
  'visitor-management-system': {
    seoTitle: 'Visitor Management System Software',
    metaDescription:
      'Visitor management software that replaces paper gate registers with searchable digital visitor records, host details, check-in/check-out logs and reports.',
    overview:
      'A visitor management system (VMS) records who enters your premises, whom they are visiting, why, and when they arrive and leave — in a digital register that can be searched and reported on. YP Nova has delivered a VMS deployed on a VPS for a facility management and MEP operations client.',
    useCases: [
      { industry: 'facility-management', text: 'Gate and reception entries across managed buildings, with history available to the facility manager and client.' },
      { industry: 'security-services', text: 'Guards record entries consistently at every post, giving the client a reliable visitor record.' },
      { industry: 'construction-mep', text: 'Visitors, vendors and inspectors on project sites logged with purpose and host.' },
      { industry: 'manufacturing', text: 'Controlled-area entry for visitors and contract staff at plants.' },
    ],
    integrations: ['Work permit module for contractor entries', 'Complaint / help-desk module in the same environment', 'MIS dashboards for visit volumes', 'Host notifications by email (optional)'],
    faqs: [
      { q: 'What is a visitor management system?', a: 'It is software that replaces the paper visitor register: entries are captured digitally with visitor, host, purpose and time, and the history can be searched and reported on.' },
      { q: 'Can it work across multiple sites?', a: 'Yes. Entries are recorded per site, and supervisors or management can view and search history across all sites according to their role.' },
      { q: 'Does the visitor system need special hardware?', a: 'No. It runs in a web browser on a desktop, tablet or phone at the gate. Optional additions such as badge printing are scoped per project.' },
      { q: 'Where is the data hosted?', a: 'Our delivered VMS runs on a VPS. Hosting is agreed with you before deployment, including access and retention.' },
    ],
  },
  'management-information-system': {
    seoTitle: 'Management Information System (MIS) Software',
    metaDescription:
      'MIS development: dashboards and reports built from your operational data, including Google Sheets API integration and meter-reading reporting.',
    overview:
      'A Management Information System gathers operational data from where it is recorded and presents it as consistent dashboards and reports. YP Nova delivered an MIS that retrieves data through the Google Sheets API, with meter-reading reporting and dashboards — so site teams kept their existing sheets while management gained a consolidated view.',
    useCases: [
      { industry: 'facility-management', text: 'Meter readings, complaints and site activity consolidated into client and management reports.' },
      { industry: 'construction-mep', text: 'Daily logs and readings from multiple work fronts reported without re-typing.' },
      { industry: 'manufacturing', text: 'Production, stores and purchase figures in one management view.' },
      { industry: 'professional-services', text: 'Engagement status and workload across teams.' },
    ],
    integrations: ['Google Sheets API (delivered)', 'Business application databases', 'Power BI for interactive analysis', 'Scheduled email reports (optional)'],
    faqs: [
      { q: 'What does an MIS do?', a: 'It turns operational data into consistent reports and dashboards for managers, without manual consolidation each time a report is needed.' },
      { q: 'Do our teams have to stop using spreadsheets?', a: 'No. Our delivered MIS reads Google Sheets through the Google Sheets API, so teams keep their entry method while reports are produced automatically.' },
      { q: 'Can the MIS include meter-reading reports?', a: 'Yes. Meter-reading reporting was part of our delivered MIS, alongside dashboard functionality.' },
      { q: 'Can MIS data be used in Power BI?', a: 'Yes. Prepared MIS data can feed Power BI reports for deeper analysis; this is scoped as custom development.' },
    ],
  },
  'work-permit-management-system': {
    seoTitle: 'Work Permit Management System Software',
    metaDescription:
      'Digital work permit management software: permit requests, multi-level review and approval, active permit tracking, closure and a searchable permit register.',
    overview:
      'A work permit management system moves permit-to-work requests, approvals and closures from paper forms into a tracked digital process. YP Nova delivered a Work Permit System deployed within a client’s visitor management environment, so contractor entries and permits are handled in one place.',
    useCases: [
      { industry: 'construction-mep', text: 'Hot work, electrical and height work permits raised by contractors and approved by site engineers and safety officers.' },
      { industry: 'facility-management', text: 'Maintenance work in occupied buildings authorised and tracked.' },
      { industry: 'manufacturing', text: 'Maintenance and shutdown work in plant areas authorised before it starts.' },
    ],
    integrations: ['Visitor management for contractor entries (delivered environment)', 'Complaint module where work arises from a reported fault', 'MIS dashboards for active and closed permits', 'Document attachments (optional)'],
    faqs: [
      { q: 'What is a work permit management system?', a: 'It is software for raising, reviewing, approving and closing permits to work, keeping a record of who authorised each job and when.' },
      { q: 'Can approval levels follow our safety procedure?', a: 'Yes. Permit types, required information and approval sequence are configured to your existing procedure; digitising should not weaken the checks your safety team relies on.' },
      { q: 'Can we see which permits are active today?', a: 'Yes. The permit register shows status in real time — requested, approved, active, closed — by site and permit type.' },
      { q: 'Does it work with the visitor system?', a: 'Our delivered Work Permit System runs in the same environment as the Visitor Management System.' },
    ],
  },
  'complaint-management-system': {
    seoTitle: 'Complaint Management System Software',
    metaDescription:
      'Complaint management software: log every complaint, assign it, track status to closure and report on open and repeat issues by site and category.',
    overview:
      'A complaint management system gives every complaint or service request an owner, a status and a visible outcome. YP Nova delivered complaint management functionality integrated into a client’s MIS / VMS environment, so complaints sit alongside visitor, permit and reporting data.',
    useCases: [
      { industry: 'facility-management', text: 'Occupant complaints logged by the help-desk and assigned to technicians.' },
      { industry: 'real-estate', text: 'Post-handover occupant requests tracked across buildings.' },
      { industry: 'hospitality', text: 'Guest-room faults passed between shifts without being lost.' },
      { industry: 'retail', text: 'Store maintenance issues raised by outlets and resolved centrally.' },
    ],
    integrations: ['MIS / VMS environment (delivered)', 'Work permits for repair jobs', 'Email notifications on status change (optional)', 'Power BI service-level reporting (optional)'],
    faqs: [
      { q: 'What is a complaint management system?', a: 'It is a single register where complaints are logged, categorised, assigned and tracked to closure, with history available for review.' },
      { q: 'Can complaints be assigned to different teams?', a: 'Yes. Categories and assignment rules route each complaint to the right team or person.' },
      { q: 'Can we report on repeat issues?', a: 'Yes. Reports show open, closed and repeated complaints by category, site and period.' },
      { q: 'Is it integrated with other modules?', a: 'Our delivered complaint management is integrated into the client’s MIS / VMS environment.' },
    ],
  },
  'inventory-management-system': {
    seoTitle: 'Inventory Management System Development',
    metaDescription:
      'Custom inventory management software: item masters, receipts, issues, transfers, location-wise stock, minimum-level alerts and stock reports linked to purchasing.',
    overview:
      'A custom inventory management system records every stock movement — receipts, issues and transfers — so balances by item and location are always current. It is offered as custom development and is commonly the first module of a [custom ERP](/custom-erp-development).',
    useCases: [
      { industry: 'manufacturing', text: 'Raw material and spares stores with issues against production or maintenance requests.' },
      { industry: 'construction-mep', text: 'Site stores with material issued against work fronts.' },
      { industry: 'retail', text: 'Warehouse-to-outlet transfers and outlet stock levels.' },
      { industry: 'logistics', text: 'Warehouse stock linked to inbound and outbound consignments.' },
    ],
    integrations: ['Procurement module (purchase orders and receipts)', 'Accounting software via export or API', 'Barcode / QR labels (optional)', 'Power BI consumption analysis'],
    faqs: [
      { q: 'What does an inventory management system track?', a: 'Item details, stock received, issued and transferred, current balances by location, and items below their minimum level.' },
      { q: 'Can it handle multiple stores or warehouses?', a: 'Yes. Stock is held per location, with transfers between locations recorded.' },
      { q: 'Can it link to purchasing?', a: 'Yes. Low stock can raise purchase requisitions and goods are received against purchase orders when combined with the procurement module.' },
      { q: 'Has YP Nova delivered an inventory system?', a: 'Inventory management is offered as custom development; it is not part of our published project work.' },
    ],
  },
  'procurement-management-system': {
    seoTitle: 'Procurement Management System | Purchase Order Software',
    metaDescription:
      'Procurement and purchase order management software: requisitions, multi-level approvals, vendor records, purchase orders, receipts and a register of open orders.',
    overview:
      'A procurement management system moves purchasing from email and chat into a defined process: requisition, approval at the right level, purchase order, and receipt against the order. It is offered as custom development and pairs naturally with [inventory management](/solutions/inventory-management-system).',
    useCases: [
      { industry: 'construction-mep', text: 'Site requisitions approved by project managers before orders are placed.' },
      { industry: 'manufacturing', text: 'Material and spares purchasing with approval limits by value.' },
      { industry: 'facility-management', text: 'Consumables and repair parts purchased for client sites.' },
    ],
    integrations: ['Inventory module for receipts', 'Accounting software via export or API', 'Email approvals and notifications', 'Spend dashboards'],
    faqs: [
      { q: 'What is a procurement management system?', a: 'Software that manages purchasing from requisition through approval, purchase order and receipt, with a record of every decision.' },
      { q: 'Can approvals depend on order value?', a: 'Yes. Approval levels can be set by value, department, site or category to mirror your delegation of authority.' },
      { q: 'Can we compare vendor quotations?', a: 'Quotation comparison can be added as an optional enhancement during custom development.' },
      { q: 'Has YP Nova delivered a procurement system?', a: 'Procurement management is offered as custom development; it is not part of our published project work.' },
    ],
  },
};
