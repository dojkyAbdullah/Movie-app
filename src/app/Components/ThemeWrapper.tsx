"use client";
import { setTheme, toggleTheme } from "@/features/themeToggle/themeSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";

const ThemeWrapper = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date();
      const isDay = now.getHours() >= 7 && now.getHours() < 19;
      dispatch(setTheme(isDay ? "light" : "dark"));
    };

    updateTheme();
    const timer = setInterval(updateTheme, 60000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 border rounded ${mode === 'dark' ? 'border-white text-black bg-white' : 'border-black text-white bg-black'}`}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeWrapper;