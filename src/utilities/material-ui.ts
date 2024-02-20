import { createTheme } from "@mui/material/styles";

/*
 TODO: if possible to make use of tailwind colors as input and also include 
create theme and switch component to avoid resuing component
*/
const switchThemeMUI = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#75F0BD",
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#75F0BD",
          },
        },
      },
    },
  },
});

export default switchThemeMUI;
