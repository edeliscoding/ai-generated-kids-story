"use client";
import BookCover from "@/app/components/BookCover";

import StoryPages from "@/app/components/StoryPages";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { set } from "mongoose";

export default function StoryComponent() {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const bookRef = useRef();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { id } = useParams();
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/story/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch story");
        }
        const data = await response.json();
        // console.log("story", data);
        setStory(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStory();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!story) return <div>Loading...</div>;

  const storyChapterParsed = JSON.parse(story?.output);
  // Handle page flip event
  // const onPageFlip = () => {
  //   const pageIndex = bookRef.current.pageFlip().getCurrentPageIndex();
  //   // alert("page Index", pageIndex);
  //   // setCurrentPage(pageIndex);
  //   // alert("Page Flipped");
  // };
  return (
    <div className="mt-10 mx-auto container">
      <h2 className="font-bold text-4xl text-center">{story?.storySubject}</h2>
      <div className="mt-10 relative">
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-10 HTMLFlipBook"
          useMouseEvents={false}
          ref={bookRef}
          // onFlip={onPageFlip} // Trigger event when flipping the page
        >
          <div>
            <BookCover imageUrl={story?.coverImage} />
          </div>
          {[...Array(storyChapterParsed?.chapters?.length)].map(
            (item, index) => (
              <div className="bg-white p-2 md:p-10 border">
                <StoryPages
                  pageNumber={index + 1}
                  // isPageActive={currentPage === index}
                  storyChapter={storyChapterParsed?.chapters[index]}
                />
              </div>
            )
          )}
        </HTMLFlipBook>
        {count !== 0 && (
          <div className="absolute -left-10 top-[250px]">
            <div
              className="flex flex-col gap-2"
              onClick={() => {
                bookRef.current.pageFlip().flipPrev();
                setCount(count - 1);
              }}
            >
              <IoIosArrowDropleftCircle size={30} />
              <span className="text-xs">Prev Page</span>
            </div>
          </div>
        )}
        {count !== storyChapterParsed?.chapters?.length - 1 && (
          <div className="absolute -right-5 top-[250px]">
            <div
              className="flex flex-col gap-2"
              onClick={() => {
                bookRef.current.pageFlip().flipNext();
                setCount(count + 1);
              }}
            >
              <IoIosArrowDroprightCircle size={30} />
              <span className="text-xs">Next Page</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
