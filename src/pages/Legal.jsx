import React from 'react';
import { Link } from 'react-router-dom';
import { FileWarning } from 'lucide-react';
import { PageHeader, container } from '@/components/common/PageShell';
import { company } from '@/config/company';
import { seo } from '@/config/seo';
import { useSeo } from '@/hooks/useSeo';

/**
 * Privacy Policy and Terms of Service.
 * Content reflects how ypnova.com actually works (checked 17 Nov 2026).
 * Approved by the company's legal adviser on 17 Nov 2026 → no draft notice, indexable, in the sitemap.
 * If the content is materially rewritten, set LEGAL_REVIEWED to false again until re-approved.
 */
const LEGAL_REVIEWED = true;
const LAST_UPDATED = '17 November 2026';

const Email = () => <a href={company.email.href} className="font-semibold text-brand underline underline-offset-4">{company.email.address}</a>;
const Tel = () => <a href={company.phone.href} className="font-semibold text-brand underline underline-offset-4">{company.phone.display}</a>;
const Site = () => <a href={`${seo.siteUrl}/`} className="font-semibold text-brand underline underline-offset-4">ypnova.com</a>;

function LegalLayout({ testId, title, intro, sections }) {
  return (
    <div data-testid={testId}>
      <PageHeader eyebrow="Legal" title={title} subtitle={intro}>
        <p className="text-sm text-muted">Last updated: {LAST_UPDATED}</p>
      </PageHeader>
      <div className={`${container} py-12 md:py-16`}>
        <div className="max-w-[760px] mx-auto">
          {!LEGAL_REVIEWED && (
            <div role="note" data-testid="legal-review-notice" className="flex items-start gap-3 rounded-2xl border border-[#F3D9A4] bg-[#FFF8E8] p-4 sm:p-5 mb-10">
              <FileWarning className="w-5 h-5 mt-0.5 shrink-0 text-[#8A5200]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[#6B4300]">
                <strong>Draft — awaiting legal review.</strong> This document describes how this website works today. It will be finalised after
                review by a legal adviser and may change.
              </p>
            </div>
          )}
          <nav aria-label="On this page" className="mb-10">
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-[15px]">
              {sections.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="inline-flex min-h-[40px] items-center text-brand hover:underline underline-offset-4">{i + 1}. {s.title}</a></li>
              ))}
            </ol>
          </nav>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mb-9 scroll-mt-24">
              <h2 className="font-display font-bold text-[1.375rem] md:text-[1.5rem] text-navy">{i + 1}. {s.title}</h2>
              <div className="mt-3 flex flex-col gap-3 text-base leading-[1.75] text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  useSeo({
    title: LEGAL_REVIEWED ? 'Privacy Policy' : 'Privacy Policy (Draft)',
    description: 'How YP Nova collects, uses, stores and protects information submitted through the ypnova.com website.',
    path: '/privacy',
    noindex: !LEGAL_REVIEWED,
    breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy' }],
  });
  const sections = [
    { id: 'who', title: 'Who we are', body: (<>
      <p>
        {company.brandName} is the technology brand of {company.parentCompany} (“{company.brandName}”, “we”, “us”). This policy explains how we handle
        personal data collected through our website, <Site />. For the purposes of applicable Indian law, including the Information Technology Act, 2000
        and the Digital Personal Data Protection Act, 2023 (as its provisions apply), {company.parentCompany} decides why and how this personal data is
        processed.
      </p>
      <p>This policy covers the website only. Personal data handled during a software project is covered by the agreement for that project.</p>
    </>) },
    { id: 'collect', title: 'Information we collect', body: (<>
      <p><strong>Information you give us through the enquiry form:</strong></p>
      <ul>
        <li>full name and work email address;</li>
        <li>company name, phone number and industry (optional);</li>
        <li>the service you need, an approximate budget (optional) and your project description;</li>
        <li>your preferred contact method and your confirmation that we may contact you;</li>
        <li>the address of the page from which the form was sent.</li>
      </ul>
      <p><strong>Information you give us directly</strong> when you call, email or message us on WhatsApp — for example your name, number and the content of your message.</p>
      <p>
        <strong>Technical information:</strong> like most websites, the servers of our hosting provider record standard technical information about
        requests to the website (such as IP address, browser type, the page requested and the time of the request) to deliver and secure the site.
      </p>
      <p>
        We do not ask for sensitive personal data such as financial account details, health information or government identification numbers through
        this website. Please do not include them in your enquiry.
      </p>
    </>) },
    { id: 'use', title: 'How we use your information', body: (<>
      <ul>
        <li>to read and respond to your enquiry using the contact method you prefer;</li>
        <li>to discuss your requirements and prepare a proposal or estimate you have asked for;</li>
        <li>to keep a record of our communication with you;</li>
        <li>to keep the website working, secure and protected against misuse and spam.</li>
      </ul>
      <p>We do not sell your personal data, and we do not use enquiry details for unrelated marketing without your consent.</p>
    </>) },
    { id: 'form-processing', title: 'How the enquiry form works', body: (<>
      <p>
        When you send the enquiry form, your details are transmitted over an encrypted (HTTPS) connection to a Google Apps Script service operated by
        us. It adds your enquiry to a Google Sheet in our Google account and sends a notification email to {company.email.address}. Your enquiry is
        therefore stored and processed using Google services, under Google’s terms and privacy policy, and may be processed on servers outside India.
      </p>
      <p>
        If online sending is unavailable, the form offers to open your own email application with your details pre-filled; nothing is sent until you
        send that email yourself.
      </p>
      <p>
        The form includes basic automated spam protection. A submission that appears to be automated is not sent.
      </p>
    </>) },
    { id: 'cookies', title: 'Cookies and analytics', body: (<>
      <p>
        This website does not set its own cookies, and at the date of this policy it does not use analytics or advertising tools. Fonts are served from
        our own website, not from a third-party font service.
      </p>
      <p>
        The website has been prepared so that Google Analytics can be switched on in future to measure visits and enquiries. We will update this policy
        before analytics is enabled.
      </p>
      <p>The interactive product demonstrations on the website use fictional sample data; anything you enter in them stays in your browser and is not sent to us.</p>
    </>) },
    { id: 'third-parties', title: 'Third-party services', body: (<>
      <ul>
        <li><strong>Google</strong> (Google Workspace / Gmail, Google Sheets and Google Apps Script) — receiving and storing enquiries and notification emails.</li>
        <li><strong>Our web hosting provider</strong> (MilesWeb) — hosting the website and its standard server logs.</li>
        <li><strong>WhatsApp</strong> (Meta) — only if you choose to contact us by WhatsApp; the WhatsApp link opens their service.</li>
        <li><strong>Google Maps</strong> — only if you open our Google Maps link; no map is embedded in the website.</li>
      </ul>
      <p>Each provider handles data under its own terms and privacy policy. We share personal data with others only where required by law.</p>
    </>) },
    { id: 'retention', title: 'How long we keep information', body: (<>
      <p>
        We keep enquiry information only for as long as it is needed for the purposes described above — for example while we are discussing your
        requirements and for a reasonable period afterwards to keep a record of that communication — or for longer where the law requires it. We delete
        or anonymise enquiry records that are no longer needed.
      </p>
    </>) },
    { id: 'security', title: 'How we protect information', body: (<>
      <p>
        The website is served over HTTPS, and enquiry records are kept in a Google account to which only authorised people at {company.brandName} have
        access. We take reasonable care to protect personal data, but no method of transmission or storage is completely secure.
      </p>
    </>) },
    { id: 'rights', title: 'Your choices and rights', body: (<>
      <p>Subject to applicable law, you may ask us to:</p>
      <ul>
        <li>tell you what personal data we hold about you and how we use it;</li>
        <li>correct, complete or update it;</li>
        <li>delete it when it is no longer needed;</li>
        <li>stop contacting you — you can withdraw your consent at any time;</li>
        <li>address any grievance about how your data has been handled.</li>
      </ul>
      <p>
        Send your request to <Email /> or call <Tel />. We may need to confirm your identity before acting on a request. Withdrawing consent does not
        affect anything we did before the withdrawal.
      </p>
    </>) },
    { id: 'children', title: 'Children', body: (<p>This website is intended for businesses and is not directed at children. We do not knowingly collect personal data from anyone under 18.</p>) },
    { id: 'changes', title: 'Changes to this policy', body: (<p>We may update this policy when the website or our practices change. The current version and its “last updated” date are always shown on this page.</p>) },
    { id: 'contact', title: 'Contact for privacy questions', body: (<p>{company.brandName} ({company.parentCompany}) — email <Email />, phone <Tel />.</p>) },
  ];
  return <LegalLayout testId="privacy-page" title={<><span className="font-serif grad-text">Privacy</span> Policy</>} intro="How YP Nova collects, uses and protects the information you share through this website." sections={sections} />;
}

export function Terms() {
  useSeo({
    title: LEGAL_REVIEWED ? 'Terms of Service' : 'Terms of Service (Draft)',
    description: 'Terms for using the ypnova.com website, and how YP Nova proposals and software project agreements relate to them.',
    path: '/terms',
    noindex: !LEGAL_REVIEWED,
    breadcrumbs: [{ name: 'Terms of Service', path: '/terms' }],
  });
  const sections = [
    { id: 'about', title: 'About these terms', body: (<>
      <p>
        These terms govern your use of <Site />, operated by {company.brandName}, the technology brand of {company.parentCompany} (“we”, “us”). By using
        the website you agree to them.
      </p>
      <p>
        <strong>Website terms and project agreements are separate.</strong> These terms cover the website only. Any software development, deployment,
        hosting, maintenance or support work is governed by a written proposal and agreement signed for that project. If anything in these terms
        conflicts with a signed project agreement, the project agreement applies to that project.
      </p>
    </>) },
    { id: 'use', title: 'Using the website', body: (<ul>
      <li>You may browse the website and contact us for legitimate business purposes.</li>
      <li>You must not misuse the website — for example by attempting unauthorised access, interfering with its operation, or sending spam or harmful code.</li>
      <li>Information you submit should be accurate, and you should be entitled to share it.</li>
    </ul>) },
    { id: 'ip', title: 'Intellectual property', body: (<p>The {company.brandName} name and logo, and the text, design, graphics and product demonstrations on this website, belong to us or our licensors. You may view and share pages for your own reference, but you may not copy, reproduce or reuse them commercially without our written permission. Other names and marks belong to their owners.</p>) },
    { id: 'content', title: 'Website content and demonstrations', body: (<>
      <p>Website content is general information about our services and approach. It is not a binding offer, and it does not form part of any contract unless a signed agreement says so.</p>
      <p>Product demonstrations and solution concepts are illustrative and use fictional sample data. They show the kind of software we build; the actual features of any system depend on the scope agreed for that project.</p>
    </>) },
    { id: 'services', title: 'Service descriptions', body: (<p>We describe our services as accurately as we can. Pages state where something is based on delivered project experience and where it is offered as custom development. Availability of a service for a particular requirement is confirmed only through discussion and a written proposal.</p>) },
    { id: 'proposals', title: 'Proposals, scope of work and quotations', body: (<ul>
      <li>A proposal or quotation sets out the scope of work, deliverables, assumptions and price for a specific requirement, and is valid for the period stated in it.</li>
      <li>Work outside the agreed scope, or changes to it, are agreed in writing and may change the price and timeline.</li>
      <li>A proposal becomes binding only when accepted in writing as stated in it, or when both parties sign a project agreement.</li>
    </ul>) },
    { id: 'payment', title: 'Payment terms', body: (<p>Prices, payment milestones, invoicing, taxes and due dates are set out in each proposal or project agreement. No payment terms apply to you merely because you use this website.</p>) },
    { id: 'timelines', title: 'Project timelines', body: (<p>Timelines are agreed for each project. They depend on timely inputs, feedback, approvals and access from the client, and on any third-party services involved. Any estimate given before a project agreement is signed is indicative only.</p>) },
    { id: 'client', title: 'Client responsibilities', body: (<p>A project agreement will set out what we need from a client — typically accurate requirements, a point of contact, timely feedback and approvals, access to required systems and data, and any content or licences the client provides. Clients are responsible for having the right to share the data and materials they give us.</p>) },
    { id: 'third-party', title: 'Third-party services', body: (<p>Software we build may rely on third-party services such as hosting providers, Google services, payment gateways or external APIs. These are subject to their providers’ own terms, availability and charges. Responsibility for third-party accounts and their costs is agreed in each project agreement.</p>) },
    { id: 'hosting', title: 'Hosting and maintenance', body: (<p>Hosting, deployment, maintenance and support are provided only where agreed in writing, with the scope, duration and charges stated in the relevant proposal or agreement. A software delivery project does not include ongoing hosting or maintenance unless it says so.</p>) },
    { id: 'warranty', title: 'Warranty and support scope', body: (<p>Any warranty or post-delivery support for software we build — what it covers, for how long, and what it excludes — is defined only in the project agreement. This website and its content are provided “as is”, without warranties of any kind, to the extent permitted by law.</p>) },
    { id: 'liability', title: 'Limitation of liability', body: (<p>To the extent permitted by law, we are not liable for any loss or damage arising from the use of, or inability to use, this website or reliance on its content. Liability in connection with a software project is governed by the project agreement. Nothing in these terms excludes liability that cannot be excluded by law.</p>) },
    { id: 'availability', title: 'Website availability and links', body: (<p>We aim to keep the website available and accurate but do not guarantee uninterrupted access. We may change or withdraw content at any time. Links to third-party websites (such as Google Maps or WhatsApp) are provided for convenience; we are not responsible for their content or practices.</p>) },
    { id: 'law', title: 'Governing law', body: (<p>These terms are governed by the laws of India. The courts and dispute-resolution arrangements for a software project are those stated in its project agreement.</p>) },
    { id: 'changes', title: 'Changes to these terms', body: (<p>We may update these terms from time to time. The current version and its “last updated” date are always shown on this page; continued use of the website after a change means you accept the updated terms.</p>) },
    { id: 'contact', title: 'Contact', body: (<p>Questions about these terms: email <Email /> or call <Tel />. Our <Link to="/privacy" className="font-semibold text-brand underline underline-offset-4">Privacy Policy</Link> explains how we handle personal data.</p>) },
  ];
  return <LegalLayout testId="terms-page" title={<><span className="font-serif grad-text">Terms</span> of Service</>} intro="The terms that govern use of this website. Software projects are always covered by a separate written agreement." sections={sections} />;
}
