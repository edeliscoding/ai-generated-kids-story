import React from "react";

import { getOwnCustomStories } from "../data/getOwnCustomStories";
import Link from "next/link";

export default async function CustomStoriesPage() {
  const customStories = await getOwnCustomStories();
  console.log("custom stories", customStories);
  return (
    <div className="container mx-auto mt-10">
      {customStories.length > 0
        ? customStories.map((story) => (
            <div key={story._id}>
              <Link href={`/tip-tap/${story._id}`}>{story.title}</Link>
            </div>
          ))
        : "No custom stories found"}
    </div>
  );
}
