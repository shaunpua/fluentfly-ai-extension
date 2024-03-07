import settingListener from "./settingState/settingListener";
import { store } from "./store";

const rootStateListener = () => {
  // when changing messages for state, rerun application, changes do not reflect on save
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    settingListener(message, sendResponse);

    console.log("ROTE MESSAGE", message);

    console.log("ROOT STATE", store.getState());

    return true; // Keep the message channel open for async responses
  });
};

export default rootStateListener;
