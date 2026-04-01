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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 ring-1 ring-gray-900/10 p-8 sm:p-10 transition-all duration-300 hover:shadow-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg shadow-indigo-200">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent">Welcome back</h2>
          <p className="text-sm text-gray-600 leading-relaxed">Please enter your details to sign in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-2xl border-0 bg-gray-50/80 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500/50 transition-all duration-300 placeholder:text-gray-400 text-sm sm:text-base hover:shadow-md focus:shadow-lg"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-2xl border-0 bg-gray-50/80 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200/50 focus:ring-2 focus:ring-inset focus:ring-indigo-500/50 transition-all duration-300 placeholder:text-gray-400 text-sm sm:text-base hover:shadow-md focus:shadow-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:from-indigo-700 hover:to-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-all duration-200 hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login