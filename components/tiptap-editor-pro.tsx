"use client";

import RichTextEditor, { BaseKit } from "reactjs-tiptap-editor";
import { Blockquote } from "reactjs-tiptap-editor/blockquote";
import { Bold } from "reactjs-tiptap-editor/bold";
import { BulletList } from "reactjs-tiptap-editor/bulletlist";
import { Clear } from "reactjs-tiptap-editor/clear";
import { Code } from "reactjs-tiptap-editor/code";
import { CodeBlock } from "reactjs-tiptap-editor/codeblock";
import { Color } from "reactjs-tiptap-editor/color";
import { ColumnActionButton } from "reactjs-tiptap-editor/multicolumn";
import { Emoji } from "reactjs-tiptap-editor/emoji";
import { FontFamily } from "reactjs-tiptap-editor/fontfamily";
import { FontSize } from "reactjs-tiptap-editor/fontsize";
import { Heading } from "reactjs-tiptap-editor/heading";
import { Highlight } from "reactjs-tiptap-editor/highlight";
import { History } from "reactjs-tiptap-editor/history";
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Image } from "reactjs-tiptap-editor/image";
import { Indent } from "reactjs-tiptap-editor/indent";
import { Italic } from "reactjs-tiptap-editor/italic";
import { LineHeight } from "reactjs-tiptap-editor/lineheight";
import { Link } from "reactjs-tiptap-editor/link";
import { OrderedList } from "reactjs-tiptap-editor/orderedlist";
import { SlashCommand } from "reactjs-tiptap-editor/slashcommand";
import { Strike } from "reactjs-tiptap-editor/strike";
import { Table } from "reactjs-tiptap-editor/table";
import { TaskList } from "reactjs-tiptap-editor/tasklist";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Video } from "reactjs-tiptap-editor/video";
import "reactjs-tiptap-editor/style.css";

interface TiptapEditorProProps {
  content: string;
  onChange: (content: string) => void;
}

// Optimized extensions - keep essential ones only
const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: null, // Remove character limit
    },
  }),
  History,
  Clear,
  FontFamily,
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  Color.configure({ spacer: true }),
  Highlight,
  Heading.configure({ spacer: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  BulletList,
  OrderedList,
  TaskList,
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code,
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  ColumnActionButton,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(files);
      });
    },
  }),
  Video.configure({
    upload: (file: File) => {
      return new Promise((resolve) => {
        resolve(URL.createObjectURL(file));
      });
    },
  }),
  Table,
  Emoji,
];

export function TiptapEditorPro({ content, onChange }: TiptapEditorProProps) {
  return (
    <div className="w-full min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden border border-gray-200">
      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={(html) => onChange(html)}
        extensions={extensions}
        dark={false}
      />
    </div>
  );
}
