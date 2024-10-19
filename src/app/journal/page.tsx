import { JournalHeader } from "./journal-header";
import { formatToday } from "@/lib/dates";
import { JournalEditor } from "./journal-editor";

export default function JournalPage() {
  const journalEntry = {
    date: new Date(),
  };
  const todayDate = formatToday(journalEntry.date)
  return (
    <div className="container mx-auto">
      <JournalHeader todayDate={todayDate} />
      <JournalEditor todayDate={todayDate}  />
    </div>
  );
}
