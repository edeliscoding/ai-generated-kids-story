import React from "react";

function StoryPages({ storyChapter }) {
  return (
    <div>
      <h2 className="text-2xl fontbold text-primary">
        {storyChapter?.chapter_title}
      </h2>
      <p className="text-xl p-10 mt-3 rounded-lg bg-slate-100 ">
        {storyChapter?.description}
      </p>
    </div>
  );
}

export default StoryPages;
