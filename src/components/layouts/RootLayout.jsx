import React from "react";
import LeftBar from "./LeftBar";
import { Outlet } from "react-router-dom";
import RightBar from "./RightBar";

const RootLayout = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex overflow-hidden font-sans">
      <div className="flex w-full h-full max-w-[1800px] mx-auto bg-white/95 backdrop-blur-sm shadow-2xl shadow-indigo-100/30 sm:border-x border-gray-100/50 rounded-none sm:rounded-2xl sm:m-2 sm:shadow-2xl">
        <div className="w-[80px] sm:w-[280px] lg:w-[320px] flex-shrink-0 h-full border-r border-gray-100/80 bg-gradient-to-b from-gray-50/80 to-white/60 flex flex-col backdrop-blur-sm">
          <LeftBar />
        </div>
        <div className="flex-1 h-full min-w-0 bg-gradient-to-br from-white to-slate-50/50 flex flex-col relative shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.08)] z-10">
          <Outlet />
        </div>
        <div className="w-[260px] xl:w-[280px] flex-shrink-0 h-full border-l border-gray-100/80 bg-gradient-to-b from-gray-50/80 to-white/60 hidden xl:flex flex-col backdrop-blur-sm">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
