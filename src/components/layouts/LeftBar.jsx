import React, { useEffect, useState } from 'react'
import ChatPeople from '../ChatPeople'
import axios from 'axios'

const LeftBar = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_LINK}/api/allusers`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])
  
  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="p-4 sm:p-5 pb-4 relative z-10">
        <div className="flex items-center justify-center sm:justify-between mb-5 flex-col sm:flex-row gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight gradient-text hidden sm:block">Messages</h1>
          <button className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all duration-300 ring-1 ring-white/10 hover:ring-indigo-500/50 group mx-auto sm:mx-0">
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-800/50 backdrop-blur-md border border-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 placeholder:text-slate-500 text-slate-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-3 pb-4 space-y-1">
        {user.map((item, key) => (
          <ChatPeople 
            key={key}
            senderMessage={"Tap to start chatting"} 
            senderName={item?.fullName} 
            photoOfSender={item?.profilePhoto}
            idReciver={item._id}
          />
        ))}
      </div>
    </div>
  )
}

export default LeftBar