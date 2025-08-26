"use client";
import React, { useEffect, useState } from "react";

const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

type SingleMovieProps = {
  id: number;
  onClose?: () => void;
  onAddToFavorites?: (movie: MovieDetails) => void;
  onRemoveFromFavorites?: (movie: MovieDetails) => void;
  isFavourite?: boolean;
};

type MovieDetails = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
};

const SingleMovie: React.FC<SingleMovieProps> = ({
  id,
  onClose,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavourite,
}) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
   const [favourite, setFavourite] = useState(false)
useEffect(() => {
  setFavourite(isFavourite || false);
}, [isFavourite]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    fetchMovieData();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading...
      </div>
    );
  }

 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full mx-4 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✖
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-center">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="rounded-lg shadow-lg max-h-[70vh] object-contain"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
            <p className="mb-2 text-gray-600">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Rating:</strong> ⭐ {movie.vote_average}
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>

            {/* ✅ Toggle button */}
            {favourite ? (
              <button
                onClick={() => {onRemoveFromFavorites?.(movie) 
                                setFavourite(false)}}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
              >
                ❌ Remove from Favorites
              </button>
            ) : (
              <button
                onClick={() => {onAddToFavorites?.(movie)
                                setFavourite(true)
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                ❤️ Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
