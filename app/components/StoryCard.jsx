"use client";
import { useRouter } from "next/navigation";
import React from "react";

function StoryCard({ story }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col gap-4 pb-3 cursor-pointer hover:scale-105 duration-300 w-full bg-slate-200 rounded-lg"
      onClick={() => router.push(`/view-story/${story._id}`)}
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{
          backgroundImage: `url(${story.coverImage})`,
        }}
      />
      <div>
        <p className="text-[#1C1D22] text-base font-medium leading-normal px-2">
          {/* {story.storySubject} */}
          {story.storyTitle}
        </p>
        <p className="text-[#3C3F4A] text-sm font-normal leading-normal px-2">
          Available soon. Get notified.
        </p>
      </div>
    </div>
  );
}

export default StoryCard;
