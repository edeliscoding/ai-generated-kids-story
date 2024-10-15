import React from "react";

const StoryChapters = ({ story }) => {
  // Parse the JSON string in the output field
  const parsedOutput = JSON.parse(story.output);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{parsedOutput.storyname}</h2>
      {parsedOutput.chapters.map((chapter, index) => (
        <div key={index} className="border p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{chapter.chapter_title}</h3>
          <p className="mt-2">{chapter.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryChapters;
