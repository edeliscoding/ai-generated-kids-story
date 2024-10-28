// Import React, Tiptap, and Tiptap’s StarterKit
"use client";
// Import React, Tiptap, and the required extensions
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

const TiptapEditor = () => {
  // Initialize the editor with extended functionalities
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false, // Prevent link from opening in a new tab when clicked
      }),
    ],
    content: `
      <h2>Enhanced Tiptap Editor</h2>
      <p>Try out additional functionalities like bold, italic, underline, lists, links, and images!</p>
    `,
  });

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  // Editor toolbar with basic controls for bold, italic, underline, etc.
  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("Enter the URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    // <div>
    //   <h1>My Enhanced Tiptap Editor</h1>

    //   {/* Toolbar */}
    //   <div className="toolbar">
    //     <button
    //       onClick={() => editor.chain().focus().toggleBold().run()}
    //         disabled={!editor.can().chain().focus().toggleBold().run()}
    //     >
    //       Bold
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleItalic().run()}
    //       disabled={!editor.can().chain().focus().toggleItalic().run()}
    //     >
    //       Italic
    //     </button>
    //     <button
    //       onClick={() => editor.chain().focus().toggleUnderline().run()}
    //       disabled={!editor.can().chain().focus().toggleUnderline().run()}
    //     >
    //       Underline
    //     </button>
    //     <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
    //       Bullet List
    //     </button>
    //     <button onClick={() => addImage()}>Add Image</button>
    //     <button onClick={() => addLink()}>Add Link</button>
    //   </div>

    //   {/* Editor Content */}
    //   <EditorContent editor={editor} />
    // </div>
    <div className="container mx-auto">
      <h1>My Enhanced Tiptap Editor</h1>

      {/* Toolbar */}
      <div className="toolbar">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          disabled={!editor?.can().chain().focus().toggleUnderline().run()}
        >
          Underline
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button onClick={() => addImage()}>Add Image</button>
        <button onClick={() => addLink()}>Add Link</button>
      </div>

      {/* Render EditorContent only if editor is initialized */}
      {editor && <EditorContent editor={editor} />}
    </div>
  );
};

export default TiptapEditor;
