import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import QuestionNodeView from "./question-node-view";

export const QuestionNode = Node.create({
  name: "questionNode",
  group: "block",
  atom: true,
  // addAttributes() {
  //   return {
  //     text: {
  //       default: "",
  //       isRequired: true,
  //     },
  //   };
  // },
  parseHTML() {
    return [{ tag: "question-node" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["question-node", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(QuestionNodeView);
  },
});
