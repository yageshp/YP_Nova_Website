import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Info, Phone } from 'lucide-react';
import { PageHeader, Section, container } from '@/components/common/PageShell';
import { Button } from '@/components/common/Button';
import { CheckList } from '@/components/common/Bits';
import { CtaBand } from '@/components/common/CtaBand';
import { RichText, plainText } from '@/components/common/RichText';
import { FaqList, faqsPlain } from '@/components/common/Faq';
import { RelatedLinks } from '@/components/common/RelatedLinks';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { Reveal } from '@/components/animations/Reveal';
import { techStack } from '@/components/sections/TechStackSection';
import { getServicePage, servicePages } from '@/data/servicePages';
import { solutions, solutionPages } from '@/data/solutions';
import { industries } from '@/data/industries';
import { insights } from '@/data/insights';
import { company } from '@/config/company';
import { useSeo, serviceNode, faqNode } from '@/hooks/useSeo';
import NotFound from './NotFound';

function Block({ section, index }) {
  const { id, heading, body = [], bullets, cards, table, steps } = section;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-24 ${index % 2 ? 'bg-lavender/50' : ''}`}>
      <div className={`${container} py-12 md:py-16`}>
        <div className={cards || table || steps ? '' : 'max-w-3xl'}>
          <h2 id={`${id}-h`} className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] max-w-3xl">{heading}</h2>
          {body.length > 0 && !cards && !table && !steps && (
            <div className="mt-5 flex flex-col gap-4 text-base md:text-[17px] leading-relaxed text-ink">
              {body.map((p) => <p key={p.slice(0, 40)}><RichText text={p} /></p>)}
            </div>
          )}
          {bullets && <CheckList items={bullets} className="mt-6 max-w-3xl [&_li]:text-base" />}
        </div>

        {cards && (
          <>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {cards.map((c, i) => (
                <Reveal as="li" key={c.title} delay={0.03 + i * 0.04} className="card p-5 sm:p-6">
                  <h3 className="h-card !text-[1.0625rem]">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted"><RichText text={c.text} /></p>
                </Reveal>
              ))}
            </ul>
            {body.map((p) => <p key={p.slice(0, 40)} className="mt-6 max-w-3xl text-base leading-relaxed text-ink"><RichText text={p} /></p>)}
          </>
        )}

        {table && (
          <>
            <div className="mt-8 rounded-2xl sm:border sm:border-line sm:bg-white sm:overflow-hidden">
              {/* Phones: each row becomes a labelled card. sm and up: a normal table. */}
              <table className="w-full text-left text-[15px] block sm:table">
                <caption className="sr-only">{heading}</caption>
                <thead className="sr-only sm:not-sr-only sm:table-header-group bg-[#FBFAFE]">
                  <tr>
                    {table.columns.map((c, i) => (
                      <th key={c || i} scope="col" className="px-4 sm:px-5 py-3.5 font-display font-bold text-navy border-b border-line">{c || <span className="sr-only">Aspect</span>}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-3 sm:table-row-group">
                  {table.rows.map((r) => (
                    <tr key={r[0]} className="block card p-4 sm:p-0 sm:table-row sm:shadow-none sm:rounded-none sm:border-0 sm:border-b sm:border-line sm:last:border-0 align-top">
                      <th scope="row" className="block sm:table-cell sm:px-5 sm:py-3.5 font-display sm:font-sans font-bold sm:font-semibold text-navy sm:w-[22%] mb-2 sm:mb-0">{r[0]}</th>
                      {r.slice(1).map((cell, i) => (
                        <td key={i} data-label={table.columns[i + 1]}
                          className="block sm:table-cell sm:px-5 sm:py-3.5 py-1 text-ink leading-relaxed before:content-[attr(data-label)':_'] before:font-semibold before:text-brand sm:before:content-none">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {body.map((p) => <p key={p.slice(0, 40)} className="mt-6 max-w-3xl text-base leading-relaxed text-ink"><RichText text={p} /></p>)}
          </>
        )}

        {steps && (
          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((st, i) => (
              <li key={st.title} className="card p-5 sm:p-6">
                <span className="font-mono text-xs font-medium text-brand bg-lavender rounded-full px-2.5 py-1">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h-card !text-[1.0625rem] mt-4">{st.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{st.text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

/** A short, text-only section (rendered as a card when it sits next to similar sections). */
const isSimple = (s) => !s.cards && !s.table && !s.steps && !s.bullets && (s.body || []).length <= 2
  && (s.body || []).join(' ').length < 700;

/** Groups runs of 2+ consecutive simple sections so they share one band as a card grid. */
function groupSections(sections) {
  const out = [];
  sections.forEach((s) => {
    const last = out[out.length - 1];
    if (isSimple(s) && last && last.group) last.items.push(s);
    else out.push(isSimple(s) ? { group: true, items: [s] } : s);
  });
  return out.flatMap((g) => (g.group && g.items.length < 2 ? g.items : [g]));
}

function CardGroup({ items, index }) {
  return (
    <div className={index % 2 ? 'bg-lavender/50' : ''}>
      <div className={`${container} py-12 md:py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(({ id, heading, body }) => (
            <section key={id} id={id} aria-labelledby={`${id}-h`} className="card p-6 sm:p-8 scroll-mt-24">
              <h2 id={`${id}-h`} className="h-card !text-[1.3rem]">{heading}</h2>
              <div className="mt-3 flex flex-col gap-3 text-[15px] md:text-base leading-relaxed text-ink">
                {body.map((p) => <p key={p.slice(0, 40)}><RichText text={p} /></p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing({ page }) {
  const path = `/${page.slug}`;
  useSeo({
    title: page.seoTitle,
    description: page.metaDescription,
    path,
    breadcrumbs: [{ name: 'Services', path: '/services' }, { name: page.navLabel, path }],
    jsonLd: [
      serviceNode({ name: page.navLabel, description: page.metaDescription, path, audience: 'Businesses in India' }),
      faqNode(faqsPlain(page.faqs), path),
    ],
  });

  const relSolutions = page.relatedSolutions.map((slug) => solutions.find((s) => s.slug === slug)).filter(Boolean)
    .map((s) => ({ to: s.slug in SOLUTION_PAGES ? `/solutions/${s.slug}` : `/solutions#${s.slug}`, label: s.title, text: s.summary, icon: s.icon }));
  const relIndustries = page.industries.map((slug) => industries.find((i) => i.slug === slug)).filter(Boolean)
    .map((i) => ({ to: `/industries/${i.slug}`, label: `${i.name} software`, icon: i.icon }));
  const relInsights = page.relatedInsights.map((slug) => insights.find((i) => i.slug === slug)).filter(Boolean)
    .map((a) => ({ to: `/insights/${a.slug}`, label: a.title, text: a.excerpt }));
  const relServices = page.relatedServices.map((slug) => SERVICE_INDEX[slug]).filter(Boolean)
    .map((p) => ({ to: `/${p.slug}`, label: p.navLabel, text: plainText(p.metaDescription), icon: p.icon }));
  const toc = page.sections.map((s) => ({ id: s.id, label: s.heading }));

  return (
    <div data-testid={`service-page-${page.slug}`}>
      <PageHeader
        breadcrumbs={[{ label: 'Services', to: '/services' }, { label: page.navLabel }]}
        eyebrow={page.eyebrow}
        title={<>{page.h1[0]} <span className="font-serif grad-text">{page.h1[1]}</span></>}
        subtitle={page.intro}
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Button to="/contact" variant="primary" data-testid="service-cta">Discuss Your Project</Button>
          <Button href={company.phone.href} variant="secondary"><Phone className="w-4 h-4 text-brand" aria-hidden="true" /> {company.phone.display}</Button>
          <Button href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" variant="secondary">
            <WhatsAppIcon className="w-5 h-5 text-[#1DA851]" /> WhatsApp
          </Button>
        </div>
      </PageHeader>

      {/* Experience vs custom development — kept explicit for honesty */}
      <div className={`${container} pt-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5 items-start">
          <div className={`rounded-3xl border p-5 sm:p-6 ${page.experience.delivered.length ? 'border-[#BFE5CD] bg-[#F2FBF5]' : 'border-line bg-[#FBFAFE]'}`} data-testid="experience-box">
            <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#11693A]">
              {page.experience.delivered.length ? <><CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Delivered project experience</> : <><Info className="w-4 h-4 text-brand" aria-hidden="true" /> <span className="text-brand">Current status</span></>}
            </h2>
            {page.experience.delivered.length > 0 && (
              <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-relaxed text-ink list-disc pl-5">
                {page.experience.delivered.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}
            <p className="mt-3 text-sm leading-relaxed text-muted">{page.experience.note}</p>
          </div>
          <nav aria-label="On this page" className="rounded-3xl border border-line p-5 sm:p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-3">On this page</h2>
            <ol className="grid gap-1 text-[15px]">
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="inline-flex min-h-[36px] items-center text-ink hover:text-brand">{t.label}</a></li>
              ))}
              <li><a href="#faq" className="inline-flex min-h-[36px] items-center text-ink hover:text-brand">Frequently asked questions</a></li>
            </ol>
          </nav>
        </div>
      </div>

      {groupSections(page.sections).map((s, i) => (s.group
        ? <CardGroup key={s.items[0].id} items={s.items} index={i} />
        : <Block key={s.id} section={s} index={i} />))}

      {page.stack && (
        <Section tone="soft">
          <h2 className="h-section !text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)]">Technology we use</h2>
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map(({ group, items }) => (
              <div key={group} className="card p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{group}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold text-navy">{items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section>
        <div className="flex flex-col gap-12">
          <RelatedLinks title="Related solutions" items={relSolutions} columns={relSolutions.length >= 4 ? 4 : 3} />
          <RelatedLinks title="Industries we serve" items={relIndustries} columns={3} />
        </div>
      </Section>

      <Section tone="lavender">
        <div className="max-w-3xl"><FaqList faqs={page.faqs} /></div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <RelatedLinks title="Related services" items={relServices} columns={3} />
          <RelatedLinks title="Further reading" items={relInsights} columns={3} />
        </div>
      </Section>

      <CtaBand title={page.cta.title} text={page.cta.text} />
    </div>
  );
}

const SERVICE_INDEX = Object.fromEntries(servicePages.map((s) => [s.slug, s]));
const SOLUTION_PAGES = solutionPages;

export default function ServiceLanding({ slug }) {
  const { pathname } = useLocation();
  const page = getServicePage(slug || pathname.slice(1));
  if (!page) return <NotFound />;
  return <Landing key={page.slug} page={page} />;
}
