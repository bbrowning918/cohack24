'use client';

import { formatToday } from "@/lib/dates";
import type { EditorEvents } from '@tiptap/core'
import { JournalHeader } from "./journal-header";
import { useEffect, useState } from "react";
import { jewelLocalDb } from "@/lib/local-db";
import { EditorInstance, JSONContent } from "novel";
import { JewelEditor } from "@/components/jewel-editor/editor";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";

interface JournalProps {
    date: string;
}

function useJournalEntry(date: string) {
    const [state, setState] = useState<'loading' | 'success'>('loading')
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    useEffect(() => {
        async function getInitialContent(date: string) {
            const initialContent = await jewelLocalDb.getItem<JSONContent | undefined>(date)
            if (!initialContent) {
                return undefined
            }
            return initialContent
        }
        getInitialContent(date).then(content => {
            setContent(content)
            setState('success')
        })
    }, [date])
    const debouncedUpdates = useDebouncedCallback(
        async (editor: EditorInstance) => {
            const json = editor.getJSON();
            setContent(json);
            await jewelLocalDb.setItem(date, json)
        },
        300
    );
    if (state === 'loading') {
        return [{ content: undefined, state: 'loading' }, debouncedUpdates] as const
    }
    return [{ content, state: 'success' }, debouncedUpdates] as const
}

export function Journal({ date }: JournalProps) {
    const [{ state, content }, debouncedUpdates] = useJournalEntry(date)
    const handleEditorUpdate = ({ editor }: EditorEvents['update']) => debouncedUpdates(editor)
    const todayDate = formatToday(date)
    return (
        <>
            <JournalHeader todayDate={todayDate} />
            {state === 'loading' ? null : (
                <JewelEditor initialContent={content} onUpdate={handleEditorUpdate} />
            )}
        </>
    )
}