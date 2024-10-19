'use client';

import type { EditorEvents } from '@tiptap/core'
import { JournalHeader } from "./journal-header";
import { useEffect, useState } from "react";
import { completedEntriesDb, jewelLocalDb } from "@/lib/local-db";
import { EditorInstance, JSONContent } from "novel";
import { JewelEditor } from "@/components/jewel-editor/editor";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";

interface JournalProps {
    date: string;
}

function useJournalEntry(date: string) {
    const [state, setState] = useState<'loading' | 'success'>('loading')
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    const [isCompleted, setCompleted] = useState(false)
    useEffect(() => {
        async function getInitialContent(date: string) {
            const initialContent = await jewelLocalDb().getItem<JSONContent | undefined>(date)
            if (!initialContent) {
                return undefined
            }
            return initialContent
        }
        async function checkCompleted(date: string) {
            const isCompleted = !!(await completedEntriesDb().getItem(date))
            return isCompleted
        }
        async function init(date: string) {
            const initialContent = await getInitialContent(date)
            const isCompleted = await checkCompleted(date)
            setContent(initialContent)
            setState('success')
            setCompleted(isCompleted)
        }
        init(date)
    }, [date])
    const debouncedUpdates = useDebouncedCallback(
        async (editor: EditorInstance) => {
            const json = editor.getJSON();
            setContent(json);
            await jewelLocalDb().setItem(date, json)
        },
        300
    );
    if (state === 'loading') {
        return [{ content: undefined, isCompleted, state: 'loading' }, debouncedUpdates] as const
    }
    return [{ content, state: 'success', isCompleted }, debouncedUpdates] as const
}

export function Journal({ date }: JournalProps) {
    const [{ state, isCompleted, content }, debouncedUpdates] = useJournalEntry(date)
    const handleEditorUpdate = ({ editor }: EditorEvents['update']) => debouncedUpdates(editor)
    return (
        <>
            <JournalHeader date={date} content={content} />
            {state === 'loading' ? null : (
                <JewelEditor
                    editable={isCompleted === false}
                    initialContent={content}
                    onUpdate={handleEditorUpdate}
                />
            )}
        </>
    )
}