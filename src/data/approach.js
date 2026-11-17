import { Search, PencilRuler, Code2, ClipboardCheck, Rocket, LifeBuoy } from 'lucide-react';

/** "How We Approach Every Project" — company-authored description of our delivery process (not testimonials). */
export const approachSteps = [
  { icon: Search, title: 'Requirement understanding', text: 'We learn how the work is done today — the people involved, the records kept and where time or information is lost — before proposing anything.' },
  { icon: PencilRuler, title: 'Solution planning', text: 'Modules, user roles, data structure, integrations and phases are agreed and written down, so scope and priorities are clear to everyone.' },
  { icon: Code2, title: 'Design and development', text: 'Screens are designed around the real workflow and built in stages. You review working software regularly rather than waiting for the end.' },
  { icon: ClipboardCheck, title: 'Testing', text: 'Each module is tested against real scenarios and edge cases with your team before it is released for daily use.' },
  { icon: Rocket, title: 'Deployment', text: 'The application is deployed to the agreed hosting — for example a VPS — with users, roles and access configured and initial training given.' },
  { icon: LifeBuoy, title: 'Support and improvements', text: 'After go-live we fix issues, keep the system maintained and add improvements that real use reveals, as agreed with you.' },
];
