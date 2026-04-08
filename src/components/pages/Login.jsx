import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_LINK}/api/login`, { email, password }, { withCredentials: true })
        .then(() => alert("Login successfull!"))
        .then(() => navigate("/app"))
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md glass-panel rounded-[2rem] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] relative z-10 border border-white/10 shadow-2xl shadow-black/50">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3 gradient-text">Welcome back</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Please enter your details to sign in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300">Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-4 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder:text-slate-600 text-sm sm:text-base hover:bg-slate-900/70 shadow-inner"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-300">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-4 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder:text-slate-600 text-sm sm:text-base hover:bg-slate-900/70 shadow-inner"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 px-4 py-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/10"
          >
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-slate-400">
          Not a member?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login