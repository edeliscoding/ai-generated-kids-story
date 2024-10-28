// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import axios from "axios";
import TiptapEditor from "@/app/components/TipTap";
import getCustomStory from "@/app/data/getCustomStory";

export default async function EditStoryPage({ params }) {
  // const params = useParams();

  const storyId = params.id;
  // const [story, setStory] = useState(null);
  // const [loading, setLoading] = useState(true);

  const story = await getCustomStory(storyId);
  console.log("story from stories id, single", story);

  if (!story) {
    return (
      <div className="text-red-500 mx-auto container">Loading Story..</div>
    );
  }

  // useEffect(() => {
  //   const fetchStory = async () => {
  //     try {
  //       const response = await axios.get(`/api/stories/${storyId}`);
  //       if (response.data) {
  //         setStory(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching story:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (storyId) {
  //     fetchStory();
  //   }
  // }, [storyId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!story) {
  //   return <div>Story not found</div>;
  // }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Story</h1>
      <TiptapEditor
        storyId={storyId}
        initialContent={story.content}
        initialTitle={story.title}
        initialGallery={story.gallery}
      />
    </div>
  );
}
