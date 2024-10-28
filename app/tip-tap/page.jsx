"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import axios from "axios";

import Link from "@tiptap/extension-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapImage from "@tiptap/extension-image";

import {
  ImagePlus,
  Check,
  RefreshCw,
  X,
  Image as ImageIcon,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  UnderlineIcon,
  List,
  LinkIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../context/authContext";

const TiptapEditor = ({ storyId }) => {
  // Initialize the editor with extended functionalities
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [story, setStory] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [selectedText, setSelectedText] = useState("");
  //   const [generatedImages, setGeneratedImages] = useState([]);

  // data to save in DB
  // 1. Gallery images
  // 2. Title
  // 3.
  console.log("gallery", gallery);
  const editorRef = useRef(null);
  const { user: userContext, error, updateUser } = useAuth();

  useEffect(() => {
    if (storyId) {
      loadStory(storyId);
    }
  }, [storyId]);

  const loadStory = async (id: string) => {
    try {
      const response = await axios.get(`/api/stories/${id}`);
      if (response.status === 200 && response.data) {
        const loadedStory = response.data;
        editor?.commands.setContent(loadedStory.content);
        setTitle(loadedStory.title);
        setGallery(loadedStory.gallery);
        setStory(loadedStory);
        setContent(loadedStory.content);
      }
    } catch (error) {
      console.error("Error loading story:", error);
    }
  };

  // Handle dropping images into the editor
  const handleDrop = (view, event, slice, moved) => {
    const { selection } = view.state;
    const position = selection.$head.pos;

    // Get the dragged data
    const imageData = event.dataTransfer.getData("image");

    if (imageData) {
      const imageUrl = JSON.parse(imageData).url;
      const transaction = view.state.tr.insert(
        position,
        view.state.schema.nodes.image.create({ src: imageUrl })
      );
      view.dispatch(transaction);
      return true;
    }
    return false;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapImage.configure({
        HTMLAttributes: {
          class: "draggable-image",
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editorProps: {
      handleDrop,
    },
    onUpdate: ({ editor }) => {
      setStory((prev) => ({ ...prev, content }));
    },
    shouldRerenderOnTransaction: false,
    immediatelyRender: true,
  });

  const handleDiscardImage = () => {
    setPreviewImage(null);
    setImagePrompt("");
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;

    setIsGenerating(true);
    // Simulate image generation with a placeholder
    try {
      // Simulate API call to image generation service
      const imageResponse = await axios.post("/api/story-editor-image", {
        prompt: imagePrompt,
      });

      if (imageResponse.status === 200) {
        const imageUrl = imageResponse?.data?.imageUrl;
        console.log("From flux-dev", imageUrl);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const newImage = {
          id: Date.now(),
          prompt: imagePrompt,
          // url: "/api/placeholder/512/512",
          url: imageUrl,
        };
        setCurrentImage(newImage);
        setShowImagePreview(true);
      } else {
        console.error("Error generating images:", imageResponse.data.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptImage = () => {
    if (currentImage) {
      setGallery([
        ...gallery,
        {
          id: Date.now(),
          url: currentImage.url,
          prompt: imagePrompt,
        },
      ]);
      //   setPreviewImage(imageUrl);
      setImagePrompt("");
    }
  };

  // New handlers for content updates
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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

  // Modified Gallery Item component with drag functionality
  const GalleryItem = ({ image }) => {
    const handleDragStart = (e) => {
      // Set the drag data
      e.dataTransfer.setData("image", JSON.stringify(image));
      e.dataTransfer.effectAllowed = "copy";
    };

    return (
      <div
        className="relative group cursor-move"
        draggable="true"
        onDragStart={handleDragStart}
        title={image.prompt}
      >
        <img
          src={image.url}
          alt="Gallery item"
          className="w-full h-24 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg" />
      </div>
    );
  };

  // const saveStory = async () => {
  //   try {
  //     const storyData = {
  //       title: title, // You'll need to add a title field to your UI
  //       content: editor.getHTML(), // Get content from Tiptap
  //       gallery: gallery, // Your existing gallery state
  //       status: "draft",
  //       // Add author ID from your auth system
  //       // author: currentUser._id,
  //       author: userContext._id,
  //     };

  //     console.log("Saving story:", storyData);
  //     const response = await axios.post("/api/stories", storyData);

  //     if (response.status === 200) {
  //       // Handle successful save
  //       console.log("Story saved successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error saving story:", error);
  //   }
  // };

  const saveStory = async () => {
    try {
      const storyData = {
        title: title,
        content: editor.getHTML(),
        gallery: gallery,
        status: "draft",
        author: userContext._id,
      };

      const response = await axios.put(`/api/stories/${storyId}`, storyData);

      if (response.status === 200) {
        console.log("Story saved successfully");
        setStory(response.data);
      }
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  const loadStory = async (storyId) => {
    try {
      const response = await axios.get(`/api/stories/${storyId}`);

      if (response.status === 200) {
        const loadedStory = response.data;

        // Set the editor content
        editor?.commands.setContent(loadedStory.content);

        // Restore the gallery
        setGallery(loadedStory.gallery);

        // Set other story data
        setStory({
          title: loadedStory.title,
          // ... other story fields
        });
      }
    } catch (error) {
      console.error("Error loading story:", error);
    }
  };

  // Optional: Add auto-save functionality
  useEffect(() => {
    if (!editor) return;

    const autoSaveInterval = setInterval(() => {
      if (editor.getHTML() !== content) {
        saveStory();
        setContent(editor.getHTML());
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [editor, content]);

  return (
    <div className="container max-w-7xl mx-auto p-4 flex gap-4">
      <div className="flex flex-col w-2/3">
        <CardHeader>
          {/* <CardTitle>My Enhanced Tiptap Editor</CardTitle> */}
          <Button onClick={saveStory} className="w-24 self-end">
            Save Story
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Story Title"
              value={title}
              onChange={handleTitleChange}
              className="text-xl font-bold"
            />
            <div className="flex flex-wrap gap-2 mb-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={!editor?.can().chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={!editor?.can().chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                disabled={
                  !editor?.can().chain().focus().toggleUnderline().run()
                }
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editor?.chain().focus().toggleLink().run()}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            {editor && (
              <div className="border rounded-md p-4 min-h-[200px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <EditorContent editor={editor} className="prose max-w-none" />
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        {/* Image Generation Card */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Generate Image</label>
              <div className="flex gap-2">
                <Textarea
                  className="w-full"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image..."
                  disabled={isGenerating}
                  row={5}
                />
                <Button
                  onClick={handleGenerateImage}
                  disabled={!imagePrompt || isGenerating}
                >
                  <ImagePlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            {showImagePreview && (
              <div className="space-y-2">
                <div className="relative">
                  <img
                    src={currentImage?.url}
                    // src="https://replicate.delivery/yhqm/mCgrnUF8EoaeJyBxsHMD6xqR5RYxfSqPi7e3dylYtMXneZrOB/out-0.png"
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                  <div className="absolute bottom-0 right-2 flex gap-1 mt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleAcceptImage}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleGenerateImage}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleDiscardImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Image Gallery with draggable items */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-4">
            <div className="font-medium mb-2 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Gallery (Drag images to editor)
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[400px]">
              {gallery.map((image) => (
                <GalleryItem key={image.id} image={image} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TiptapEditor;
