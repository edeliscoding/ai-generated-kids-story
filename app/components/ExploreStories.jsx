"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import StorySearchForm from "./StorySearchForm";
import StoryCard from "./StoryCard";
import LoadMore from "./LoadMore";
import { searchStories } from "../data/searchStories";

function ExploreStories({ initialStories, initialPage, initialTotalPages }) {
  const [stories, setStories] = useState(initialStories);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setStories(initialStories);
    setCurrentPage(initialPage);
    setTotalPages(initialTotalPages);
  }, [initialStories, initialPage, initialTotalPages]);

  //   const loadMore = async () => {
  //     setLoading(true);
  //     const nextPage = currentPage + 1;
  //     const queryString = searchParams.toString();
  //     const response = await fetch(
  //       `/api/stories?${queryString}&page=${nextPage}`
  //     );
  //     const newStories = await response.json();
  //     setStories((prevStories) => [...prevStories, ...newStories.stories]);
  //     setCurrentPage(nextPage);
  //     setLoading(false);
  //   };

  const loadMore = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    const query = searchParams.get("query") || "";
    const filters = {
      storyType: searchParams.get("storyType") || "",
      ageGroup: searchParams.get("ageGroup") || "",
      imageStyle: searchParams.get("imageStyle") || "",
      author: searchParams.get("author") || "",
      startDate: searchParams.get("startDate") || null,
      endDate: searchParams.get("endDate") || null,
    };
    try {
      const newStoriesData = await searchStories(query, filters, nextPage);
      setStories((prevStories) => [...prevStories, ...newStoriesData.stories]);
      setCurrentPage(newStoriesData.currentPage);
      setTotalPages(newStoriesData.totalPages);
    } catch (error) {
      console.error("Error loading more stories:", error);
    } finally {
      setLoading(false);
    }
  };
  //   const handleSearch = (newSearchParams) => {
  //     const query = new URLSearchParams(newSearchParams).toString();
  //     router.push(`/explore-stories?${query}`);
  //   };

  return (
    // <div className="container mx-auto px-40 py-8">
    <div className="px-2 lg:px-12 py-8 grid grid-col-1">
      {/* <StorySearchForm onSearch={handleSearch} /> */}
      <div className="lg:gap-4 lg:grid-cols-3 grid grid-cols-2 gap-4">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
      {currentPage < totalPages && (
        <LoadMore onLoadMore={loadMore} loading={loading} />
      )}
    </div>
  );
}

export default ExploreStories;
