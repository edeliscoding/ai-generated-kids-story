"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Bold, Italic, List } from "lucide-react";

const RichTextEditor = () => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const insertImage = () => {
    // In a real application, replace this with your actual image URL from the API
    const imageUrl = "/api/placeholder/640/360";
    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="border-b p-2 flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-slate-200" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-slate-200" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-slate-200" : ""}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={insertImage}>
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto container">
      <CardContent className="p-0">
        <MenuBar />
        <div className="p-4">
          <EditorContent
            editor={editor}
            className="min-h-[200px] prose max-w-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
