import React from "react";
import LeftBar from "./LeftBar";
import { Outlet } from "react-router-dom";
import RightBar from "./RightBar";

const RootLayout = () => {
  return (
    <div className="h-[100dvh] w-full bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex overflow-hidden font-sans text-slate-200">
      <div className="flex w-full h-full max-w-[1800px] mx-auto sm:border sm:border-white/5 sm:rounded-2xl sm:m-4 overflow-hidden glass shadow-2xl shadow-black/50">
        <div className="w-[85px] sm:w-[300px] lg:w-[340px] flex-shrink-0 h-full border-r border-white/5 bg-slate-900/40 flex flex-col z-20 transition-all duration-300">
          <LeftBar />
        </div>
        <div className="flex-1 h-full min-w-0 bg-slate-950/60 flex flex-col relative z-10">
          <Outlet />
        </div>
        <div className="w-[280px] xl:w-[320px] flex-shrink-0 h-full border-l border-white/5 bg-slate-900/40 hidden xl:flex flex-col z-20">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
