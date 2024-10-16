import React from "react";
import { getMyStories } from "@/app/data/getMyStories";
import MyStoriesCard from "../components/MyStoriesCard";

async function Dashboard() {
  const myStories = await getMyStories();
  console.log("myStories", myStories);
  if (!myStories) {
    return <div>No stories found</div>;
  }
  return (
    <>
      <div
        className="relative flex size-full min-h-screen flex-col bg-[#F9FAFA] group/design-root overflow-x-hidden"
        // style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <h1 className="text-[#1C1D22] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
                My Stories
              </h1>
              <div className="flex gap-3 p-3 flex-wrap pr-4">
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#EEEFF2] pl-4 pr-4">
                  <p className="text-[#1C1D22] text-sm font-medium leading-normal">
                    3 Credit Left
                  </p>
                </div>
              </div>
              {/* {insert cards here} */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-5 p-4">
                {myStories.map((story) => (
                  <MyStoriesCard key={story._id} story={story} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {myStories.map((story) => (
        <MyStoriesCard key={story._id} story={story} />
      ))} */}
    </>
  );
}

export default Dashboard;
