import { JewelEditor } from "@/components/jewel-editor/editor";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { formatToday } from "@/lib/dates";

export default function EditorPage() {
  const journalEntry = {
    date: new Date(),
  };
  return (
    <div className="container mx-auto">
      <header className="flex flex-col gap-16 py-14">
        <div className="flex flex-wrap w-full items-center">
          <Logo />
          <div className="flex-1" />
          <div>
            <Button size="lg" type="button">
              Submit
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-3xl">
            {formatToday(journalEntry.date)}
          </h1>
        </div>
      </header>
      <JewelEditor />
    </div>
  );
}
