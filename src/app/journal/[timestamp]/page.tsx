import { Journal } from "../journal";

interface JournalEntryPageProps {
    params: {
        timestamp: string;
    }
}

export default function JournalEntryPage({ params }: JournalEntryPageProps) {
    return (
        <div className="container mx-auto">
            <Journal date={decodeURIComponent(params.timestamp)} />
        </div>
    )
}