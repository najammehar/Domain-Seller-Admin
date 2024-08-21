import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OfferCard } from '../components'
import { getOffers } from '../services/offerService'
import { deleteOffer } from '../services/offerService'
import { Toast, Loader } from '../components'

function Offer() {
    const dispatch = useDispatch()
    const [toast, setToast] = useState(null);
    const { offers, loading, total, page, totalPages } = useSelector(
        (state) => state.offer
    )

    useEffect(() => {
        dispatch(getOffers(page))
    }, [dispatch])

    const handleShowMore = () => {
        dispatch(getOffers(page + 1))
    }

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
      };
    
      const handleDeleteClick = (id) => {
        dispatch(deleteOffer(id))
          .then(() => showToast("Offer deleted successfully", "success"))
          .catch((error) => showToast("Something went wrong", "error"));
      };



  return (
    <>
    <div className='max-w-7xl px-6'>
        <div className='text-orange-500 font-bold text-3xl py-5'>
            Offers
        </div>
        <div >
          
          {offers.map((offer) => (
            <OfferCard
                key={offer._id}
              offer={offer}
              loading={loading}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
          {loading && (
          <div className='text-center'>
          <Loader size='h-8 w-8 mb-2 mx-auto' borderWidth='border-t-4' /></div>
          )}
          {offers.length === 0  && (
            <p className="font-bold text-xl text-center">No Offers Available</p>
          )}

          {total !== 0 && (
            <p className="text-center text-gray-100">
              {offers.length} out of {total}
            </p>
          )}
          {page < totalPages && (
            <button
              className="w-fit mx-auto block bg-orange-500 hover:bg-orange-600 active:bg-orange-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
    </div>
    {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default Offer