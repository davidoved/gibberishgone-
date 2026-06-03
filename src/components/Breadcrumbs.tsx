import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

type Crumb = {
  label: string;
  path?: string;
};

const BREADCRUMB_MAP: Record<string, Crumb[]> = {
  'converter': [{ label: 'Home', path: '/' }, { label: 'Utility' }],
  'knowledge': [{ label: 'Home', path: '/' }, { label: 'Archive' }],
  'about': [{ label: 'Home', path: '/' }, { label: 'About' }],
  'privacy': [{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }],
  'terms': [{ label: 'Home', path: '/' }, { label: 'Terms of Service' }],
  'support': [{ label: 'Home', path: '/' }, { label: 'Contact Us' }],
  'how-it-works': [{ label: 'Home', path: '/' }, { label: 'How It Works' }],
  'faq': [{ label: 'Home', path: '/' }, { label: 'FAQ' }],
  'use-cases': [{ label: 'Home', path: '/' }, { label: 'Use Cases' }],
  'blog': [{ label: 'Home', path: '/' }, { label: 'Blog' }],
};

export const Breadcrumbs: React.FC<{ currentView: string; basePath: string; homeLabel?: string }> = ({ currentView, basePath, homeLabel = 'Home' }) => {
  const crumbs = (BREADCRUMB_MAP[currentView] || [{ label: homeLabel, path: '/' }]).map(c => c.label === 'Home' ? { ...c, label: homeLabel } : c);

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: crumb.path
          ? `https://gibberishgone.com${basePath === '/' ? '/en' : ''}${crumb.path}`
          : undefined,
      })),
    };

    const existing = document.getElementById('breadcrumb-schema');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'breadcrumb-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('breadcrumb-schema');
      if (el) el.remove();
    };
  }, [currentView, basePath]);

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-6xl mx-auto px-8 pt-24 pb-0">
      <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-600">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.label}>
            {index > 0 && <span className="text-slate-700">/</span>}
            {crumb.path ? (
              <li>
                <Link to={`${basePath}${crumb.path === '/' ? 'utility' : crumb.path.replace(/^\//, '')}`} className="hover:text-teal-400 transition-colors">
                  {crumb.label}
                </Link>
              </li>
            ) : (
              <li className="text-slate-400" aria-current="page">{crumb.label}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
