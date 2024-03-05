import settingListener from "./settingState/settingListener";

const rootStateListener = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("listening for chrome redux messages", message);
    settingListener(message, sendResponse);

    return true; // Keep the message channel open for async responses
  });
};

export default rootStateListener;
