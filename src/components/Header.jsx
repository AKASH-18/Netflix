import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, PHOTO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleAISearchView } from "../utils/aiSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showAISearch = useSelector((store) => store.ai.showAISearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })

      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {}, []);

  const handleAISearchClick = () => {
    dispatch(toggleAISearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-32 mx-auto md:mx-0" src={LOGO} alt="" />
      {user && (
        <div className="flex justify-between px-4 ">
          {showAISearch && (
            <select
              className="P-2 bg-gray-500 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className=" py-2 px-4 mx-6 bg-red-600 rounded-lg"
            onClick={handleAISearchClick}
          >
            {showAISearch ? "HomePage" : "  AI Search"}
          </button>
          <img className="w-12 flex " src={user?.photoURL || PHOTO} alt="" />
          <button
            className="text-amber-50 cursor-pointer"
            onClick={handleSignOut}
          >
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
