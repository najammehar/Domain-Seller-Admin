import React from 'react'

function MessageMessage({ message, handleShowCompleteMessage }) {

    const createdAtDate = new Date(message.createdAt);
    const dateString = createdAtDate.toLocaleDateString();
    const timeString = createdAtDate.toLocaleTimeString();

    const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1f2937;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #f97316;
      border-radius: 20px;
      border: 2px solid #1f2937;
    }
  
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #f97316 #1f2937;
    }
  `;

  return (
    <>
    <style>{scrollbarStyles}</style>
    <div onClick={handleShowCompleteMessage} className='fixed inset-0 bg-gray-800 bg-opacity-50'></div>
    <div
    className='fixed max-w-lg w-full h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6'
    >
      <div className='w-full h-full text-gray-100 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl space-y-4 p-4 overflow-y-auto custom-scrollbar'>
        <div>
        <h1 className="font-bold text-xl">Message from <span className='text-orange-500'>{message.name} </span></h1>
        <p className='text-xs font-normal text-gray-400'>{dateString} , {timeString}</p>
        </div>
        <p><b>Subject:</b> {message.subject}</p>  
        <div>
            <p className='font-bold'>Message</p>
            <p className='text-sm'>{message.message}</p>
        </div>
        <div>
        <p className='font-bold'>Contact Here</p>
        <p className="text-gray-400 text-sm">{message.email}</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default MessageMessage