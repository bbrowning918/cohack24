import { Journal } from "./journal";

export default function JournalPage() {
  const journalEntry = {
    date: "2024-10-19T16:38:23.867Z",
  };
  return (
    <div className="container mx-auto">
      <Journal date={journalEntry.date} />
    </div>
  );
}
