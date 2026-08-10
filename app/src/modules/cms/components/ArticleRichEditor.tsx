'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from 'lucide-react';
import clsx from 'clsx';
import { useRef } from 'react';
import type { AppLocale } from '@/i18n/routing';
import type { TipTapDoc } from '@/modules/cms/types';
import { normalizeTipTapDoc } from '@/modules/cms/lib/tiptap-text';

type Props = {
  /** Jezik ovog editora — fiksiran pri mountu da onUpdate ne upiše u krivi tab. */
  locale: AppLocale;
  content: TipTapDoc | null;
  onChange: (locale: AppLocale, doc: TipTapDoc | null) => void;
  placeholder?: string;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'rounded-md p-1.5 transition-colors disabled:opacity-40',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      )}
    >
      {children}
    </button>
  );
}

export default function ArticleRichEditor({
  locale,
  content,
  onChange,
  placeholder = 'Pišite sadržaj članka…',
}: Props) {
  // Fiksiran locale za ovaj mount (key=locale u parentu) — sprječava curenje u drugi jezik
  const localeRef = useRef(locale);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-terracotta underline',
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: content ?? { type: 'doc', content: [{ type: 'paragraph' }] },
    editorProps: {
      attributes: {
        class:
          'article-editor min-h-[200px] px-3 py-2 focus:outline-none text-sm text-gray-800 leading-relaxed',
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChangeRef.current(
        localeRef.current,
        normalizeTipTapDoc(ed.getJSON() as TipTapDoc),
      );
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[240px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400">
        Učitavanje editora…
      </div>
    );
  }

  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL poveznice', previous ?? 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50 px-2 py-1.5">
        <ToolbarButton
          title="Podebljano"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Kurziv"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-gray-200" />
        <ToolbarButton
          title="Naslov 2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Naslov 3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-gray-200" />
        <ToolbarButton
          title="Lista"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Numerirana lista"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Poveznica"
          active={editor.isActive('link')}
          onClick={setLink}
        >
          <LinkIcon size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-gray-200" />
        <ToolbarButton
          title="Poništi"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Ponovi"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={15} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
