import React from "react";
import { getAllStories } from "@/app/data/getAllStories";

import StoryCard from "../components/StoryCard";

async function ExporeStories() {
  const allStories = await getAllStories();
  return (
    <div className="container mx-auto px-40 py-8">
      <div className="grid grid-cols-3 gap-4">
        {allStories.map((story, index) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
}

export default ExporeStories;
