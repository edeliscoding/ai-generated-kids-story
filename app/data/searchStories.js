"use server";
import Story from "@/app/models/story";
import connectToMongoDb from "@/app/lib/mongodb";

export async function searchStories(query, filters, page = 1, limit = 10) {
  console.log("search stories", filters);
  const searchCriteria = {};
  await connectToMongoDb();
  // Full-text search on storySubject
  if (query) {
    searchCriteria.$text = { $search: query };
  }

  // Apply filters
  if (filters.storyType) searchCriteria.storyType = filters.storyType;
  if (filters.ageGroup) searchCriteria.ageGroup = filters.ageGroup;
  if (filters.imageStyle) searchCriteria.imageStyle = filters.imageStyle;
  if (filters.author) searchCriteria.userName = new RegExp(filters.author, "i");
  // if (filters.userName)
  //   searchCriteria.userName = new RegExp(filters.userName, "i");

  // Date range filter
  if (filters.startDate && filters.endDate) {
    searchCriteria.createdAt = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  }

  // Perform the search
  const stories = await Story.find(searchCriteria)
    // .sort({ score: { $meta: "textScore" } })
    .sort(query ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  // Get total count for pagination
  const totalStories = await Story.countDocuments(searchCriteria);

  return {
    stories,
    totalStories,
    totalPages: Math.ceil(totalStories / limit),
    currentPage: page,
  };
}
