import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    icon: {
      color: {
        main: string;
        hover: string;
        active: string;
      };
      backgroundColor: {
        main: string;
        hover: string;
        active: string;
      };
    };
  }

  interface PaletteOptions {
    icon: {
      color: {
        main?: string;
        hover?: string;
        active?: string;
      };
      backgroundColor: {
        main?: string;
        hover?: string;
        active?: string;
      };
    };
  }
}
