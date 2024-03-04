import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import switchThemeMUI from "../../utilities/material-ui";

const HomepageComponent = () => {
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  const fetchState = () => {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
      setIsHoverEnabled(response.dictionaryEnabled);
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsHoverEnabled = event.target.checked;
    setIsHoverEnabled(newIsHoverEnabled); // Optimistically update the UI

    // Send the message to update the global state
    chrome.runtime.sendMessage({ type: "SWITCH_DICTIONARY" }, (response) => {
      if (response && !response.success) {
        // If for any reason the update was not successful, revert to the previous state
        setIsHoverEnabled(!newIsHoverEnabled);
      }
    });
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <div className=" h-max flex flex-co items-center pt-3 px-3 pb-4 bg-primary-background-lt">
      <ThemeProvider theme={switchThemeMUI}>
        <Switch
          checked={isHoverEnabled}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </ThemeProvider>

      <h2 className="text-lg text-primary-text-lt">Hello</h2>
    </div>
  );
};

export default HomepageComponent;
