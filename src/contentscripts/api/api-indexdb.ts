import CDictionaryInstance from "./models";

const getChineseDictionaryList = async (): Promise<CDictionaryInstance> => {
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

export default getChineseDictionaryList;
