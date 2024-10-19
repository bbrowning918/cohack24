"use client";

import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { JSONContent, AnyExtension } from "@tiptap/core";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from "novel";
import type { EditorInstance } from "novel";
import { useState } from "react";
import { defaultJewelEditorContent } from "./default-content";
import { defaultJewelEditorExtensions } from "./default-extensions";
import { suggestionItems } from "./commands/slash-command";
import { handleCommandNavigation } from "novel/extensions";

interface JewelEditorProps {
  initialContent?: JSONContent;
  extensions?: AnyExtension[];
}

export function JewelEditor({
  extensions = [],
  initialContent = defaultJewelEditorContent,
}: JewelEditorProps) {
  const [content, setContent] = useState(initialContent);
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
    },
    500
  );
  return (
    <EditorRoot>
      <EditorContent
        editorProps={{
          attributes: {
            class:
              "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
          },
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
        }}
        extensions={extensions.concat(defaultJewelEditorExtensions)}
        immediatelyRender={false}
        initialContent={content}
        onUpdate={({ editor }) => debouncedUpdates(editor)}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] w-[333px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 min-w-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
}
