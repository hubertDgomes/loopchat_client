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
      className="w-full flex items-center p-3 rounded-2xl hover:bg-white hover:shadow-sm ring-1 ring-transparent hover:ring-gray-100 transition-all duration-200 group text-left cursor-pointer"
    >
      <div className="relative flex-shrink-0">
        <img
          src={photoOfSender || "https://ui-avatars.com/api/?name=" + senderName + "&background=random"}
          alt={senderName}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="ml-4 flex-1 overflow-hidden min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <span className="font-semibold text-gray-900 truncate pr-2">{senderName}</span>
          <span className="text-xs font-medium text-gray-400 flex-shrink-0">Now</span>
        </div>
        <p className="text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors">
          {senderMessage}
        </p>
      </div>
    </button>
  )
}

export default ChatPeople
