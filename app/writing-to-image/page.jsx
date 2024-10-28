"use client";
// import React, { useState, useRef } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Camera, RotateCw, Check, X, Settings, ImagePlus } from "lucide-react";

// const DirectWritingFlow = () => {
//   const [story, setStory] = useState("");
//   const [selectedText, setSelectedText] = useState("");
//   const [generatedImages, setGeneratedImages] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showImagePreview, setShowImagePreview] = useState(false);
//   const [currentImage, setCurrentImage] = useState(null);
//   const editorRef = useRef(null);

//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     const text = selection.toString().trim();
//     if (text) {
//       setSelectedText(text);
//       setShowImagePreview(false);
//     }
//   };

//   const generateImage = async () => {
//     setIsGenerating(true);
//     try {
//       // Simulate API call to image generation service
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       const newImage = {
//         id: Date.now(),
//         prompt: selectedText,
//         url: "/api/placeholder/512/512",
//       };
//       setCurrentImage(newImage);
//       setShowImagePreview(true);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const acceptImage = () => {
//     if (currentImage) {
//       setGeneratedImages((prev) => [...prev, currentImage]);
//       insertImageIntoStory(currentImage);
//       resetImageGeneration();
//     }
//   };

//   const insertImageIntoStory = (image) => {
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       const img = document.createElement("img");
//       img.src = image.url;
//       img.className = "max-w-md my-4 rounded-lg mx-auto block";
//       img.alt = image.prompt;

//       range.deleteContents();
//       range.insertNode(img);
//     }
//   };

//   const resetImageGeneration = () => {
//     setCurrentImage(null);
//     setShowImagePreview(false);
//     setSelectedText("");
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex gap-4">
//       {/* Main Editor */}
//       <div className="flex-1">
//         <Card className="min-h-[800px]">
//           <CardHeader>
//             <CardTitle>Story Editor</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div
//               ref={editorRef}
//               contentEditable
//               className="min-h-[700px] p-4 border rounded-lg focus:outline-none focus:ring-2 prose max-w-none"
//               onMouseUp={handleTextSelection}
//               onKeyUp={handleTextSelection}
//               onInput={(e) => setStory(e.currentTarget.innerHTML)}
//             />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Sidebar */}
//       <div className="w-80">
//         {/* Text Selection Panel */}
//         <Card className="mb-4">
//           <CardHeader>
//             <CardTitle>Selected Text</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {selectedText ? (
//               <>
//                 <Alert className="mb-4">
//                   <AlertDescription>{selectedText}</AlertDescription>
//                 </Alert>
//                 <Button
//                   className="w-full mb-2"
//                   onClick={generateImage}
//                   disabled={isGenerating}
//                 >
//                   {isGenerating ? (
//                     <>
//                       <RotateCw className="w-4 h-4 mr-2 animate-spin" />
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <Camera className="w-4 h-4 mr-2" />
//                       Generate Image
//                     </>
//                   )}
//                 </Button>
//               </>
//             ) : (
//               <p className="text-gray-500 text-sm">
//                 Highlight text in your story to generate an image
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         {/* Image Preview */}
//         {showImagePreview && currentImage && (
//           <Card className="mb-4">
//             <CardHeader>
//               <CardTitle>Preview</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img
//                 src={currentImage.url}
//                 alt={currentImage.prompt}
//                 className="w-full rounded-lg mb-4"
//               />
//               <div className="flex gap-2">
//                 <Button
//                   className="flex-1"
//                   variant="outline"
//                   onClick={generateImage}
//                 >
//                   <RotateCw className="w-4 h-4 mr-2" />
//                   Regenerate
//                 </Button>
//                 <Button className="flex-1" onClick={acceptImage}>
//                   <Check className="w-4 h-4 mr-2" />
//                   Accept
//                 </Button>
//                 <Button variant="outline" onClick={resetImageGeneration}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Generated Images Gallery */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Generated Images</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {generatedImages.map((image) => (
//                 <div key={image.id} className="space-y-2">
//                   <img
//                     src={image.url}
//                     alt={image.prompt}
//                     className="w-full rounded-lg"
//                   />
//                   <p className="text-sm text-gray-500 truncate">
//                     {image.prompt}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DirectWritingFlow;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Camera,
  RotateCw,
  Check,
  X,
  Maximize2,
  Download,
  X as Close,
  Save,
} from "lucide-react";

const ImageLightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl w-full bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Image Preview</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Close className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="p-4">
          <div className="relative aspect-video">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Prompt Text */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Generated from:</h4>
            <p className="text-gray-600">{image.prompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DirectWritingFlow = () => {
  //   const [story, setStory] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const editorRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const autoSaveTimeout = useRef(null);

  console.log("current image", currentImage);

  const [story, setStory] = useState({
    id: null,
    title: "",
    content: "",
    images: [],
    lastSaved: null,
    status: "draft",
  });
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text) {
      setSelectedText(text);
      setShowImagePreview(false);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to image generation service
      const imageResponse = await axios.post("/api/story-editor-image", {
        prompt: selectedText,
      });
      // console.log(imageResponse?.data?.imageUrls);
      //   console.log("from page", imageResponse?.data);
      //   console.log("imageResponse", imageResponse);

      if (imageResponse.status === 200) {
        const imageUrl = imageResponse?.data?.imageUrl;
        console.log("From flux-dev", imageUrl);
        // console.log(imageUrls); // Use the generated image URLs
      } else {
        console.error("Error generating images:", imageResponse.data.error);
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newImage = {
        id: Date.now(),
        prompt: selectedText,
        // url: "/api/placeholder/512/512",
        url: imageUrl,
      };
      setCurrentImage(newImage);
      setShowImagePreview(true);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const acceptImage = () => {
    if (currentImage) {
      setGeneratedImages((prev) => [...prev, currentImage]);
      insertImageIntoStory(currentImage);
      resetImageGeneration();
    }
  };

  const insertImageIntoStory = (image) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = document.createElement("div");
      container.className = "relative my-4 text-center";

      const img = document.createElement("img");
      img.src = `"${image.url}"`;
      img.className =
        "max-w-md rounded-lg mx-auto cursor-pointer hover:opacity-95 transition-opacity";
      img.alt = image.prompt;
      img.onclick = () => setLightboxImage(image);

      const expandButton = document.createElement("button");
      expandButton.className =
        "absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow hover:bg-white transition-colors";
      expandButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
        </svg>
      `;
      expandButton.onclick = () => setLightboxImage(image);

      container.appendChild(img);
      container.appendChild(expandButton);

      range.deleteContents();
      range.insertNode(container);
    }
  };

  const resetImageGeneration = () => {
    setCurrentImage(null);
    setShowImagePreview(false);
    setSelectedText("");
  };

  const handleImageClick = (image) => {
    setLightboxImage(image);
  };

  useEffect(() => {
    const loadStory = async () => {
      const storyId = new URLSearchParams(window.location.search).get("id");
      if (storyId) {
        try {
          const response = await fetch(`/api/stories/${storyId}`);
          const data = await response.json();
          setStory(data);
        } catch (error) {
          console.error("Error loading story:", error);
        }
      }
    };

    loadStory();
  }, []);

  // Autosave functionality
  useEffect(() => {
    const autoSave = async () => {
      if (story.content && story.id) {
        try {
          await saveStory({ ...story, isAutosaved: true });
          setSaveStatus("Autosaved");
        } catch (error) {
          console.error("Autosave failed:", error);
        }
      }
    };

    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }

    autoSaveTimeout.current = setTimeout(autoSave, 30000); // Autosave every 30 seconds

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [story.content]);

  const saveStory = async (storyData) => {
    setIsSaving(true);
    try {
      const method = storyData.id ? "PUT" : "POST";
      const url = storyData.id
        ? `/api/stories/${storyData.id}`
        : "/api/stories";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyData),
      });

      const savedStory = await response.json();

      setStory(savedStory);
      setSaveStatus("Saved successfully");
      return savedStory;
    } catch (error) {
      console.error("Error saving story:", error);
      setSaveStatus("Error saving");
      throw error;
    } finally {
      setIsSaving(false);
      // Clear save status after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleSave = async () => {
    await saveStory(story);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 flex gap-4">
        {/* Main Editor */}
        <div className="flex-1">
          {/* <img src="https://replicate.delivery/yhqm/QhznTflg2RxhW6sRQZjwyf2wR7xRMQC73wEqoPf8vAjTAmVnA/out-0.png" /> */}
          <Card className="min-h-[800px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-2">
                <CardTitle>Story Editor</CardTitle>
                {saveStatus && (
                  <span className="text-sm text-gray-500">
                    {saveStatus}{" "}
                    {story.lastSaved &&
                      `at ${new Date(story.lastSaved).toLocaleTimeString()}`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="gap-2"
                >
                  {isSaving ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[700px] p-4 border rounded-lg focus:outline-none focus:ring-2 prose max-w-none"
                onMouseUp={handleTextSelection}
                onKeyUp={handleTextSelection}
                onInput={(e) => setStory(e.currentTarget.innerHTML)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80">
          {/* Text Selection Panel */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Selected Text</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedText ? (
                <>
                  <Alert className="mb-4">
                    <AlertDescription>{selectedText}</AlertDescription>
                  </Alert>
                  <Button
                    className="w-full mb-2"
                    onClick={generateImage}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Highlight text in your story to generate an image
                </p>
              )}
            </CardContent>
          </Card>

          {/* Image Preview */}
          {showImagePreview && currentImage && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={currentImage.url}
                    alt={currentImage.prompt}
                    className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => handleImageClick(currentImage)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 bg-white/90"
                    onClick={() => handleImageClick(currentImage)}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={generateImage}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button className="flex-1" onClick={acceptImage}>
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button variant="outline" onClick={resetImageGeneration}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Images Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedImages.map((image) => (
                  <div key={image.id} className="space-y-2">
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => handleImageClick(image)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 bg-white/90"
                        onClick={() => handleImageClick(image)}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {image.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
};

export default DirectWritingFlow;
