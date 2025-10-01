import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

const AISearchBar = () => {
  const langKey = useSelector((store) => store?.config?.lang) || "hindi"; // fallback

  return (
    <div className="flex justify-center mt-[10%] w-1/2 m-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-6 m-6 flex w-full justify-center"
      >
        <input
          className="flex-grow rounded-lg p-2 border border-gray-300"
          type="text"
          aria-label={lang[langKey]?.aiSearchBar || "Search"}
          placeholder={lang[langKey]?.aiSearchBar || "Search"}
        />
        <button className="ml-2 py-2 px-4 bg-red-600 text-white rounded-lg">
          {lang[langKey]?.search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default AISearchBar;
