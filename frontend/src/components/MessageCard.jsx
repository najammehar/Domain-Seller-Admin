import React, { useState } from 'react';
import Loader from './Loader';
import { Trash2 } from 'lucide-react';
import MessageMessage from './MessageMessage';
import { markAsReadService } from '../services/messageService';
import { useDispatch } from 'react-redux';

function MessageCard({ message, loading, handleDeleteClick }) {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [showCompleteMessage, setShowCompleteMessage] = useState(false);
    const [localMessage, setLocalMessage] = useState(message); // Use local state to update the message
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.stopPropagation();
        setDeleteDialog(true);
    };

    const handleYes = () => {
        setDeleteDialog(false);
        handleDeleteClick(localMessage._id);
    };

    const handleNo = () => {
        setDeleteDialog(false);
    };

    const handleShowCompleteMessage = () => {
        setShowCompleteMessage(!showCompleteMessage);
    };

    const handleCardClick = async () => {
        if (!localMessage.read) {
            setLocalMessage((prevMessage) => ({
                ...prevMessage,
                read: true,
            }));
            dispatch(markAsReadService(localMessage._id));
        }
        handleShowCompleteMessage();
    };

    const createdAtDate = new Date(localMessage.createdAt);
    const dateString = createdAtDate.toLocaleDateString();
    const timeString = createdAtDate.toLocaleTimeString();

    return (
        <>
            <div
                onClick={handleCardClick}
                className={`flex ${localMessage.read ? 'bg-gray-800' : 'bg-gray-600'} cursor-pointer hover:scale-[1.01] duration-300 justify-between items-center p-2 bg-opacity-50 rounded-md mb-2`}
            >
                <div>
                    <p className="text-gray-100 font-bold">
                        Received a Message from <span className='text-orange-500'>{localMessage.name}</span>
                    </p>
                    <p className="text-xs text-gray-500">{dateString}, {timeString}</p>
                </div>
                <div>
                    <button
                        className="text-white hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded-full"
                        onClick={handleDelete}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
            {deleteDialog && (
                <>
                    <div onClick={handleNo} className='fixed inset-0 bg-gray-800 bg-opacity-50'></div>
                    <div className='fixed p-6 max-w-96 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl p-4 rounded shadow-lg'>
                            <h1 className='text-lg font-bold text-gray-100'>
                                Are you sure you want to delete this message?
                            </h1>
                            <div className='flex justify-end gap-4 mt-4'>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                                    onClick={handleYes}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                                    onClick={handleNo}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showCompleteMessage && (
                <MessageMessage 
                    message={localMessage}
                    handleShowCompleteMessage={handleShowCompleteMessage}
                />
            )}
        </>
    );
}

export default MessageCard;
