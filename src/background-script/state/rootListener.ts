import settingListener from "./settingState/settingListener";
import { store } from "./store";
import authListener from "./authState/authListener";

const rootStateListener = () => {
  // when changing messages for state, rerun application, changes do not reflect on save

  console.log("ROOT STATE", store.getState());

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    settingListener(message, sendResponse);
    authListener(message, sendResponse);

    console.log("ROTE MESSAGE", message);

    console.log("ROOT STATE", store.getState());

    return true; // Keep the message channel open for async responses
  });
};

export default rootStateListener;
