import React from 'react'

function OfferMessage({ offer, handleShowCompleteOffer }) {

    const createdAtDate = new Date(offer.createdAt);
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
    <div onClick={handleShowCompleteOffer} className='fixed inset-0 bg-gray-800 bg-opacity-50'></div>
    <div
    className='fixed max-w-lg w-full h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6'
    >
      <div className='w-full h-full text-gray-100 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl space-y-4 p-4 overflow-y-auto custom-scrollbar'>
        <div>
        <h1 className="font-bold text-xl">Offer for <span className='text-orange-500'>{offer.domain} </span></h1>
        <p className='text-xs font-normal text-gray-400'>{dateString} , {timeString}</p>
        </div>
        <p><b className='text-orange-500'>{offer.name}</b> offers ${offer.offer} for the domain Name {offer.domain}</p>
        <p className='text-6xl font-extrabold text-orange-500 text-center leading-tight'>${offer.offer}</p>
        
        {offer.Message &&
        <div>
            <p className='font-bold'>Message</p>
            <p className='text-sm'>{offer.Message}</p>
        </div>
        }
        <div>
        <p className='font-bold'>Contact Here</p>
        <p className="text-gray-400 text-sm">{offer.email}</p>
        {offer.whatsApp && <p className="text-gray-400 text-sm">{offer.whatsApp}</p>}
        </div>
        </div>
    </div>
    </>
  )
}

export default OfferMessage