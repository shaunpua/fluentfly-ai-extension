// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tab.id },
//     files: ["contentScript.js"],
//   });
// });

console.log("HELLO background script test");

import { db } from "./db/indexDB";
import { loadDictionaryEntriesFromJSON } from "./db/dataLoader";

async function initializeDatabase() {
  const count = await db.entries.count();
  if (count === 0) {
    loadDictionaryEntriesFromJSON();
    console.log("performing data fetching from cedict.json");
  }
}

initializeDatabase();
