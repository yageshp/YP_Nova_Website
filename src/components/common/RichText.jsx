import React from 'react';
import { Link } from 'react-router-dom';

/** Renders plain text with inline internal links written as [anchor text](/path). */
export function RichText({ text }) {
  const parts = [];
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} to={m[2]} className="font-semibold text-brand underline decoration-soft/60 underline-offset-4 hover:decoration-brand">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Strips link markup — for meta descriptions and JSON-LD. */
export const plainText = (text) => text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '$1');
