'use client';

import { Button } from '@/components/ui/button';
import { EditorContent, JSONContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <Button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 1,
            })
            .run()
        }
        variant={
          editor.isActive('heading', { level: 1 }) ? 'default' : 'secondary'
        }
      >
        H1
      </Button>
      <Button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2,
            })
            .run()
        }
        variant={
          editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'
        }
      >
        H2
      </Button>
      <Button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 3,
            })
            .run()
        }
        variant={
          editor.isActive('heading', { level: 3 }) ? 'default' : 'secondary'
        }
      >
        H3
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'default' : 'secondary'}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'default' : 'secondary'}
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive('strike') ? 'default' : 'secondary'}
      >
        Strike
      </Button>
    </div>
  );
};

export function TipTapEditor({setJson, json}: {setJson: any, json: JSONContent | null}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base"
      }
    },
    onUpdate: ({ editor }) => {
      setJson(editor.getJSON());
    }
  });
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] bg-white mt-2"/>
    </div>
  );
}
