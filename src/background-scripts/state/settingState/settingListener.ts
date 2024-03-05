import { store } from "../store";
import { switchDictionary, switchTheme } from "./settingSlice";

const settingListener = (message, sendResponse) => {
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
      sendResponse({ state: store.getState().setting });
      break;
  }
};

export default settingListener;
