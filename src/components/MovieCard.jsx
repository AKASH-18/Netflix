
import { IMG_CDN_URL } from "../utils/constant";
const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-8 rounded-lgc hover:scale-120 transition-transform duration-200 ease-in-out cursor-pointer">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;