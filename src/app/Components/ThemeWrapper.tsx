"use client";
import { toggleTheme } from "@/features/themeToggle/themeSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: any) => state.theme.mode);
  const dispatch = useDispatch();

 
  return (
    <div className={`min-h-screen ${mode === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
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
