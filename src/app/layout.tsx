"use client";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "./store";
import ThemeWrapper from "./Components/ThemeWrapper";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <Provider store={store}>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  );
}
