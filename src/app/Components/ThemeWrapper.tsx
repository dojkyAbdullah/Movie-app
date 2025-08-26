"use client";
import { setTheme, toggleTheme } from "@/features/themeToggle/themeSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date();
     const isDay = now.getHours() >= 7 && now.getHours() < 19; // 7 AM - 6:59 PM light

      dispatch(setTheme(isDay ? "light" : "dark"));
    
    };

    updateTheme(); 
    const timer = setInterval(updateTheme, 60000); 

    return () => clearInterval(timer); 
  });

  return (
    <div
      className={`min-h-screen p-4 ${
        mode === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 border rounded"
      >
        Toggle Theme
      </button>
      {children}
    </div>
  );
};

export default ThemeWrapper;
