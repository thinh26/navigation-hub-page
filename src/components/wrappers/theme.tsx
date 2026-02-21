"use client";

import { useThemeMode } from "@/hooks/useThemeMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import Layout from "../Layout";

function MuiThemeWrapper({ children }: PropsWithChildren) {
  const { theme, mode, toggleTheme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout themeMode={mode} onToggleTheme={toggleTheme}>
        {children}
      </Layout>
    </ThemeProvider>
  );
}

export default MuiThemeWrapper;
