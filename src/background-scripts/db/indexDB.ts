import Dexie from "dexie";
import ChineseDictionaryEntry from "./schema";

// Define your database
class MyChineseDictionaryDatabase extends Dexie {
  entries: Dexie.Table<ChineseDictionaryEntry, number>;

  constructor() {
    super("MyChineseDictionaryDatabase");
    this.version(1).stores({
      entries: "++id, traditional, simplified, pinyin, english", // Define your table schema
    });
    this.entries = this.table("entries");
  }
}

const db = new MyChineseDictionaryDatabase();

export default db;
