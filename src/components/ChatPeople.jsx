import React from 'react'
import { useNavigate } from "react-router-dom";

const ChatPeople = ({ photoOfSender, senderMessage, senderName, idReciver }) => {
  const navigate = useNavigate()

  const handleProfile = () => {
    navigate(`chatingarea/${idReciver}`)
  }

  return (
    <button 
      onClick={handleProfile}
      className="w-full flex items-center p-3 rounded-2xl hover:bg-white/90 hover:shadow-lg ring-1 ring-transparent hover:ring-indigo-100/50 transition-all duration-300 group text-left cursor-pointer active:scale-[0.98] transform"
    >
      <div className="relative flex-shrink-0">
        <img
          src={photoOfSender || "https://ui-avatars.com/api/?name=" + senderName + "&background=random"}
          alt={senderName}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-3 ring-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
        />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gradient-to-br from-green-400 to-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
      </div>
      
      <div className="ml-3 sm:ml-4 flex-1 overflow-hidden min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-semibold text-gray-900 truncate pr-2 text-sm sm:text-base group-hover:text-indigo-700 transition-colors duration-200">{senderName}</span>
          <span className="text-xs font-medium text-gray-400 flex-shrink-0 bg-gray-100/50 px-2 py-0.5 rounded-full">Now</span>
        </div>
        <p className="text-sm text-gray-500 truncate group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
          {senderMessage}
        </p>
      </div>
    </button>
  )
}

export default ChatPeople
