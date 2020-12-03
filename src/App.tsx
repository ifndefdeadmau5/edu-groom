import React, { useState } from "react";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import {
  createMuiTheme,
  Switch,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import Header from "./components/Header";
import Products from "./pages/Products";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [themeOption, setThemeOption] = useState<ThemeOptions>({
    palette: {
      type: "light",
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDark(event.target.checked);
    setThemeOption((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        type: event.target.checked ? "dark" : "light",
      },
    }));
  };

  const theme = createMuiTheme(themeOption);

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <Switch
          checked={isDark}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Header>
      <Products />
    </ThemeProvider>
  );
}

export default App;
