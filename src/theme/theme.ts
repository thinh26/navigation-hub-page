import { createTheme, ThemeOptions } from "@mui/material/styles";

/**
 * Material You (Material 3) inspired theme configuration
 * Following Google's Material Design 3 guidelines with dynamic color system
 */

// Light mode color palette - Material You inspired
const lightPalette = {
  primary: {
    main: "#006A6A",
    light: "#4F9A94",
    dark: "#004D4D",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#4A6363",
    light: "#718C8C",
    dark: "#2F4949",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#BA1A1A",
    light: "#FFB4AB",
    dark: "#93000A",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#7D5700",
    light: "#F5C000",
    dark: "#614300",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#006B5F",
    light: "#4F9A8E",
    dark: "#004D43",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#006E26",
    light: "#4FA058",
    dark: "#00531B",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FAFDFC",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#191C1C",
    secondary: "#3F4948",
    disabled: "#BFC8C7",
  },
  divider: "#6F7978",
};

// Dark mode color palette - Material You inspired
const darkPalette = {
  primary: {
    main: "#4DD8D5",
    light: "#A2F0ED",
    dark: "#00A5A2",
    contrastText: "#003736",
  },
  secondary: {
    main: "#B1CCCA",
    light: "#D6EFED",
    dark: "#5F7876",
    contrastText: "#1C3432",
  },
  error: {
    main: "#FFB4AB",
    light: "#FFDAD6",
    dark: "#93000A",
    contrastText: "#690005",
  },
  warning: {
    main: "#FABD00",
    light: "#FFDF9F",
    dark: "#614300",
    contrastText: "#3F2E00",
  },
  info: {
    main: "#4FDA8E",
    light: "#B3F5D3",
    dark: "#00513F",
    contrastText: "#003829",
  },
  success: {
    main: "#6FDB7D",
    light: "#C2F7CB",
    dark: "#00531B",
    contrastText: "#003910",
  },
  background: {
    default: "#191C1C",
    paper: "#1F2525",
  },
  text: {
    primary: "#E0E3E2",
    secondary: "#C4CFCE",
    disabled: "#6F7978",
  },
  divider: "#8C9492",
};

// Base theme options shared between light and dark modes
const getBaseThemeOptions = (): ThemeOptions => ({
  typography: {
    fontFamily: "var(--font-google-sans-flex, var(--font-inter))",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12, // Material 3 uses more rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
          padding: "10px 24px",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
          transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.16)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = createTheme({
  ...getBaseThemeOptions(),
  palette: {
    mode: "light",
    ...lightPalette,
  },
});

// Create dark theme
export const darkTheme = createTheme({
  ...getBaseThemeOptions(),
  palette: {
    mode: "dark",
    ...darkPalette,
  },
});

// Export both themes
export const getTheme = (mode: "light" | "dark") => {
  return mode === "light" ? lightTheme : darkTheme;
};
