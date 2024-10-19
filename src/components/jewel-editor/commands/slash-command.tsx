import { Blocks } from "lucide-react";
import type { EditorInstance } from "novel";
import type { Range } from '@tiptap/core'
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

const insertPreset = (content: string, editor: EditorInstance, range: Range) => {
  editor
    .chain()
    .focus()
    .deleteRange(range)
    .setNode("heading", { level: 4 })
    .insertContent(
      content
    )
    .focus('end')
    .insertContent({ type: "paragraph" })
    .run();
}

export const suggestionItems = createSuggestionItems([
  {
    title:
      "What tasks did you complete today, and what could you improve for tomorrow?",
    description: "Question Preset",
    searchTerms: ["what", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => insertPreset("What tasks did you complete today, and what could you improve for tomorrow?", editor, range),
  },
  {
    title: "Did you encounter any distractions, and how did you manage them?",
    description: "Question Preset",
    searchTerms: ["did", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => insertPreset("Did you encounter any distractions, and how did you manage them?", editor, range)
  },
  {
    title:
      "What are three things that went well today, and how can you replicate that success?",
    description: "Question Preset",
    searchTerms: ["what", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => insertPreset("What are three things that went well today, and how can you replicate that success?", editor, range),
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
