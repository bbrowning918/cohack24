'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QuestionMark } from "@/components/icons/question-mark";
import type { JSONContent } from "novel";
import { defaultJewelEditorContent } from "@/components/jewel-editor/default-content";
import { useRouter } from "next/navigation";
import { completedEntriesDb, jewelLocalDb } from "@/lib/local-db";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import { ThumbsUp } from "@/components/icons/thumbs-up";
import Link from "next/link";

interface SaveButtonProps {
    date: string;
    content: JSONContent | undefined
    isCompleted?: boolean
} 

export function SaveButton({
    date,
    content,
    isCompleted = false,
}: SaveButtonProps) {
  const [loading, setLoading] = useState(false);

  const [dialogState, setDialogState] = useState("closed") 

    const router = useRouter()
    const submitEntry = async () => {
      const body = JSON.stringify({
        email: "delivered@resend.dev",
        content: content ?? defaultJewelEditorContent,
      })
      const res = await fetch('/api/saveEntry', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', {error: errorData.error, status: res.status});
        throw new Error(
          `Failed to save journal entry (${res.status}): ${
            errorData.error || 'Unknown error occurred'
          }`
        );
      }
  
      await jewelLocalDb().setItem(date, content)
      await completedEntriesDb().setItem(date, true)
      router.refresh();
      sendFeedback().then(() => {
        setLoading(false);
        router.push('/journal');
      });
    }


  async function sendFeedback() {
      try {
        setLoading(true);
        await fetch("/api/sendFeedbackEmail", {
          method: "POST",
          body: JSON.stringify({ firstName: "Test", email: "delivered@resend.dev" }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        setLoading(false)
      }
  }

  return (
        <Dialog
          open={dialogState !== 'closed'}
          onOpenChange={(value) => setDialogState(value ? 'open' : 'closed')}
        >
        <DialogTrigger asChild>
          <Button disabled={isCompleted} size="lg" type="button">
            Submit
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 items-center">
          {dialogState === 'open' ? (
            <>
              <QuestionMark />
              <DialogTitle>Are you sure you&#39;re done writing?</DialogTitle>
              <p>If you click submit, you can’t make any changes to your journal entry</p>
              <Button size="lg" type="button" onClick={submitEntry} onSubmit={() => {
                sendFeedback();
              }}>
                Submit
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  </Button>
              <Button variant={'link'} type="button" className="text-primary-foreground underline" onClick={() => setDialogState('closed')}>
                Keep Writing
              </Button>
            </>
          ) : dialogState === 'success' ? (
            <>
              <ThumbsUp />
              <DialogTitle>Well Done!</DialogTitle>
              <p>Your reflection today matters.<br />Keep building the habit—see you tomorrow!</p>
              <p className="mt-6">
                <Link className="underline text-[#2d2f28]" href="/journal/previous">View Previous Entries</Link>
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    )
}