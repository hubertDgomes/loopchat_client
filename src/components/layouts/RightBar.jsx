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
      <div className="h-full w-full bg-transparent flex flex-col pt-10 px-6 mt-2 relative overflow-hidden">
        <div className="animate-pulse flex flex-col items-center w-full relative z-10">
          <div className="w-24 h-24 bg-slate-800/50 rounded-full mb-4 ring-1 ring-white/5"></div>
          <div className="h-5 w-32 bg-slate-800/50 rounded-md mb-2 ring-1 ring-white/5"></div>
          <div className="h-3 w-40 bg-slate-800/50 rounded-md mb-6 ring-1 ring-white/5"></div>
          <div className="flex gap-3 w-full justify-center">
            <div className="w-12 h-12 bg-slate-800/50 rounded-full ring-1 ring-white/5"></div>
            <div className="w-12 h-12 bg-slate-800/50 rounded-full ring-1 ring-white/5"></div>
            <div className="w-12 h-12 bg-slate-800/50 rounded-full ring-1 ring-white/5"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto relative">
      {/* Top Banner Gradient */}
      <div className="absolute top-0 w-full h-36 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl z-0 shadow-[0_0_30px_rgba(139,92,246,0.3)]"></div>
      
      <div className="relative pt-16 px-6 pb-6 flex flex-col items-center z-10">
        {/* Profile Avatar */}
        <div className="relative w-28 h-28 rounded-full border-4 border-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-slate-800 overflow-hidden shrink-0">
          <Images
            src={data.profilePhoto || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
            alt={data.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Active Status Indicator */}
        <div className="absolute top-34 ml-22 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full z-20 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-bold text-slate-200 tracking-tight text-center">{data.fullName}</h2>
        <p className="text-sm font-medium text-slate-400 mb-6 text-center">{data.email}</p>

      

        {/* Details List */}
        <div className="w-full bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/5 p-5 mt-2 flex flex-col gap-5">
          <div className="flex border-b border-white/5 pb-4">
            <div className="w-9 h-9 flex items-center justify-center mr-3.5 bg-indigo-500/20 rounded-full shrink-0 text-indigo-400 ring-1 ring-indigo-500/30">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="flex flex-col flex-1 truncate justify-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">About</span>
              <span className="text-sm text-slate-300 font-medium truncate mt-0.5" title={data.fullName}>Hi there! I am using LoopChat.</span>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-9 h-9 flex items-center justify-center mr-3.5 bg-pink-500/20 rounded-full shrink-0 text-pink-400 ring-1 ring-pink-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="flex flex-col flex-1 truncate justify-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email</span>
              <span className="text-sm text-slate-300 font-medium truncate mt-0.5" title={data.email}>{data.email}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RightBar;
