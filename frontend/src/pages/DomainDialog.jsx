import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDomain, updateDomain } from '../services/domainService';
import { Input } from '../components';
import { setErrorNull } from '../store/domainSlice';

const DomainDialog = ({ isOpen, onClose, domainToEdit = null, showToast }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.domain.loading);
  const error = useSelector(state => state.domain.error);

  const [domain, setDomain] = useState({
    name: '',
    extension: '',
    status: '',
    description: '',
    price: '',
    autoRenewal: false,
    renewalPrice: '',
    registrationDate: '',
    expirationDate: '',
    isFeatured: false,
    urlToBuy: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (domainToEdit) {
      setDomain({
        ...domainToEdit,
        registrationDate: domainToEdit.registrationDate ? new Date(domainToEdit.registrationDate).toISOString().split('T')[0] : '',
        expirationDate: domainToEdit.expirationDate ? new Date(domainToEdit.expirationDate).toISOString().split('T')[0] : ''
    });
    }
  }, [domainToEdit]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDomain(prevDomain => ({
      ...prevDomain,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  
  const handleClose = () => {
    setErrors({});
    setDomain({
        name: '',
        extension: '',
        status: '',
        description: '',
        price: '',
        autoRenewal: false,
        renewalPrice: '',
        registrationDate: '',
        expirationDate: '',
        isFeatured: false,
        urlToBuy: ''
    });
    onClose();
    dispatch(setErrorNull());
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!domain.name) newErrors.name = 'Name is required';
    if (!domain.extension) newErrors.extension = 'Extension is required';
    if (!domain.price) newErrors.price = 'Price is required';
    if (!domain.status) newErrors.status = 'Status is required';
    if (!domain.description) newErrors.description = 'Description is required';
    if (!domain.registrationDate) newErrors.registrationDate = 'Registration date is required';
    if (!domain.expirationDate) newErrors.expirationDate = 'Expiration date is required';
    if (!domain.urlToBuy) newErrors.urlToBuy = 'URL to buy is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (domainToEdit) {
      await dispatch(updateDomain(domain))
        if(!error){
          showToast('Domain updated successfully', 'success');
          handleClose();
        }else{
          showToast(error, 'error');
        };
    } else {
      await dispatch(createDomain(domain))
      if(!error){
        showToast('Domain created successfully', 'success');
        handleClose();
      }else{
        showToast(error, 'error');
      };
    }
    
  };



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

  if (!isOpen) return null;

  return (
    <>
    <style>{scrollbarStyles}</style>
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-screen w-full z-50 flex items-center justify-center">
      <div className="relative mx-4 p-5 max-w-xl w-full h-3/4 overflow-y-auto shadow-lg shadow-gray-950 rounded-md bg-gray-900 custom-scrollbar">
        <h3 className="text-xl text-center text-orange-500 font-bold mb-4">
          {domainToEdit ? 'Edit Domain' : 'Create Domain'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Domain Name
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              value={domain.name || ''}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter domain name"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="extension">
              Extension
            </label>
            <Input
              id="extension"
              type="text"
              name="extension"
              value={domain.extension  || ''}
              onChange={handleChange}
              error={errors.extension}
              placeholder="Enter extension"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="urlToBuy">
            URL To Buy
            </label>
            <Input
              id="urlToBuy"
              type="text"
              name="urlToBuy"
              value={domain.urlToBuy  || ''}
              onChange={handleChange}
              error={errors.urlToBuy}
              placeholder="Enter URL to buy"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select 
    name="status"
    value={domain.status || ''}  // Add a fallback empty string
    id="status"
    onChange={handleChange}
    className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
  >
    <option value="">Select a status</option>  // Add a default option
    <option value="available">Available</option>
    <option value="sold">Sold</option>
    <option value="on hold">On Hold</option>
    <option value="expired">Expired</option>
  </select>
  {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="caret-orange-500 bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
              id="description"
              name="description"
              value={domain.description  || ''}
              onChange={handleChange}
              rows="4"
              placeholder="Enter description"
            ></textarea>
            {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <Input
              id="price"
              type="number"
              name="price"
              value={domain.price  || ''}
              onChange={handleChange}
              error={errors.price}
              placeholder="Enter price"
              
            />
          </div>

          <div className='flex justify-between'>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="autoRenewal"
                checked={domain.autoRenewal}
                onChange={handleChange}
                className="h-5 w-5  text-orange-500"
              />
              <span className="ml-2 text-gray-300">Auto Renewal</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={domain.isFeatured  || ''}
                onChange={handleChange}
                className="h-5 w-5 text-orange-500"
              />
              <span className="ml-2 text-gray-300">Featured</span>
            </label>
          </div>
          </div>
          

          <div className="mb-4">    
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="renewalPrice">
              Renewal Price
            </label>
            <Input
              id="renewalPrice"
              type="number"
              name="renewalPrice"
              value={domain.renewalPrice  || ''}
              onChange={handleChange}
              placeholder="Enter renewal price"
              className={!domain.autoRenewal ? 'bg-gray-500' : ''}
              disabled={!domain.autoRenewal}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="registrationDate">
              Registration Date
            </label>
            <Input
              id="registrationDate"
              type="date"
              name="registrationDate"
              value={domain.registrationDate  || ''}
              onChange={handleChange}
              error={errors.registrationDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="expirationDate">
              Expiration Date
            </label>
            <Input
              id="expirationDate"
              type="date"
              name="expirationDate"
              value={domain.expirationDate  || ''}
              onChange={handleChange}
              error={errors.expirationDate}
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {domainToEdit ? 'Update' : 'Create'}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default DomainDialog;