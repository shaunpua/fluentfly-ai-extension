import { store } from "../store";
import { switchDictionary, switchTheme } from "./settingSlice";
import { selectSettingDictionaryEnabled } from "./settingSelectors";

const settingListener = (message, sendResponse) => {
  console.log("SETTING LISTENER MESSAGE RECEIVED", message.type);
  try {
    switch (message.type) {
      case "SETTING_SWITCH-DICTIONARY":
        store.dispatch(switchDictionary());
        sendResponse({ success: true });
        break;
      case "SETTING_SWITCH-THEME":
        store.dispatch(switchTheme());
        sendResponse({ success: true });
        break;
      case "SETTING_STATE":
        console.log("GET_STATE ran");
        sendResponse({
          state: store.getState().setting,
        });
        break;
      case "SETTING_SELECTOR-DICTIONARY":
        sendResponse({
          state: selectSettingDictionaryEnabled(store.getState()),
        });
        break;
      default:
        console.log("No matching action in settingListener");
        break;
    }
  } catch (error) {
    console.error("Error in settingListener", error);
  }
};

export default settingListener;
