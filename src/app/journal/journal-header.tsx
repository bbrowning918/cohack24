'use client';

import { Logo } from "@/components/logo";
import type { JSONContent } from "novel";
import { formatToday } from "@/lib/dates";
import { SaveButton } from "./save-button";

interface JournalHeaderProps {
    date: string;
    content: JSONContent | undefined
}

export function JournalHeader({ content, date }: JournalHeaderProps) {
  const todayDate = formatToday(date)
    return (
      <header className="flex flex-col gap-16 pt-14 pb-5 sticky top-0 bg-gradient-to-b from-background from-95% to-transparent z-10">
      <div className="flex flex-wrap w-full items-center">
        <Logo />
        <div className="flex-1" />
        <div>
          <SaveButton content={content} date={date} />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-3xl">
          {todayDate}
        </h1>
      </div>
    </header>
    )
}