// import Story from "@/app/models/story";
// import connectToMongoDB from "@/app/lib/mongodb";
// export async function getStory(id) {
//   await connectToMongoDB();
//   try {
//     const story = await Story.findById(id);
//     return story;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// import dbConnect from "@/lib/mongodb";
// import Jobs from "@/app/models/Job";

// export async function getJobById(id) {
//   await dbConnect();
//   try {
//     const job = await Jobs.findById(id);
//     return job;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }
