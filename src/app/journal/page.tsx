import { Journal } from "./journal";

export default function JournalPage() {
  const journalEntry = {
    date: new Date().toISOString(),
  };
  return (
    <div className="container mx-auto">
      <Journal date={journalEntry.date} />
    </div>
  );
}
