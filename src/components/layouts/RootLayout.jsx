import React from "react";
import LeftBar from "./LeftBar";
import { Outlet } from "react-router-dom";
import RightBar from "./RightBar";

const RootLayout = () => {
  return (
    <div className="h-screen w-full bg-indigo-50/30 flex overflow-hidden font-sans">
      <div className="flex w-full h-full max-w-[1600px] mx-auto bg-white shadow-2xl shadow-indigo-100/50 sm:border-x border-gray-100">
        <div className="w-[320px] flex-shrink-0 h-full border-r border-gray-100 bg-gray-50/50 flex flex-col">
          <LeftBar />
        </div>
        <div className="flex-1 h-full min-w-0 bg-white flex flex-col relative shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-10">
          <Outlet />
        </div>
        <div className="w-[280px] flex-shrink-0 h-full border-l border-gray-100 bg-gray-50/50 hidden lg:flex flex-col">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
