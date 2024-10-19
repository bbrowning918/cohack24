'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuestionMark } from "@/components/icons/question-mark";
import type { JSONContent } from "novel";
import { defaultJewelEditorContent } from "@/components/jewel-editor/default-content";
import { useRouter } from "next/navigation";
import { completedEntriesDb, jewelLocalDb } from "@/lib/local-db";
import { useState } from "react";

interface SaveButtonProps {
    date: string;
    content: JSONContent | undefined
}

export function SaveButton({
    date,
    content,
}: SaveButtonProps) {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const router = useRouter()
    const submitEntry = async () => {
      const body = JSON.stringify({
        content: content ?? defaultJewelEditorContent, 
      })
      const res = await fetch('/api/saveEntry', {
        method: 'POST',
        body,
      })
      await jewelLocalDb().setItem(date, content)
      await completedEntriesDb().setItem(date, true)
      if (res.ok) {
        return router.refresh()
      }
    }
    return (

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" type="button">
            Submit
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 items-center">
          <QuestionMark />
          <DialogTitle>Are you sure you're done writing?</DialogTitle>
          <p>If you click submit, you can’t make any changes to your journal entry</p>
          <Button size="lg" type="button" onClick={submitEntry}>
            Submit
          </Button>
          <Button variant={'link'} type="button" className="text-primary-foreground underline" onClick={() => setDialogOpen(false)}>
            Keep Writing
          </Button>
        </DialogContent>
      </Dialog>
    )
}