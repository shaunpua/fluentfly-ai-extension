import db from "./indexDB";
import ChineseDictionaryEntry from "./schema";

const loadDictionaryEntriesFromJSON = async () => {
  const url = chrome.runtime.getURL("data/cedict.json");
  const response = await fetch(url);
  const entries: ChineseDictionaryEntry[] = await response.json();

  try {
    await db.entries.bulkAdd(entries);
    console.log("Dictionary entries successfully added to the database.");
  } catch (error) {
    console.error("Failed to add dictionary entries to the database", error);
  }
};

export default loadDictionaryEntriesFromJSON;
