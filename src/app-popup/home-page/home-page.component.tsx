import Switch from "@mui/material/Switch";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import switchThemeMUI from "../../utilities/material-ui";

const HomepageComponent = () => {
  const [isHoverEnabled, setIsHoverEnable] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsHoverEnable(event.target.checked);
  };

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
