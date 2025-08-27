import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Footer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const linkHover = theme === "dark" ? "hover:text-white" : "hover:text-blue-600";

  return (
    <footer className={`${bgClass} ${textClass} shadow-inner mt-6`}>
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between gap-6">
        {/* Logo / Site Info */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">MovieApp</span>
          <p className="text-sm">Your ultimate movie guide & favourites tracker.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Quick Links</span>
          <a href="#" className={`text-sm ${linkHover}`}>Home</a>
          <a href="#" className={`text-sm ${linkHover}`}>Favourites</a>
          <a href="#" className={`text-sm ${linkHover}`}>Trending</a>
          <a href="#" className={`text-sm ${linkHover}`}>Contact</a>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Follow Us</span>
          <div className="flex gap-2">
            <span className={`text-sm cursor-pointer ${linkHover}`}>Facebook</span>
            <span className={`text-sm cursor-pointer ${linkHover}`}>Twitter</span>
            <span className={`text-sm cursor-pointer ${linkHover}`}>Instagram</span>
          </div>
        </div>
      </div>

      <div className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"} mt-4`}>
        <p className="text-center text-sm py-4">&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
