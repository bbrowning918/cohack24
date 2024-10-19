import { List, ListOrdered, Text, TextQuote, Blocks } from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

export const suggestionItems = createSuggestionItems([
  {
    title:
      "What tasks did you complete today, and what could you improve for tomorrow?",
    description: "Question Preset",
    searchTerms: ["what", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 4 })
        .insertContent(
          "What tasks did you complete today, and what could you improve for tomorrow?\n"
        )
        .run();
    },
  },
  {
    title: "Did you encounter any distractions, and how did you manage them?",
    description: "Question Preset",
    searchTerms: ["did", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 4 })
        .insertContent(
          "Did you encounter any distractions, and how did you manage them?\n"
        )
        .run();
    },
  },
  {
    title:
      "What are three things that went well today, and how can you replicate that success?",
    description: "Question Preset",
    searchTerms: ["what", "ai"],
    icon: <Blocks size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 4 })
        .insertContent(
          "What are three things that went well today, and how can you replicate that success?\n"
        )
        .run();
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
