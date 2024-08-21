import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageCard } from '../components'
import { getMessages } from '../services/messageService'
import { deleteMessage } from '../services/messageService'
import { Toast, Loader } from '../components'

function Message() {
    const dispatch = useDispatch()
    const [toast, setToast] = useState(null);
    const { messages, loading, total, page, totalPages } = useSelector(
        (state) => state.message
    )

    useEffect(() => {
        dispatch(getMessages(page))
    }, [dispatch])

    const handleShowMore = () => {
        dispatch(getMessages(page + 1))
    }

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
      };
    
      const handleDeleteClick = (id) => {
        dispatch(deleteMessage(id))
          .then(() => showToast("Message deleted successfully", "success"))
          .catch((error) => showToast("Something went wrong", "error"));
      };



  return (
    <>
    <div className='max-w-7xl px-6'>
        <div className='text-orange-500 font-bold text-3xl py-5'>
            Messages
        </div>
        <div >
          
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              loading={loading}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
          {loading && (
          <div className='text-center'>
          <Loader size='h-8 w-8 mb-2 mx-auto' borderWidth='border-t-4' /></div>
          )}
          {messages.length === 0  && (
            <p className="font-bold text-xl text-center">No Messages Available</p>
          )}

          {total !== 0 && (
            <p className="text-center text-gray-100">
              {messages.length} out of {total}
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

export default Message