

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import type { ColorContextType } from "../Types";



const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColorSettings = () => {
  const context = useContext(ColorContext);
  if (!context) throw new Error("useColorSettings must be used within AppThemeProvider");
  return context;
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dynamicGreen, setDynamicGreen] = useState(COLORS.green);
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as "light" | "dark") || "light";
  });

  
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: COLORS.primary,
        black: COLORS.black,
        white: COLORS.white,
        neutral: COLORS.neutral,
        red: COLORS.red,
        orange: COLORS.orange,
        yellow: COLORS.yellow,
        workspace: COLORS.workspace,
        blur: COLORS.blur,
        green: {
          light: dynamicGreen.light,
          main: dynamicGreen.main,
          dark: dynamicGreen.dark,
        },
        background: {
          default: mode === "light" ? COLORS.white.main : "#141A21",
          blurBackground: mode === "light" ? "blur.main" : "#141A21",
          SidebarBorder: mode === "light" ? " #ebeaea" : " #919eab1f",
          buttonHover: mode === "light" ? " #eeeeee" : " #28323D",
          whiteBlack: mode === "light" ? " #1C252E" : " #ffff",
          listColor: mode === "light" ? " #ffff" : " #1C252E",
          TableRowColor: mode === "light" ? " #F4F6F8" : " #283542",
          ViewPaperColor: mode === "light" ? " #f8f8f8" : " #1C252E",
          notificationbg: mode === "light" ? " #eeecec" : " #141A21",
          notificationHover: mode === "light" ? "#d3d3d3" : " #28323D",
          logoutButtonColor: mode === "light" ? "#B71D18" : " #FFAC82",
          logoutButtonbg: mode === "light" ? "#fdb6a680" : " #ce6a5480",
          signininputbg: mode === "light" ? "#f3f6fb" : " #1C252E",
          Sidebarmenu: mode === "light" ? "#ffffffe6" : " #1c252ee6",
          Inputborder: mode === "light" ? "#212B36" : " #999fa5",
          Menubg: mode === "light" ? "#ffff" : " #04111f",
          userchipcolor: mode === "light" ? "#006C9C" : " #61F3F3",
        },
        text: {
          primary: mode === "light" ? "#141A21" : "#ffffff",
          secondary: "#637381",
        },

      },
      typography: {
        fontFamily: FONTS.primary,
      },
    }), [dynamicGreen, mode]);

  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ColorContext.Provider value={{ setMainColor: setDynamicGreen, toggleMode, mode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorContext.Provider>
  );
};