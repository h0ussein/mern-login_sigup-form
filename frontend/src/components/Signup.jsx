import React, { useState } from "react";
import toast from "react-hot-toast";

function Signup({ onSwitchMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Signup failed");
      }
      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      // Switch to login form after successful signup
      setTimeout(() => {
        onSwitchMode();
      }, 500);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 w-full bg-white/10 backdrop-blur-lg p-3 sm:p-4 rounded-2xl border border-white/20 shadow-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-white">Signup</h2>
      {errorMessage && (
        <div className="text-red-600 text-sm" role="alert">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-600 text-sm" role="status">{successMessage}</div>
      )}
      <label className="flex flex-col gap-1 sm:gap-2">
        <span className="text-xs sm:text-sm text-gray-200 font-medium">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
          placeholder="Your name"
          required
        />
      </label>
      <label className="flex flex-col gap-1 sm:gap-2">
        <span className="text-xs sm:text-sm text-gray-200 font-medium">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
          placeholder="you@example.com"
          required
        />
      </label>
      <label className="flex flex-col gap-1 sm:gap-2">
        <span className="text-xs sm:text-sm text-gray-200 font-medium">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
          placeholder="Create a password"
          required
        />
      </label>
      <div className="text-xs sm:text-sm text-center text-gray-300">
        Already have an account?{' '}
        <button
          type="button"
          className="text-pink-300 hover:text-pink-200 hover:underline transition-colors duration-300"
          onClick={onSwitchMode}
        >
          Login
        </button>
      </div>
      <button
        type="submit"
        className="mt-2 sm:mt-3 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 font-medium disabled:opacity-60 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 text-sm sm:text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
export default Signup;

