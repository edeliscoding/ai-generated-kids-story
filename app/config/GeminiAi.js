/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Define dynamic prompt templates for different use cases
// const createStoryPrompt = (description) =>
//   `Create a kids story for 5-8 year olds. Story description: ${description}. The story should be educational and illustrated in paper cut style, including chapter titles and prompts for images in JSON format.`;

// const autocompletePrompt = (currentText) =>
//   `Continue the story based on the following text: "${currentText}". Provide a seamless continuation for an engaging narrative.`;

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "create kids story on description for 5-8 year old kids, educational story, and all images in Paper cut style: story of boy and Magical School, give me 5 chapters with detailed image text prompt for each of chapter and image prompt for story cover with story name, all in JSON field format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "story_name": "The Boy Who Found the Magical School",\n  "cover_image": {\n    "description": "A young boy, with wide, curious eyes, stands in front of a giant, swirling, rainbow-colored door. The door is made of paper cut swirls and has tiny, shimmering stars around it. Behind the door, glimpses of a magical world can be seen - flying books, a paper cut castle, and a friendly-looking, paper-cut owl.",\n    "style": "Paper cut"\n  },\n  "chapters": [\n    {\n      "chapter_title": "The Ordinary Day",\n      "description": "Toby was a regular boy who loved playing with his toys. But, he always wished for something more exciting. His room was filled with paper cut toys: a paper airplane hanging from the ceiling, a paper-cut train running on a track, and a paper-cut robot standing in the corner. But, Toby wanted an adventure.",\n      "image": {\n        "description": "Toby, a boy with brown hair and blue eyes, is sitting on the floor, surrounded by his paper cut toys. He looks bored and is gazing out the window. The window is cut from paper and shows a simple, green field with a blue sky.",\n        "style": "Paper cut"\n      }\n    },\n    {\n      "chapter_title": "The Mysterious Door",\n      "description": "One day, Toby found a strange, shimmering door in his backyard. It was made of swirling rainbow colors and had tiny, twinkling stars around it. He had never seen it before. The door was like nothing he had ever imagined. It almost seemed to hum with magic.",\n      "image": {\n        "description": "Toby stands in his backyard, looking at the shimmering, rainbow-colored door. The grass is cut from paper, and the sky is a bright blue. The door is made of swirling paper, and it has tiny stars around it. A small, paper-cut butterfly flutters around the door, adding to its magical aura.",\n        "style": "Paper cut"\n      }\n    },\n    {\n      "chapter_title": "The Magical School",\n      "description": "He cautiously pushed open the door, and suddenly he was in a magical world! Flying books were carrying students, a paper-cut castle stood tall, and a friendly, paper-cut owl with sparkling eyes welcomed him. He had found a magical school for children who loved to learn and play.",\n      "image": {\n        "description": "The magical school is filled with paper-cut wonders. A towering paper-cut castle stands in the center, with a paper-cut flag fluttering on top. Books fly around the school carrying paper-cut children with colorful clothes. A friendly owl with sparkly eyes welcomes Toby. In the background, a paper-cut rainbow shines brightly in the sky.",\n        "style": "Paper cut"\n      }\n    },\n    {\n      "chapter_title": "Learning with Magic",\n      "description": "Toby learned about the world, not from books, but from talking animals, dancing trees, and singing clouds. He learned about the magic of friendship and the joy of learning. He learned about the world around him through fun activities and amazing experiences.",\n      "image": {\n        "description": "Toby is sitting with a group of paper-cut children, listening to a wise, paper-cut owl. They are all surrounded by magical elements - a talking, paper-cut tree, a singing cloud, and a smiling sun. The scene is filled with vibrant paper-cut colors and playful patterns.",\n        "style": "Paper cut"\n      }\n    },\n    {\n      "chapter_title": "The Return Home",\n      "description": "After a wonderful day, Toby knew it was time to return home. He waved goodbye to his new friends and promised to return. As he walked through the shimmering door, he realized that the world wasn\'t just ordinary anymore. He had found magic, and he knew that he would never forget his magical school.",\n      "image": {\n        "description": "Toby is standing in his backyard, holding a paper-cut book, a gift from his new friends. He is looking back at the shimmering door, which is now disappearing. He smiles, knowing that he will always remember the magic he found. The sun is setting behind him, creating a warm glow on the paper-cut landscape.",\n        "style": "Paper cut"\n      }\n    }\n  ]\n}\n``` \n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// Start a chat session with a function to handle multiple prompt types
// export const getAIResponse = async (promptType, textInput) => {
//   const promptText =
//     promptType === "createStory"
//       ? createStoryPrompt(textInput)
//       : autocompletePrompt(textInput);

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: promptText,
//           },
//         ],
//       },
//     ],
//   });

//   // try {
//   //   // Call getResponse and handle the data format carefully
//   //   // const response = await chatSession.getResponse();
//   //   const result = await model.generateContent("Explain how AI works");

//   //   // Inspect the structure of response to ensure proper data extraction
//   //   if (result) {
//   //     return result; // Or access response.data.content, response.data[0], etc. based on the API structure
//   //   } else {
//   //     console.warn("Response structure is not as expected:", response);
//   //     return undefined;
//   //   }
//   //   // console.log("response", response);
//   //   // return response.data;
//   // } catch (error) {
//   //   console.error("Error with Gemini API response:", error);
//   //   return undefined; // Return undefined in case of error to avoid further issues
//   // }
//   try {
//     const response = await chatSession.getResponse();

//     // Check the prompt type to handle JSON parsing for `createStory`
//     if (promptType === "createStory") {
//       // Assume `response.data` contains JSON-formatted text
//       try {
//         return JSON.parse(response?.data?.text); // Parse JSON for story structure
//       } catch (jsonError) {
//         console.error("Failed to parse JSON:", jsonError);
//         return undefined;
//       }
//     } else if (promptType === "autocomplete") {
//       // Return plain text for autocomplete
//       return response?.data?.text; // Ensure `text` field exists and contains plain text
//     } else {
//       console.warn("Unrecognized prompt type:", promptType);
//       return undefined;
//     }
//   } catch (error) {
//     console.error("Error with Gemini API response:", error);
//     return undefined;
//   }
// };
