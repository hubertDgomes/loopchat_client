import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Images from "../Images";

const RightBar = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_LINK}/api/getuserbyid/${id}`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!data) {
    return (
      <div className="h-full w-full bg-[#f8fafc] flex flex-col pt-10 px-6 mt-2">
        <div className="animate-pulse flex flex-col items-center w-full">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-5 w-32 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-3 w-40 bg-gray-200 rounded-md mb-6"></div>
          <div className="flex gap-3 w-full justify-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-50/80 to-white flex flex-col overflow-y-auto border-l border-gray-100/80 shadow-[-2px_0_8px_rgba(0,0,0,0.02)] relative">
      {/* Top Banner Gradient */}
      <div className="absolute top-0 w-full h-36 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl z-0 shadow-lg"></div>
      
      <div className="relative pt-16 px-6 pb-6 flex flex-col items-center z-10">
        {/* Profile Avatar */}
        <div className="relative w-28 h-28 rounded-full border-4 border-[#f8fafc] shadow-lg bg-white overflow-hidden shrink-0">
          <Images
            src={data.profilePhoto || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            alt={data.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Active Status Indicator */}
        <div className="absolute top-34 ml-22 w-5 h-5 bg-green-500 border-4 border-[#f8fafc] rounded-full z-20 shadow-sm"></div>

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800 tracking-tight text-center">{data.fullName}</h2>
        <p className="text-sm font-medium text-gray-500 mb-6 text-center">{data.email}</p>

      

        {/* Details List */}
        <div className="w-full bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 p-5 mt-2 flex flex-col gap-5">
          <div className="flex border-b border-gray-50 pb-4">
            <div className="w-9 h-9 flex items-center justify-center mr-3.5 bg-indigo-50/80 rounded-full shrink-0 text-indigo-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="flex flex-col flex-1 truncate justify-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">About</span>
              <span className="text-sm text-gray-800 font-medium truncate mt-0.5" title={data.fullName}>Hi there! I am using LoopChat.</span>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-9 h-9 flex items-center justify-center mr-3.5 bg-pink-50/80 rounded-full shrink-0 text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="flex flex-col flex-1 truncate justify-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
              <span className="text-sm text-gray-800 font-medium truncate mt-0.5" title={data.email}>{data.email}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RightBar;
