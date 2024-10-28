"use client";

import TiptapEditor from "@/app/components/TipTap";

export default function NewStoryPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Story</h1>
      <TiptapEditor />
    </div>
  );
}
