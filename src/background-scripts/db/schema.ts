export default interface ChineseDictionaryEntry {
  id?: number;
  traditional: string;
  simplified: string;
  pinyin: string;
  english: string[]; // Keeping it as an array as per your JSON structure
}
