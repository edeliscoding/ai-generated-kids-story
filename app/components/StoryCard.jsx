"use client";
import { useRouter } from "next/navigation";
import React from "react";

function StoryCard({ story }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col gap-3 pb-3 cursor-pointer hover:scale-105 duration-300"
      onClick={() => router.push(`/view-story/${story._id}`)}
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{
          backgroundImage: `url(${story.coverImage})`,
        }}
      />
      <div>
        <p className="text-[#1C1D22] text-base font-medium leading-normal">
          {/* {story.storySubject} */}
          {story.storyTitle}
        </p>
        <p className="text-[#3C3F4A] text-sm font-normal leading-normal">
          Available soon. Get notified.
        </p>
      </div>
    </div>
  );
}

export default StoryCard;
