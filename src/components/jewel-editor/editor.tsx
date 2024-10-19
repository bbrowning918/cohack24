import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, EditorInstance, EditorRoot } from "novel";
import { useState } from "react";

export function JewelEditor() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
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
        initialContent={content}
        onUpdate={({ editor }) => debouncedUpdates(editor)}
      />
    </EditorRoot>
  );
}
