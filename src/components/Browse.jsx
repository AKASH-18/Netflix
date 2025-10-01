import Header from "./Header";
import MainContainer from "./MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import AISearch from "./AISearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showAISearch = useSelector((store) => store.ai.showAISearch);
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div className="w-full overflow-hidden">
      <Header />
      {showAISearch ? <AISearch /> : 
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
     }
      
    </div>
  );
};

export default Browse;
