"use client";
import { addToFavourites, removeFromFavourites } from "@/features/favourites/favouriteMovieSlice";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { addSearchTerm, clearHistory } from "@/features/searchHistory/searchHistorySlice";
import { RootState } from "../store";
import ShowFavourites from "./showFavourites";
import Header from "./Header";
import Footer from "./Footer";

const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const SingleMovie = dynamic(() => import("./SingleMovie"), {
  loading: () => <p>Loading details...</p>,
});

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

const DisplayMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  const searchBarRef = useRef<HTMLInputElement>(null!);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [isFavOpen, setIsFavOpen] = useState(false)


  const favourites = useSelector((state: RootState) => state.favourites.movies);


  // ✅ Callbacks
  const handleAddToFavorites = useCallback(
    (movie: Movie) => {
      dispatch(addToFavourites(movie));
      alert(`Added "${movie.title}" to favorites!`);
    },
    [dispatch]
  );

 
  const handleRemoveFromFavorites = useCallback(
    (movie: Movie) => {
      dispatch(removeFromFavourites(movie.id));
      alert(`Removed "${movie.title}" from favorites!`);
    },
    [dispatch]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      dispatch(addSearchTerm(value));
    }
  };

  const handleCloseModal = useCallback(() => setSelectedMovieId(null), []);

  // Fetch movies
  const fetchMovieData = async (pageNum: number) => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${pageNum}`
    );
    const data = await res.json();
    setMovies((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieData(page);
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  
  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);


  const searchedMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  // ✅ Sort
  const sortedMovies = useMemo(() => {
    const sorted = [...searchedMovies];
    switch (sortBy) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-desc":
        sorted.sort(
          (a, b) =>
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
        );
        break;
      case "rating-desc":
        sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
    }
    return sorted;
  }, [searchedMovies, sortBy]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  const selectedMovie = selectedMovieId
    ? movies.find((m) => m.id === selectedMovieId)
    : null;

  const isFavourite = selectedMovie
    ? favourites.some((fav: Movie) => fav.id === selectedMovie.id)
    : false;

  return (
    <>
    <Header
      searchTerm={searchTerm}
      onSearch={handleSearch}
      sortBy={sortBy}
      onSortChange={setSortBy}
      onShowFavourites={() => setIsFavOpen(true)}
      searchBarRef={searchBarRef}
    />
    <div ref={topRef} className="p-4">

 

          <h2 className="text-2xl font-bold mb-4">Movies</h2>
      {/* Movies Grid */}
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovieId(movie.id)}
            className="p-2 relative group cursor-pointer"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="rounded-lg shadow-md"
            />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
          </div>
        ))}
      </div>

      {loading && <p className="mt-4">Loading more movies...</p>}
      <div ref={loaderRef} className="h-10"></div>

      {/* ✅ Back to Top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        ↑ Back to Top
      </button>

      {/* ✅ Pass props to modal */}

      {selectedMovieId && selectedMovie && (
        <SingleMovie
          id={selectedMovieId}
          onClose={handleCloseModal}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          isFavourite={isFavourite}
        />
      )}
      {isFavOpen && <ShowFavourites isOpen={isFavOpen} onClose={()=>setIsFavOpen(false)}/>}
      
    </div>
    <Footer/>
    </>
  );
};

export default DisplayMovie;
