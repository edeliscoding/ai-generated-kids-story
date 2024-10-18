"use client";
import BookCover from "@/app/components/BookCover";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
// import StoryPages from "@/app/components/StoryPages";
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

  const [currentSpeech, setCurrentSpeech] = useState(null);
  // Stores current TTS instance
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
  // console.log("storyChapterParsed", storyChapterParsed);

  // const onPageFlip = (e) => {
  //   const pageIndex = e.data; // e.data holds the current page index
  //   setCurrentPage(pageIndex);
  // };

  const handleSpeech = (pageText) => {
    // Stop the previous speech if any
    if (currentSpeech) {
      window.speechSynthesis.cancel();
    }

    // Delay to allow previous speech cancellation to take effect
    setTimeout(() => {
      // Create a new instance of SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(pageText);
      window.speechSynthesis.speak(utterance);

      // Save the current utterance to stop it later
      setCurrentSpeech(utterance);
    }, 100); // Short delay of 100ms
  };

  // Handle page flip event
  const handlePageFlip = (e) => {
    const newPageIndex = e.data; // e.data holds the current page index
    setCurrentPage(newPageIndex);

    // Automatically stop the previous speech when flipping pages
    window.speechSynthesis.cancel();

    const pageTexts = storyChapterParsed?.chapters?.map(
      (chapter) => chapter.description
    );

    // Start text-to-speech for the new page
    handleSpeech(pageTexts[newPageIndex]);
  };

  return (
    <div className="mt-6 md:mt-8 mx-auto container bg-slate-100">
      <h2 className="font-bold text-4xl text-center">
        {story?.storyTitle || story?.storySubject}
      </h2>
      <div className="mt-10 relative">
        <div className="flex justify-center">
          <HTMLFlipBook
            className="mt-2 md:mt-4"
            ref={bookRef}
            width={400}
            height={500}
            showCover={true}
          >
            <div>
              <BookCover imageUrl={story?.coverImage} />
            </div>
            {[...Array(storyChapterParsed?.chapters?.length)].map(
              (item, index) => {
                const pageTexts = storyChapterParsed?.chapters[index];
                const pageChapterTitle = pageTexts?.chapter_title;
                return (
                  <div
                    className="bg-white p-2 md:p-8 border flex flex-col"
                    key={index}
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-primary flex-1 mb-0">
                      {pageChapterTitle}
                    </h2>
                    <p className="mt-4 flex-grow mb-6">
                      {pageTexts?.description}
                    </p>
                    <button
                      className="bg-blue-400 text-white font-bold py-2 px-4 rounded w-full"
                      onClick={() => handleSpeech(pageTexts?.description)}
                    >
                      Play
                    </button>
                  </div>
                );
              }
            )}
          </HTMLFlipBook>
        </div>

        <div className="absolute left-10 top-[300px]">
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
        {count !== storyChapterParsed?.chapters?.length - 1 && (
          <div className="absolute right-0 top-[300px]">
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
