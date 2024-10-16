"use client";
import BookCover from "@/app/components/BookCover";
import StoryChapters from "@/app/components/StoryChapters";
import StoryPages from "@/app/components/StoryPages";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export default function StoryComponent() {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/story/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch story");
        }
        const data = await response.json();
        console.log("story", data);
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

  return (
    <div className="mt-10 mx-auto container">
      <h2 className="font-bold text-4xl text-center ">{story?.storySubject}</h2>
      <div className="mt-10">
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-10"
        >
          <div>
            <BookCover imageUrl={story?.coverImage} />
          </div>
          {[...Array(storyChapterParsed?.chapters?.length)].map(
            (item, index) => (
              <div className="bg-white p-2 md:p-10 border">
                <StoryPages
                  storyChapter={storyChapterParsed?.chapters[index]}
                />
              </div>
            )
          )}
        </HTMLFlipBook>
      </div>
      {/* <StoryChapters story={story} /> */}
    </div>
  );
}
