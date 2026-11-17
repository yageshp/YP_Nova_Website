/**
 * Case studies.
 *
 * `featuredProject` is the one real engagement. It contains only facts supplied by the company —
 * no dates, user counts, percentages, savings or ratings. The client's name is shown only when
 * company.clientReferences.reliableGroup.approvedToPublish is true (see src/config/company.js).
 *
 * `concepts` are solution demonstrations. They are NOT client work and are labelled as such
 * everywhere they appear.
 */
export const CONCEPT_LABEL = 'Illustrative Solution Concept — Not a Published Client Case Study.';

export const featuredProject = {
  slug: 'integrated-digital-operations',
  category: 'Facility Management / MEP Operations',
  title: 'Integrated Digital Operations Management System',
  shortTitle: 'Integrated Digital Operations Management',
  subtitle: 'A connected operational software environment for facility and MEP workflows.',
  summary:
    'Four connected systems — MIS, visitor management, work permits and complaint management — that moved day-to-day site operations from registers and scattered sheets into one digital environment.',
  overview:
    'YP Nova designed and delivered a set of connected web applications for a facility management and MEP operations client: a Management Information System, a Visitor Management System, a Work Permit Management System and a Complaint Management System. Together they give site teams, security, contractors, the help-desk and management one environment for records that were previously kept on paper and in separate spreadsheets.',
  context:
    'Facility and MEP operations produce a steady flow of operational records every day: visitors arriving at the gate, contractors needing authorisation for work, occupants reporting faults, and utility meter readings that management needs to review. Each of these was handled separately, which made it slow to answer simple questions about what happened on a given day.',
  challenges: [
    'Visitor entries kept in paper registers that were hard to search later',
    'Permit requests and approvals moving on paper, with no easy view of what was approved or active',
    'Complaints received by phone and message, without a single register or clear ownership',
    'Meter readings recorded in spreadsheets and consolidated by hand for management reports',
    'Different people needing different levels of access to the same information',
  ],
  modules: [
    {
      key: 'mis',
      name: 'Management Information System',
      purpose: 'Gives management a consolidated view of operational data without manual report preparation.',
      facts: [
        'Operational reporting and dashboard / management reporting',
        'Meter-reading information',
        'Reads operational data through the Google Sheets API',
        'Role-based access',
        'Billing functionality was removed from the current MIS scope',
      ],
      flow: ['Site teams update their sheets', 'MIS retrieves the data', 'Reports and dashboards refresh', 'Management reviews'],
    },
    {
      key: 'vms',
      name: 'Visitor Management System',
      purpose: 'Replaces the gate register with a digital, searchable record of visitor entries.',
      facts: ['Visitor registration and management', 'Visitor records', 'Web-based application', 'Deployed on a VPS'],
      flow: ['Visitor arrives', 'Details are recorded', 'Entry is logged', 'Records are available for review'],
    },
    {
      key: 'permit',
      name: 'Work Permit Management System',
      purpose: 'Moves permit requests and approvals for site work into a tracked digital process.',
      facts: ['Digital permit management', 'Request and approval workflow', 'Deployed within the VMS environment'],
      flow: ['Permit is requested', 'It is reviewed', 'It is approved', 'Work is completed and the permit closed'],
    },
    {
      key: 'complaints',
      name: 'Complaint Management System',
      purpose: 'Keeps complaints and service requests in one register so each has an owner and an outcome.',
      facts: ['Complaint management', 'Assignment and tracking', 'Integration with the MIS / VMS environment', 'Role-based access'],
      flow: ['Complaint is logged', 'It is assigned', 'Status is updated', 'Complaint is closed'],
    },
  ],
  /** Technologies confirmed for the project as a whole (not necessarily every module). */
  stack: ['React', 'Node.js', 'Express.js', 'MySQL', 'Prisma ORM', 'Google Sheets API', 'VPS deployment'],
  integrations: [
    { title: 'Google Sheets → MIS', text: 'The MIS reads operational data, including meter readings, from the client’s Google Sheets through the Google Sheets API.' },
    { title: 'VMS + Work Permits', text: 'The Work Permit System is deployed within the same VPS-hosted environment as the Visitor Management System.' },
    { title: 'Complaints ↔ MIS / VMS', text: 'Complaint management is integrated into the MIS / VMS environment rather than running as a separate tool.' },
    { title: 'Role-based access', text: 'Users see the information and actions their role allows, in both the MIS and complaint management.' },
  ],
  outcomes: [
    'Structured operational records instead of paper registers and scattered files',
    'Improved visibility of operational information for management',
    'Digitalised request and approval workflows for site work',
    'Centralised access to selected operational information, by role',
    'More organised complaint tracking, with ownership and status for each complaint',
  ],
  disclosure:
    'Project information is presented in anonymised form. Screenshots and illustrative interface elements may use sample data. Actual project scope and functionality are subject to client confidentiality and approval.',
};

export const concepts = [
  {
    id: 'concept-facility-visitor',
    industry: 'Facility Management',
    visual: 'visitors',
    title: 'Multi-site visitor management',
    scenario: 'A facilities operator wants one visitor record across several buildings instead of a paper register at each gate.',
    approach: 'A web-based visitor system with site-wise entry screens, host lookup and a central visit history that supervisors can search and export.',
    value: 'Consistent visitor records across sites and faster answers when an entry needs to be checked.',
    modules: ['Visitor entry', 'Site master', 'Visit history', 'Reports'],
  },
  {
    id: 'concept-manufacturing-mis',
    industry: 'Manufacturing',
    visual: 'kpi',
    title: 'Plant MIS and KPI dashboard',
    scenario: 'A manufacturer’s leadership reviews performance from spreadsheets prepared separately by production, stores and purchase.',
    approach: 'An MIS that pulls the departmental sheets together and presents agreed KPIs on dashboards, with Power BI for deeper analysis.',
    value: 'One set of numbers for reviews, and less time spent preparing them.',
    modules: ['Data connections', 'Department reports', 'KPI dashboard', 'Power BI'],
  },
  {
    id: 'concept-construction-permit',
    industry: 'Construction & MEP',
    visual: 'permits',
    title: 'Digital work permit workflow',
    scenario: 'A contractor needs to see, at any moment, which jobs on site are authorised and who approved them.',
    approach: 'Permit requests raised by contractors, reviewed by site engineers and safety officers in sequence, with an active-permit board for the site office.',
    value: 'A documented approval trail and a live view of authorised work.',
    modules: ['Permit request', 'Approval levels', 'Active permit board', 'Permit register'],
  },
  {
    id: 'concept-retail-complaints',
    industry: 'Retail',
    visual: 'tickets',
    title: 'Store issue and complaint tracking',
    scenario: 'A retail chain receives maintenance and customer issues from many outlets by phone and message.',
    approach: 'A single complaint log where each outlet raises issues by category, the central team assigns them, and status is visible to everyone involved.',
    value: 'Clear ownership of every issue and visibility of repeat problems by outlet.',
    modules: ['Issue logging', 'Assignment', 'Status tracking', 'Outlet reports'],
  },
  {
    id: 'concept-realestate-facility',
    industry: 'Real Estate',
    visual: 'facility',
    title: 'Property operations portal',
    scenario: 'A property manager wants occupant requests, visitor entry and common-area maintenance handled in one system.',
    approach: 'A portal combining an occupant help-desk, gate visitor entry and maintenance tracking, with summary reports for owners.',
    value: 'Organised handling of occupant requests and a documented record of site activity.',
    modules: ['Occupant help-desk', 'Visitor entry', 'Maintenance tracking', 'Owner reports'],
  },
  {
    id: 'concept-healthcare-automation',
    industry: 'Healthcare',
    visual: 'automation',
    title: 'Administrative workflow automation',
    scenario: 'A healthcare provider’s back-office team re-types information from forms and emails into several systems.',
    approach: 'Document processing to extract form data for staff to verify, with approval steps and automatic updates to the relevant records.',
    value: 'Less repetitive data entry, with people reviewing and approving rather than typing.',
    modules: ['Document intake', 'AI-assisted extraction', 'Review and approval', 'Record updates'],
  },
];

export const caseFilters = ['All', 'Client project', 'Solution concepts'];
