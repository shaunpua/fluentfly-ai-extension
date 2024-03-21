import { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    // Send a message to your background script to handle Google Sign-In

    //chrome.runtime.sendMessage({ type: "SUPABASE_GOOGLE_SIGN_IN" });
    chrome.runtime.sendMessage(
      { type: "SUPABASE_GOOGLE_SIGN_IN" },
      (response) => {
        console.log("response from google", response);
        if (response.success && response.data) {
          navigate("/");
        }
      }
    );
  };

  const handleSignInOrSignUp = () => {
    // Depending on `isSigningUp`, send a sign-in or sign-up message to the background
    const messageType = isSigningUp
      ? "SUPABASE_EMAIL_SIGN_UP"
      : "SUPABASE_EMAIL_SIGN_IN";
    chrome.runtime.sendMessage({
      type: messageType,
      value: { email, password },
    });
  };

  return (
    <div className="flex flex-col items-center justify-start p-4">
      <GoogleButton
        type="light" // can be light or dark
        onClick={handleGoogleSignIn}
      />

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSignInOrSignUp}
        className="bg-primary px-6 py-2 text-gray-50 text-base rounded-lg"
      >
        {isSigningUp ? "Sign Up" : "Sign In"}
      </button>

      <div
        onClick={() => setIsSigningUp(!isSigningUp)}
        className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
      >
        {isSigningUp
          ? "Already have an account? Sign in"
          : "Don't have an account yet? Sign up"}
      </div>
    </div>
  );
};

export default LoginComponent;
