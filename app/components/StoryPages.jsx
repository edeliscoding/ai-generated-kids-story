import React from "react";

function StoryPages({ storyChapter }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">
        {storyChapter?.chapter_title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl p-4 sm:p-6 md:p-10 mt-3 rounded-lg bg-slate-100 w-full break-words max-w-3xl">
        {storyChapter?.description}
      </p>
    </div>
  );
}

export default StoryPages;
