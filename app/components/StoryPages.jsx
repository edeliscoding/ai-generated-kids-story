import React, { useState } from "react";
import { SpeechPlayer } from "./SpeechPlayer";
function StoryPages({ storyChapter, pageNumber }) {
  return (
    <div className="flex flex-col min-h-full justify-between">
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {storyChapter?.chapter_title}
          </h2>
          <SpeechPlayer text={storyChapter?.description} />
        </div>
        <p className="text-base sm:text-lg md:text-xl p-4 sm:p-6 md:p-10 mt-3 rounded-lg bg-slate-100 w-full break-words max-w-3xl">
          {storyChapter?.description}
        </p>
      </div>
      <p className="text-center mt-auto">{pageNumber}</p>
    </div>
  );
}

export default StoryPages;
