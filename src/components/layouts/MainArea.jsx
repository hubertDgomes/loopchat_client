import React from 'react'

const MainArea = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50/30 h-full relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm text-center px-4">
        <div className="w-24 h-24 mb-6 rounded-3xl bg-white shadow-xl shadow-indigo-100 flex items-center justify-center ring-1 ring-gray-900/5 transform transition-transform hover:scale-105 duration-300">
          <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">LoopChat Web</h2>
        <p className="text-gray-500 border-b border-b-indigo-200 pb-2 mt-2">
          Select a chat to start messaging, sharing photos, and connecting.
        </p>
        <div className="mt-8 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          End-to-end encrypted (Because I can't effort the database)
        </div>
      </div>
    </div>
  )
}

export default MainArea