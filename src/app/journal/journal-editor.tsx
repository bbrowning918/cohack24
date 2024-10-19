'use client'

import { JewelEditor } from "@/components/jewel-editor/editor";
import { jewelLocalDb } from "@/lib/local-db";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { EditorEvents } from '@tiptap/core'
import { EditorInstance, JSONContent } from "novel";
import { useEffect, useState } from "react";

interface JournalEditorProps {
    todayDate: string;
}

export function JournalEditor({ todayDate }: JournalEditorProps) {
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    useEffect(() => {
        async function getInitialContent() {
            const initialContent = await jewelLocalDb.getItem<JSONContent | undefined>(todayDate)
            if (!initialContent) {
                return undefined
            }
            return initialContent
        }
        getInitialContent().then(setContent)
    }, [todayDate])
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
      await jewelLocalDb.setItem(todayDate, json)
    },
    500
  );
  const handleEditorUpdate = ({ editor }: EditorEvents['update']) => {
    debouncedUpdates(editor)
  }
    return (
        <JewelEditor initialContent={content} onUpdate={handleEditorUpdate} />
    )
}