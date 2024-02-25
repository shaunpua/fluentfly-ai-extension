// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tab.id },
//     files: ["contentScript.js"],
//   });
// });

console.log("HELLO background script test");

import db from "./db/indexDB";
import loadDictionaryEntriesFromJSON from "./db/dataLoader";

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
  if (message.action === "getData") {
    db.entries
      .limit(10)
      .toArray()
      .then((chineseWords) => {
        sendResponse({ data: chineseWords });
      });
    return true; // Keep the message channel open for the async response
  }
});
