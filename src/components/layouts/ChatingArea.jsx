import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const ChatingArea = () => {
  const { id } = useParams()
  const [data , setData] = useState([])

  // console.log(id);
  
 
  useEffect(()=> {
    axios.get(`http://localhost:3000/api/getuserbyid/${id}` , {withCredentials : true})
    .then((res)=> setData(res.data))
  },[id])

  console.log(data);
  
  


  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Chat Header */}
      <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 sticky top-0 shadow-sm">
        <div className="relative">
          <img 
            src={data.profilePhoto} 
            alt="User avatar" 
            className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm object-cover"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 leading-tight">{data.fullName}</h2>
          <p className="text-xs text-green-600 font-medium">Online</p>
        </div>
      </div>

     
      {/* Input Area
      <div className="p-4 bg-white border-t border-gray-100 pb-6 sm:pb-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-indigo-600 transition-shadow">
          <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </button>
          
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm py-2 px-2 text-gray-900 placeholder:text-gray-400 outline-none"
          />
          
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              inputValue.trim() 
                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div> */}
    </div>
  )
}

export default ChatingArea