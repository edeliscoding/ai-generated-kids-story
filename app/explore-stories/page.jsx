import React from "react";
// import { getAllStories } from "@/app/data/getAllStories";
import { searchStories } from "@/app/data/searchStories";
import StoryCard from "../components/StoryCard";
import StorySearchForm from "../components/SearchForm";
import { Button } from "@/components/ui/button";
import LoadMore from "../components/LoadMore";
import ExploreStories from "../components/ExploreStories";

async function ExporeStories({ searchParams }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const filters = {
    storyType: searchParams?.storyType || "",
    ageGroup: searchParams?.ageGroup || "",
    imageStyle: searchParams?.imageStyle || "",
    author: searchParams?.author || "",
    startDate: searchParams?.startDate || null,
    endDate: searchParams?.endDate || null,
  };

  // const stories = await searchStories(query, filters, currentPage);
  const storiesData = await searchStories(query, filters, currentPage);
  // console.log("stories from server", stories);
  // const [stories, setStories] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   totalPages: 1,
  //   totalStories: 0,
  // });

  // const loadStories = async (query = "", filters = {}, page = 1) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const results = await searchStories(query, filters, page);
  //     setStories(results.stories);
  //     setPagination({
  //       currentPage: results.currentPage,
  //       totalPages: results.totalPages,
  //       totalStories: results.totalStories,
  //     });
  //   } catch (err) {
  //     setError("Failed to load stories. Please try again.");
  //     console.error("Error loading stories:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadStories();
  // }, []);

  // const handleSearch = (query, filters) => {
  //   loadStories(query, filters);
  // };

  return (
    <div className="container mx-auto md:px-40 px-2 py-6">
      <div className="grid grid-col-1 lg:grid-col-2 gap-4">
        <StorySearchForm />
        {/* {allStories.map((story, index) => (
          <StoryCard key={story._id} story={story} />
        ))} */}
        {/* {loading && <p>Loading stories...</p>}
        {error && <p className="text-red-500">{error}</p>} */}
        {/* {stories?.stories?.map((story, index) => (
          <StoryCard key={story._id} story={story} />
        ))} */}
        <ExploreStories
          initialStories={storiesData.stories}
          initialPage={storiesData.currentPage}
          initialTotalPages={storiesData.totalPages}
        />
      </div>
      {/* <LoadMore /> */}
    </div>
  );
}

export default ExporeStories;
