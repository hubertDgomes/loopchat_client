import React from 'react'

const RightBar = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4 ring-4 ring-white shadow-sm">
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Info</h3>
      <p className="text-sm text-gray-500 mb-6">Select a chat to view their profile details and shared media.</p>
    </div>
  )
}

export default RightBar