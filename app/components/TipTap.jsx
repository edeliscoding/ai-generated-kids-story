"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import axios from "axios";
import { getAutocompleteSuggestion } from "@/app/utils/autocomplete";

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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TiptapEditor = ({
  storyId,
  initialContent = "",
  initialTitle = "",
  initialGallery = [],
}) => {
  // Initialize the editor with extended functionalities
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [imagePrompt, setImagePrompt] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [gallery, setGallery] = useState(initialGallery);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [story, setStory] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("content", content);
  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [selectedText, setSelectedText] = useState("");
  //   const [generatedImages, setGeneratedImages] = useState([]);

  // data to save in DB
  // 1. Gallery images
  // 2. Title
  // 3.
  const router = useRouter();
  console.log("gallery", gallery);
  const editorRef = useRef(null);
  const { user: userContext, error, updateUser } = useAuth();

  const loadStory = async (id) => {
    try {
      const response = await axios.get(`/api/stories/${id}`);
      if (response.status === 200 && response.data) {
        const loadedStory = response.data;
        console.log("loadedStory on single story", loadedStory);
        editor?.commands.setContent(loadedStory.content);
        setTitle(loadedStory.title);
        setGallery(loadedStory.gallery);
        setStory(loadedStory);
        // setContent(loadedStory.content);
        setContent(loadedStory.content);
      }
    } catch (error) {
      console.error("Error loading story:", error);
    }
  };

  //   useEffect(() => {
  //     if (editor && content) {
  //       editor.chain().focus().setContent(loadedStory.content).run();
  //     }
  //   }, [editor, loadedStory.content]);
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
      //   Image.extend({
      //     addAttributes() {
      //       return {
      //         ...this.parent?.(),
      //         width: {
      //           default: "auto",
      //         },
      //         height: {
      //           default: "auto",
      //         },
      //       };
      //     },
      //   }),
      ImageResize,
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
    // onUpdate: ({ editor }) => {
    //   setStory((prev) => ({ ...prev, content }));
    // },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
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

  // // Function to call the AI API to fetch the completion text
  // const fetchAIText = async (content) => {
  //   try {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         prompt: content,
  //         max_tokens: 50,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.OPENAI_KEY}`,
  //         },
  //       }
  //     );
  //     return response.data.choices[0].text;
  //   } catch (error) {
  //     console.error("Error fetching AI text:", error);
  //     return "";
  //   }
  // };
  // // Magic Wand button handler to insert AI-generated text
  // const handleMagicWand = useCallback(async () => {
  //   if (!editor) return;

  //   // Get current editor content as plain text
  //   const currentText = editor.getText();

  //   // Fetch AI-generated text based on current content
  //   const aiText = await fetchAIText(currentText);

  //   // Insert AI text at the current cursor position
  //   if (aiText) {
  //     editor.chain().focus().insertContent(aiText).run();
  //   }
  // }, [editor]);

  const handleAutoComplete = useCallback(async () => {
    if (!editor || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const { suggestion } = await response.json();
      if (editor) {
        editor.chain().focus().insertContent(suggestion).run();
      }
    } catch (error) {
      console.error("Error generating auto-completion:", error);
    } finally {
      setIsLoading(false);
    }
  }, [editor, content, isLoading]);

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  useEffect(() => {
    if (storyId) {
      loadStory(storyId);
    }
  }, [storyId]);
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

  const saveStory = async () => {
    try {
      const storyData = {
        title: title,
        content: editor.getHTML(),
        gallery: gallery,
        status: "draft",
        // In a real app, you'd get the userId from the session
        author: userContext._id,
      };

      let response;
      if (storyId) {
        response = await axios.put(`/api/stories/${storyId}`, storyData);
      } else {
        response = await axios.post("/api/stories", storyData);
      }

      if (response.status === 201) {
        console.log("Story saved successfully");
        toast.success("Story Updated Successfully");
        setStory(response.data);
        if (!storyId) {
          toast.success("Story Saved Successfuly");
          router.push(`/stories/${response.data._id}`);
        }
      }
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };
  // save every 30 seconds
  //   useEffect(() => {
  //     if (!editor) return;

  //     const autoSaveInterval = setInterval(() => {
  //       if (editor.getHTML() !== content) {
  //         saveStory();
  //         setContent(editor.getHTML());
  //       }
  //     }, 30000); // Auto-save every 30 seconds

  //     return () => clearInterval(autoSaveInterval);
  //   }, [editor, content]);

  return (
    <div className="container max-w-7xl mx-auto p-4 flex gap-4">
      <div className="flex flex-col w-2/3">
        <CardHeader>
          {/* <CardTitle>My Enhanced Tiptap Editor</CardTitle> */}
          <Button onClick={saveStory} className="w-24 self-end">
            {storyId ? "Edit Story" : "Save Story"}
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

              {/* <Button
                data-tooltip-target="magic-wand"
                onClick={handleAutoComplete}
                className="self-end bg-yellow-500 hover:bg-yellow-600 ml-auto"
              >
                ✨ Magic Wand ✨
              </Button>
              <div
                id="magic-wand"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Tooltip content
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div> */}
              <div className="relative group inline-block ml-auto">
                <button
                  className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600  rounded-md"
                  onClick={handleAutoComplete}
                >
                  ✨ Magic Wand ✨
                </button>

                <div class="absolute left-15 bottom-full mb-2 w-max px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 transition-opacity duration-300 transform -translate-x-1/2 group-hover:opacity-100">
                  Auto-complete your text
                </div>
              </div>
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
