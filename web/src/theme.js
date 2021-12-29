import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2d4059",
    },
    secondary: {
      main: "#ea5455",
      contrastText: "#ffffff",
    },
  },
  typography: {
    h2: {
      fontSize: "3.75rem",
      "@media (max-width: 960px)": {
        fontSize: "2rem",
      },
    },
  },
})

export default theme
