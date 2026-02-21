"use client";
import { useState, useEffect, useMemo } from "react";
import { Theme } from "@mui/material/styles";
import { getTheme } from "../theme/theme";

/**
 * Custom hook for managing theme mode (light/dark)
 * Persists theme preference in localStorage
 *
 * @returns {object} Object containing current theme, mode, and toggle function
 */
export const useThemeMode = () => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedMode = window.localStorage.getItem("themeMode");
    return savedMode === "light" || savedMode === "dark" ? savedMode : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme: Theme = useMemo(() => getTheme(mode), [mode]);

  return {
    theme,
    mode,
    toggleTheme,
  };
};
