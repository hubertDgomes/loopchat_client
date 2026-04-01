import React from 'react'

const MainArea = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50/50 via-indigo-50/30 to-purple-50/20 h-full relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Floating elements for premium feel */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm text-center px-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-3xl bg-gradient-to-br from-white to-indigo-50 shadow-2xl shadow-indigo-100/50 flex items-center justify-center ring-1 ring-white/50 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent">LoopChat Web</h2>
        <p className="text-gray-600 border-b border-b-indigo-200 pb-3 mt-2 text-sm sm:text-base leading-relaxed max-w-xs">
          Select a chat to start messaging, sharing photos, and connecting with friends.
        </p>
        
        <div className="mt-6 flex gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  )
}

export default MainArea