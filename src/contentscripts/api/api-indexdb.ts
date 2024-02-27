import CDictionaryInstance from "./models";

export const getChineseDictionaryList = async (): Promise<
  CDictionaryInstance[]
> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getListCDict" }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      if (!response) {
        reject(new Error("No response received from the background script."));
        return;
      }

      console.log("response from background script", response.data);
      resolve(response.data);
    });
  });
};

export const getChineseDictionarySelectedWord = async (
  selectedWord: string
): Promise<CDictionaryInstance> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: "getSelectedWordCDict", word: selectedWord },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        if (!response) {
          reject(new Error("No response received from the background script."));
          return;
        }

        console.log("response from background script", response.data);
        resolve(response.data);
      }
    );
  });
};
