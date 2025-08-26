"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
 import { RootState} from "../store";
import { removeFromFavourites } from "@/features/favourites/favouriteMovieSlice";

interface ShowFavouritesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
}

const ShowFavourites: React.FC<ShowFavouritesProps> = ({ isOpen, onClose }) => {
  const favourites = useSelector((state: RootState) => state.favourites.movies) as Movie[];
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Favourites</h2>
        {favourites.length === 0 ? (
          <p className="text-black dark:text-white">No favourite movies added.</p>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {favourites.map((movie) => (
              <li
                key={movie.id}
                className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded"
              >
                <div>
                  <p className="font-semibold text-black dark:text-white">{movie.title}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Release: {movie.release_date} | Rating: {movie.vote_average}
                  </p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => dispatch(removeFromFavourites(movie.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowFavourites;
