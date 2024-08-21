import React, {useState} from 'react'
import Loader from './Loader'
import { Pencil, Trash2 } from 'lucide-react';

function DomainCard({ domain, handleEditClick, loading, handleDeleteClick }) {
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleDelete= (domain) => {
        setDeleteDialog(true);
    }
    const handleYes = (domain) => {
        setDeleteDialog(false);
        handleDeleteClick(domain);
    }
    const handleNo = () => {
        setDeleteDialog(false);
    }
  return (
    <>
       <div key={domain.name} className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-50 rounded-md mb-2">
              <div>
                <a href={domain.urlToBuy} target='_blank' className="text-orange-500 hover:underline font-bold">{domain.name}{domain.extension}</a>
                <p className="text-sm text-gray-500">{domain.status}</p>
              </div>
              <div>
              <button
                className="text-white hover:bg-gray-800 hover:bg-opacity-50 p-2  rounded-full"
                onClick={() => handleEditClick(domain)}
              >
                <Pencil size={20} />
              </button>
              <button
                className="text-white hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded-full"
                onClick={() => handleDelete(domain)}
              >
                <Trash2 size={20}/>
              </button>
              </div>
        </div> 
        {deleteDialog && (
          <>
          <div onClick={() => handleNo()} className='fixed inset-0 bg-gray-800 bg-opacity-50'></div>
          <div className='fixed p-4 max-w-96 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl p-4 rounded shadow-lg'>
                  <h1 className='text-lg font-bold'>Are you sure you want to delete {domain.name}?</h1>
                  <div className='flex justify-end gap-4 mt-4'>
                      <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                          onClick={() => handleYes(domain)}
                      >
                          Yes
                      </button>
                      <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                          onClick={() => handleNo()}
                      >
                          No
                      </button>
                  </div>
              </div>


          </div>
          </>
        )}
    </>
  )
}

export default DomainCard