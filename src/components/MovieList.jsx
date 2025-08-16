import React, { useRef } from "react";

const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="flex-shrink-0 w-1/7 pr-4 rounded-lg hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer">
      <img
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // scroll width = width of 1 card (1/6th of container) * 1 card + padding
      const scrollAmount = scrollRef.current.offsetWidth / 6;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 w-full relative py-8">
      <h1 className="text-white text-2xl md:text-4xl mb-4">{title}</h1>

      <button
  onClick={() => scroll("left")}
  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 text-white p-4 rounded-full z-10 hover:bg-gray-600"
  aria-label="Scroll Left"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</button>
<button
  onClick={() => scroll("right")}
  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-70 text-white p-4 rounded-full z-10 hover:bg-gray-600"
  aria-label="Scroll Right"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</button>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-hidden scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
