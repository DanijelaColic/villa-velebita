import type { ReactNode } from 'react';
import type { TipTapDoc, TipTapMark, TipTapNode } from '../types';

function applyMarks(text: string, marks: TipTapMark[] | undefined, key: string): ReactNode {
  let node: ReactNode = text;

  if (!marks?.length) return <span key={key}>{node}</span>;

  for (const mark of marks) {
    if (mark.type === 'bold') {
      node = <strong key={`${key}-b`}>{node}</strong>;
    } else if (mark.type === 'italic') {
      node = <em key={`${key}-i`}>{node}</em>;
    } else if (mark.type === 'link') {
      const href = typeof mark.attrs?.href === 'string' ? mark.attrs.href : '#';
      const target = typeof mark.attrs?.target === 'string' ? mark.attrs.target : undefined;
      node = (
        <a
          key={`${key}-a`}
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-terracotta underline underline-offset-2 hover:text-terracotta-dark"
        >
          {node}
        </a>
      );
    }
  }

  return node;
}

function renderNode(node: TipTapNode, index: number): ReactNode {
  const key = `${node.type}-${index}`;

  switch (node.type) {
    case 'paragraph': {
      const children = node.content?.map((child, i) => renderNode(child, i));
      return (
        <p key={key} className="text-stone leading-relaxed">
          {children?.length ? children : '\u00A0'}
        </p>
      );
    }
    case 'heading': {
      const level = typeof node.attrs?.level === 'number' ? node.attrs.level : 2;
      const children = node.content?.map((child, i) => renderNode(child, i));
      const className = 'font-display font-semibold text-oak mb-3';
      if (level === 3) {
        return (
          <h3 key={key} className={`text-xl ${className}`}>
            {children}
          </h3>
        );
      }
      return (
        <h2 key={key} className={`text-2xl ${className}`}>
          {children}
        </h2>
      );
    }
    case 'bulletList':
      return (
        <ul key={key} className="list-disc space-y-1 pl-5 text-stone leading-relaxed">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={key} className="list-decimal space-y-1 pl-5 text-stone leading-relaxed">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );
    case 'listItem':
      return (
        <li key={key}>{node.content?.map((child, i) => renderNode(child, i))}</li>
      );
    case 'hardBreak':
      return <br key={key} />;
    case 'text':
      return applyMarks(node.text ?? '', node.marks, key);
    default:
      if (node.content?.length) {
        return (
          <div key={key} className="space-y-3">
            {node.content.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

/** Server-safe render TipTap JSON-a (bez TipTap runtime-a). */
export function TipTapRenderer({ content }: { content: TipTapDoc | null }) {
  if (!content?.content?.length) return null;

  return (
    <div className="space-y-4">
      {content.content.map((node, index) => renderNode(node, index))}
    </div>
  );
}
