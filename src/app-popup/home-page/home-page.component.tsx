import Switch from "@mui/material/Switch";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import switchThemeMUI from "../../utilities/material-ui";

function HomepageComponent() {
  //   document.addEventListener("mousemove", function (e) {
  //     const element = document.elementFromPoint(e.clientX, e.clientY);
  //     if (element && isChineseCharacter(element.textContent)) {
  //       console.log(`CHARACTER ${element.textContent} IS chinese`);
  //       // Show translation (how to display this will depend on your approach, e.g., using React or direct DOM manipulation)
  //     }
  //   });

  //   function isChineseCharacter(text: any) {
  //     return /[\u4e00-\u9fa5]/.test(text);
  //   }

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
}

export default HomepageComponent;
