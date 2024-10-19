import { Placeholder, StarterKit } from "novel/extensions";
import { slashCommand } from "./commands/slash-command";

export const defaultJewelEditorExtensions = [
  Placeholder.configure({
    emptyEditorClass:
      "before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",

    placeholder: `What’s on your mind today?\nIf you not sure where to start, use “/” to choose from a list of prompts`,
  }),
  StarterKit.configure(),
  slashCommand,
];
