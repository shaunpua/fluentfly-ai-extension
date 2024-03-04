import { store } from "./store";
import { switchDictionary, switchTheme } from "./settingState/settingSlice";

const rootStateListener = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
      case "SWITCH_DICTIONARY":
        store.dispatch(switchDictionary());
        sendResponse({ success: true });
        break;
      case "SWITCH_THEME":
        store.dispatch(switchTheme());
        sendResponse({ success: true });
        break;
      case "GET_STATE":
        sendResponse(store.getState().setting);
        break;
      // Add other cases as needed
    }

    return true; // Keep the message channel open for async responses
  });
};

export default rootStateListener;
