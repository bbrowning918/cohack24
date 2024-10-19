'use client';

import { formatTimestamp } from "@/lib/dates";
import { jewelLocalDb } from "@/lib/local-db";
import Link from "next/link";
import { useEffect, useState } from "react";

export function JournalEntries() {
    const [state, setState] = useState<'loading' | 'success'>('loading')
    const [entries, setEntries] = useState<{ formattedDate: string, timestamp: string }[]>([])
    useEffect(() => {
        async function getJournalEntries() {
            const journalEntries = await jewelLocalDb().keys()
            setEntries(journalEntries.map(timestamp => ({
                formattedDate: formatTimestamp(timestamp),
                timestamp
            })))
            setState('success')
        }
        getJournalEntries()
    }, [])

    if (state === 'loading') {
        return null
    }

    if (!entries.length) {
        return <div>No Journal Entries!</div>
    }

    return (
        <ul>
            {entries.map(entry => (
                <li key={entry.timestamp}>
                    <Link className="underline" href={`/journal/${encodeURIComponent(entry.timestamp)}`}>
                        {entry.formattedDate}
                    </Link>
                </li>
            ))}
        </ul>
    )
}