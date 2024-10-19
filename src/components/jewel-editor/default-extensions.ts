import { Placeholder, StarterKit } from "novel/extensions";

export const defaultJewelEditorExtensions = [
  StarterKit.configure(),
  Placeholder.configure({
    placeholder: `What’s on your mind today?\n\nIf you not sure where to start, use “/” to choose from a list of prompts`,
  }),
];
