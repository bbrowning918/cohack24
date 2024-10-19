import { Logo } from "@/components/logo";
import Link from "next/link";
import { JournalEntries } from "./journal-entries";

export default function PreviousJournalEntriesPage() {
    return (
        <div className="container mx-auto">
            <header className="flex flex-col gap-16 pt-14 pb-5 sticky top-0 bg-gradient-to-b from-background from-95% to-transparent z-10">
            <div className="flex flex-wrap w-full items-center">
                <Logo />
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                <Link className="underline text-muted-foreground" href="/journal/previous">Previous Entries</Link>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-3xl">
                Previous Journal Entries
                </h1>
            </div>
            </header>
            <main>
                <JournalEntries />
            </main>
        </div>
    )
}