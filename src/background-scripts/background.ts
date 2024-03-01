// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tab.id },
//     files: ["contentScript.js"],
//   });
// });

console.log("HELLO background script test");

import db from "./db/indexDB";
import loadDictionaryEntriesFromJSON from "./db/dataLoader";
import ChineseDictionaryEntry from "./db/schema";

const initializeDatabase = async () => {
  const count = await db.entries.count();

  if (count === 0) {
    loadDictionaryEntriesFromJSON();
    console.log("performing data fetching from cedict.json");
  }
  const chineseWords = await db.entries.limit(10).toArray();
  console.log("WORDS FROM DB TEST", chineseWords);
};

initializeDatabase();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getListCDict") {
    db.entries
      .limit(10)
      .toArray()
      .then((chineseWords) => {
        sendResponse({ data: chineseWords });
      });
    return true; // Keep the message channel open for the async response
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSelectedWordCDict") {
    const selectedWord = message.word;

    // Initialize an array to hold matching dictionary entries
    const matchingEntries: ChineseDictionaryEntry[] = [];

    // Function to recursively search for word segments
    const searchWordSegments = async (word: string, index: number) => {
      if (index > word.length) {
        // Base case: if index exceeds word length, return
        sendResponse({ success: true, data: matchingEntries });
        return;
      }

      // Get the current segment to check
      const wordSegment = word.slice(0, index);

      // Search for the current segment in the database
      try {
        const entry = await db.entries
          .where("simplified")
          .equals(wordSegment)
          .or("traditional")
          .equals(wordSegment)
          .first();

        if (entry) {
          // If an entry is found, add it to the array
          matchingEntries.push(entry);
          // Continue searching with a longer segment
          await searchWordSegments(word, index + 1);
        } else {
          // If no entry is found, stop the recursion and send the response
          console.log("SENT OUT MATCHING ENTRIES", matchingEntries);
          sendResponse({ success: true, data: matchingEntries });
        }
      } catch (error) {
        console.error("Error querying the dexie:", error);
        sendResponse({
          success: false,
          data: null,
          message: "Error querying the database.",
        });
      }
    };

    // Start the recursive search with the first character
    searchWordSegments(selectedWord, 1);

    // Return true to indicate an asynchronous response will be sent
    return true;
  }
});
