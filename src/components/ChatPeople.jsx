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
      className="w-full flex items-center p-3 rounded-2xl hover:bg-white/5 hover:shadow-lg ring-1 ring-transparent hover:ring-indigo-500/30 transition-all duration-300 group text-left cursor-pointer active:scale-[0.98] transform"
    >
      <div className="relative flex-shrink-0">
        <img
          src={photoOfSender || "https://ui-avatars.com/api/?name=" + senderName + "&background=random"}
          alt={senderName}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-slate-800 shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"
        />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gradient-to-br from-green-400 to-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
      </div>
      
      <div className="ml-3 sm:ml-4 flex-1 overflow-hidden min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-semibold text-slate-200 truncate pr-2 text-sm sm:text-base group-hover:text-indigo-400 transition-colors duration-200">{senderName}</span>
          <span className="text-xs font-medium text-slate-500 flex-shrink-0 bg-slate-800/50 ring-1 ring-white/5 px-2 py-0.5 rounded-full">Now</span>
        </div>
        <p className="text-sm text-slate-400 truncate group-hover:text-slate-300 transition-colors duration-200 leading-relaxed">
          {senderMessage}
        </p>
      </div>
    </button>
  )
}

export default ChatPeople
