import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { PageHeader, container } from '@/components/common/PageShell';
import { CtaBand } from '@/components/common/CtaBand';
import { getInsight, insights } from '@/data/insights';
import { useSeo } from '@/hooks/useSeo';
import { company } from '@/config/company';
import { seo } from '@/config/seo';
import { servicePages } from '@/data/servicePages';
import { RichText } from '@/components/common/RichText';
import NotFound from './NotFound';

function Article({ post }) {
  useSeo({
    title: post.seoTitle || post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    breadcrumbs: [{ name: 'Insights', path: '/insights' }, { name: post.title, path: `/insights/${post.slug}` }],
    jsonLd: {
      '@type': 'Article',
      '@id': `${seo.siteUrl}/insights/${post.slug}#article`,
      headline: post.title,
      description: post.excerpt,
      articleSection: post.category,
      inLanguage: seo.language,
      image: `${seo.siteUrl}${seo.defaultImage}`,
      mainEntityOfPage: `${seo.siteUrl}/insights/${post.slug}`,
      // Written by the company; no individual author or publication date is claimed.
      author: { '@id': `${seo.siteUrl}/#organization` },
      publisher: { '@id': `${seo.siteUrl}/#organization` },
    },
  });
  const service = post.service && servicePages.find((p) => p.slug === post.service);
  const more = insights.filter((i) => i.slug !== post.slug && i.category === post.category).slice(0, 2);
  const fallback = insights.filter((i) => i.slug !== post.slug).slice(0, 2);
  const related = more.length ? more : fallback;

  return (
    <div data-testid="insight-detail">
      <PageHeader
        breadcrumbs={[{ label: 'Insights', to: '/insights' }, { label: post.category }]}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
      >
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <Clock className="w-4 h-4" aria-hidden="true" /> {post.readMinutes} min read · By the {company.brandName} team
        </p>
      </PageHeader>

      <article className={`${container} py-12 md:py-16`}>
        <div className="max-w-[720px] mx-auto">
          {post.sections.map((s) => (
            <section key={s.heading} className="mb-9">
              <h2 className="font-display font-bold text-[1.5rem] md:text-[1.75rem] leading-snug text-navy">{s.heading}</h2>
              <p className="mt-3 text-[17px] leading-[1.8] text-ink"><RichText text={s.body} /></p>
            </section>
          ))}

          {service && (
            <aside className="mt-4 rounded-3xl border border-[#E6DCFB] bg-lavender/60 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-testid="article-service-link">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">Related service</p>
                <p className="mt-1.5 font-display font-bold text-lg text-navy">{service.navLabel}</p>
              </div>
              <Link to={`/${service.slug}`} className="inline-flex items-center justify-center gap-1.5 min-h-[48px] rounded-full grad-button text-white px-5 font-semibold shrink-0">
                Explore {service.navLabel} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </aside>
          )}

          <div className="mt-12 pt-8 border-t border-line">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-4">Keep reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.slug} to={`/insights/${r.slug}`} className="group card card-hover p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-2">{r.category}</p>
                  <p className="font-display font-bold text-[1.0625rem] leading-snug text-navy group-hover:text-brand transition-colors">
                    {r.title} <ArrowUpRight className="inline w-4 h-4" aria-hidden="true" />
                  </p>
                </Link>
              ))}
            </div>
            <Link to="/insights" className="mt-6 inline-flex items-center gap-2 min-h-[44px] font-semibold text-brand hover:text-navy">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All insights
            </Link>
          </div>
        </div>
      </article>

      <CtaBand title="Want to apply this in your business?" text="Tell us where you are today. We will suggest a sensible, proportionate first step." />
    </div>
  );
}

export default function InsightDetail() {
  const { slug } = useParams();
  const post = getInsight(slug);
  if (!post) return <NotFound />;
  return <Article key={slug} post={post} />;
}
