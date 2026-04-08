import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_LINK}/api/signup`,
        { fullName, email, password },
        { withCredentials: true }
      ).then(() => alert("Signup Successfully!")).then(() => navigate("/profilephoto"))
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-md glass-panel rounded-[2rem] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] relative z-10 border border-white/10 shadow-2xl shadow-black/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 text-indigo-400 mb-6 transition-transform hover:scale-105 duration-300 ring-1 ring-indigo-500/30">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 gradient-text">Create an account</h2>
          <p className="text-sm text-slate-400">Join LoopChat and connect with your close ones.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 sm:text-sm transition-all duration-200 placeholder:text-slate-600 hover:bg-slate-900/70"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 sm:text-sm transition-all duration-200 placeholder:text-slate-600 hover:bg-slate-900/70"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="block w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 sm:text-sm transition-all duration-200 placeholder:text-slate-600 hover:bg-slate-900/70"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-200 mt-8 transform hover:scale-[1.02] active:scale-[0.98] border border-white/10"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Log in instead
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
