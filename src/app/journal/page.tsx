import { QuestionMark } from "@/components/icons/question-mark";
import { JewelEditor } from "@/components/jewel-editor/editor";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatToday } from "@/lib/dates";

export default function JournalPage() {
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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" type="button">
                  Submit
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-4 items-center">
                <QuestionMark />
                <DialogTitle>Are you sure you're done writing?</DialogTitle>
                <p>If you click submit, you can’t make any changes to your journal entry</p>
                <Button size="lg" type="button">
                  Submit
                </Button>
                <Button variant={'link'} type="button" className="text-primary-foreground underline">
                  Keep Writing
                </Button>
              </DialogContent>
            </Dialog>
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
