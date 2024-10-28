// Import your Users model
import User from "@/app/models/users";
// Helper function to get user _id based on Clerk's user ID
export const getUserIdByClerkId = async (clerkUserId) => {
  try {
    // Find the user in your database with the matching clerkId
    const user = await User.findOne({ clerkId: clerkUserId });

    // Return the _id if the user is found
    if (user) {
      return user._id;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user _id:", error);
    throw error;
  }
};

// // Usage example
// // You can pass the Clerk user ID from the currently logged-in user's session data
// const clerkUserId = 'user_2nVKvKHmcexjNEV7bKfcE7LkLjr'; // Replace with actual logged-in Clerk ID
// getUserIdByClerkId(clerkUserId)
//   .then(userId => console.log('User _id:', userId))
//   .catch(error => console.error(error));
