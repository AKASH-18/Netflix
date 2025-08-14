import { checkValidData } from "../utils/validate.jsx";
import Header from "./Header";
import { use, useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase.jsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const Navigate = useNavigate();



  const handleButtonClick = () => {
  // ✅ First, validate and store the message
  const message = checkValidData(
    email.current.value,
    password.current.value
  );

  // ✅ Then, update state
  setErrorMessage(message);

  // If there's an error message, stop here
  if (message) return;

  if (!isSignInForm) {
    // Sign Up
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", userCredential.user);
        Navigate("/browse");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  } else {
    // Sign p (you still need to implement this)
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        Navigate("/browse")
      }
    )
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; 
      setErrorMessage(errorMessage);
  })
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          className=" "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg"
          alt=""
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute  w-3/12 p-12 my-36 mx-auto right-0 left-0 text-white  bg-black/80 "
      >
        <h1 className="font-bold text-3xl py-2 my-2 border-solid ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-8 m-2 w-full border-1 rounded-lg"
          />
        )}
        <input
          ref={email}
          className="p-2 py-4 m-2 w-full border-1 rounded-lg"
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          className="p-2 py-4 m-2  my-10 w-full border-1 rounded-lg "
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          className="p-4 m-2 bg-red-700 w-full rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already User? Sign In Here."}
        </p>
      </form>
    </div>
  );
};

export default Login;
