import React from 'react'

const MainArea = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-transparent h-full relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#818cf8 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Floating elements for premium feel */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md text-center px-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-2xl flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-indigo-500/10">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 gradient-text">LoopChat Web</h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          Select a chat to start messaging, sharing photos, and connecting securely with friends.
        </p>
        
        <div className="mt-4 flex gap-3 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
          <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce delay-100 shadow-[0_0_10px_rgba(168,85,247,0.6)]"></div>
          <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce delay-200 shadow-[0_0_10px_rgba(236,72,153,0.6)]"></div>
        </div>
      </div>
    </div>
  )
}

export default MainArea