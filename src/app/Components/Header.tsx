import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ThemeWrapper from "./ThemeWrapper";
import { RootState, AppDispatch } from "../store";
import { clearHistory } from "@/features/searchHistory/searchHistorySlice";

type HeaderProps = {
  searchTerm: string;
  onSearch: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onShowFavourites: () => void;
  searchBarRef: React.RefObject<HTMLInputElement>;
};

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearch,
  sortBy,
  onSortChange,
  onShowFavourites,
  searchBarRef,
}) => {
  const history = useSelector((state: RootState) => state.searchHistory.history);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.mode);

  // Tailwind classes for dark/light modes
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textClass = theme === "dark" ? "text-white" : "text-gray-900";
  const inputBg = theme === "dark" ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500";
  const selectBg = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const historyBg = theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700";

  return (
    <div className={`${bgClass} ${textClass} shadow-md p-4 rounded-md w-full flex flex-col gap-4`}>
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          ref={searchBarRef}
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className={`border rounded p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
        />

        <button
          onClick={onShowFavourites}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200 ease-in-out hover:scale-105 w-full sm:w-auto"
        >
          Show Favourites
        </button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={`border rounded p-2 w-full sm:w-auto ${selectBg}`}
        >
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
          <option value="date-desc">Release Date (Newest)</option>
          <option value="rating-desc">Rating (High → Low)</option>
        </select>

        <ThemeWrapper />
      </div>

      {/* Search History */}
      {history.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Search History:</span>
            <button
              onClick={() => dispatch(clearHistory())}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((term, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded text-xs shadow ${historyBg}`}
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
