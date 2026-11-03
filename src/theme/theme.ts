import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    icon: {
      color: {
        main: "#1f558f",
      },
      backgroundColor: {
        hover: "#e6f2ff",
      },
    },
    clickableChip: {
      color: {
        main: "#e6f2ff",
      },
      backgroundColor: {
        main: "#1f558f",
      },
    },
  },
});

export default theme;
