import React, { useState } from "react";

import {
  useAuthMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} from "@/redux/api/auth/authApi";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("xyz@mail.com");
  const [password, setPassword] = useState<string>("abc");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // rtk query hooks
  const { data: user, isLoading: isAuthLoading } = useAuthMeQuery();

  const [signIn, { isLoading: isSignInLoading }] = useSignInMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();

  const handleSubmit = async (): Promise<void> => {
    setError("");

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isSignUp) {
        await signUp({ email, password, confirmPassword }).unwrap();
      } else {
        await signIn({ email, password }).unwrap();
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut().unwrap();
    } catch (err) {
      setError("Sign out failed.");
    }
  };

  const toggleAuthMode = (): void => {
    setIsSignUp(!isSignUp);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  if (isAuthLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
          <button
            onClick={handleSignOut}
            disabled={isSignOutLoading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
          >
            {isSignOutLoading ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSignInLoading || isSignUpLoading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 mb-4"
          >
            {isSignInLoading || isSignUpLoading
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>

          <p className="text-center">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={toggleAuthMode}
              className="text-blue-500 hover:underline ml-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
