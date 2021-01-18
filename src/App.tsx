import React, { useState } from "react";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import {
  Container,
  createMuiTheme,
  Switch as MaterialSwitch,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

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
      <div
        style={{
          background: theme.palette.background.paper,
          minHeight: "100vh",
        }}
      >
        <Router>
          <Header>
            <MaterialSwitch
              checked={isDark}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Header>
          <Container maxWidth="lg">
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
