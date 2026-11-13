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
    clickableChip: {
      color: {
        main: string,
      },
      backgroundColor: {
        main: string,
      },
    }, 
    chat: {
      text: {
        color: string,
        semi: string,
        low: string
      },
      primary: string,
    },
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
    clickableChip: {
      color: {
        main?: string,
      },
      backgroundColor: {
        main?: string,
      },
    },
    chat: {
      text?: {
        color?: string,
        semi?: string,
        low?: string
      },
      primary?: string,
    },
  }
}
