"use client";
import { Provider, useSelector } from "react-redux";
import "./globals.css";
import { store } from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeContainer>
            {children}
          </ThemeContainer>
        </Provider>
      </body>
    </html>
  );
}

// ThemeContainer component to use useSelector inside Provider
import { RootState } from "./store";
function ThemeContainer({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div
      className={`min-h-screen  ${
        mode === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
}