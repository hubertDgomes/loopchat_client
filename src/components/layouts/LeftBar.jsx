import React, { useEffect, useState } from 'react'
import ChatPeople from '../ChatPeople'
import axios from 'axios'

const LeftBar = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/allusers", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])
  
  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Chats</h1>
          <button className="p-2 rounded-full bg-white hover:bg-gray-100 text-gray-600 transition-colors shadow-sm ring-1 ring-gray-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-0 ring-1 ring-inset ring-gray-200 text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-shadow placeholder:text-gray-400 text-gray-900 shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
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