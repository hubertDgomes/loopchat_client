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
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Chats</h1>
          <button className="p-2.5 rounded-2xl bg-white/80 hover:bg-white hover:shadow-lg text-gray-600 transition-all duration-300 shadow-sm ring-1 ring-gray-200/50 hover:ring-indigo-200 group">
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border-0 ring-1 ring-inset ring-gray-200/50 text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500/50 transition-all duration-300 placeholder:text-gray-400 text-gray-900 shadow-sm hover:shadow-md focus:shadow-lg"
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