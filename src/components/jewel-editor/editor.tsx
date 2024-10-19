"use client";

import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { JSONContent, AnyExtension } from "@tiptap/core";
import { EditorContent, EditorRoot } from "novel";
import type { EditorInstance } from "novel";
import { useState } from "react";
import { defaultJewelEditorContent } from "./default-content";
import { defaultJewelEditorExtensions } from "./default-extensions";

interface JewelEditorProps {
  initialContent?: JSONContent;
  extensions?: AnyExtension[];
}

export function JewelEditor({
  extensions = [],
  initialContent = defaultJewelEditorContent,
}: JewelEditorProps) {
  const [content, setContent] = useState(initialContent);
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
    },
    500
  );
  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions.concat(defaultJewelEditorExtensions)}
        immediatelyRender={false}
        initialContent={content}
        onUpdate={({ editor }) => debouncedUpdates(editor)}
      />
    </EditorRoot>
  );
}
