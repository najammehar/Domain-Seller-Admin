import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDomains,
  deleteDomain,
  getExtensions,
} from "../services/domainService";
import DomainDialog from "./DomainDialog";
import { setEmptyDomain } from "../store/domainSlice";
import { Loader, Input, DomainCard, Toast } from "../components";
import { debounce } from "lodash";
import { DoorClosed, X } from "lucide-react";

const Domain = () => {
  const dispatch = useDispatch();
  const { domains, loading, total, page, limit, totalPages, extensions } =
    useSelector((state) => state.domain);

  const [toast, setToast] = useState(null);

  const [filters, setFilters] = useState({
    searchName: "",
    extension: "",
    minLength: "1",
    maxLength: "64",
    minPrice: "1",
    maxPrice: "10000",
    status: "", // Default to 'available'
    isFeatured: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [domainToEdit, setDomainToEdit] = useState(null);

  const fetchDomains = useCallback(() => {
    const validFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    dispatch(getDomains(validFilters));
  }, [filters, dispatch]);

  const debouncedFetchDomains = useCallback(debounce(fetchDomains, 300), [
    fetchDomains,
  ]);

  useEffect(() => {
    dispatch(getExtensions());
  }, [dispatch]);
  useEffect(() => {
    if (
      filters.minLength &&
      filters.maxLength &&
      filters.minPrice &&
      filters.maxPrice
    ) {
      debouncedFetchDomains();
      return () => debouncedFetchDomains.cancel();
    }
  }, [debouncedFetchDomains]);
  useEffect(() => {
    dispatch(setEmptyDomain());
  }, [filters]);

  const handleShowMore = () => {
    dispatch(
      getDomains({
        ...filters,
        page: page + 1,
      })
    );
  };
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteClick = (domain) => {
    dispatch(deleteDomain(domain))
      .then(() => showToast("Domain deleted successfully", "success"))
      .catch((error) => showToast("Something went wrong", "error"));
  };

  const handleCreateClick = () => {
    setDomainToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (domain) => {
    setDomainToEdit(domain);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setDomainToEdit(null);
  };

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
    <div className="px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-orange-500 py-5">Domains</h1>
      <button
        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreateClick}
      >
        Add Domain
      </button>
      </div>
      
      <div className="grid grid-cols-4 gap-10">
        <div className=" hidden lg:block items-start col-span-1 space-y-4 shadow-lg shadow-gray-950 bg-opacity-50 rounded-md bg-gray-800 p-4 h-auto my-auto">
          <div>
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="extension"
            >
              Extension
            </label>
            <select
              name="extension"
              value={filters.extension}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              {extensions.map((extension) => (
                <option key={extension} value={extension}>
                  {extension}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Length
            </label>
            <div className="flex items-center justify-between gap-4">
              <Input
                type="number"
                name="minLength"
                value={filters.minLength}
                onChange={handleInputChange}
                placeholder="Min length"
                min="1"
                max="63"
                maxLength="25"
              />
              <p className="text-gray-100">to</p>
              <Input
                type="number"
                name="maxLength"
                value={filters.maxLength}
                onChange={handleInputChange}
                min="1"
                max="64"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Price
            </label>

            <div className="flex  items-center justify-between gap-4">
              <Input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                min="1"
                max="9999"
                className="p-2 border border-gray-300 rounded"
              />
              <p className="text-gray-100">to</p>
              <Input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                min="1"
                max="9999"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="on hold">On Hold</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="isFeatured"
            >
              Featured
            </label>
            <select
              name="isFeatured"
              value={filters.isFeatured}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
        </div>

        {/* Domain List */}
        <div className=" text-white lg:col-span-3 col-span-4">
          <Input
            type="text"
            name="searchName"
            value={filters.searchName}
            onChange={handleInputChange}
            placeholder="Search by domain name"
            className="mb-4"
          />
          
          <button
            className="lg:hidden w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-500 text-white font-bold py-2 px-4 mb-2 rounded"
            onClick={() => setIsOpened(!isOpened)}
          >
            Apply Filters
          </button>
          {domains.map((domain) => (
            <DomainCard
              key={domain.name}
              domain={domain}
              handleEditClick={handleEditClick}
              loading={loading}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
          {loading && (
          <div className='text-center'>
          <Loader size='h-8 w-8 mb-2 mx-auto' borderWidth='border-t-4' /></div>
          )}
          { !loading && domains.length === 0 &&(
            <p className="font-bold text-xl text-center">No domains found</p>
          )}

          {!loading && total !== 0 && (
            <p className="text-center">
              {domains.length} out of {total}
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

      <DomainDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        domainToEdit={domainToEdit}
        showToast={showToast}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>

    <div className={`fixed transition-all ease-in-out duration-500 ${isOpened ? 'inset-0' : 'inset-y-0 w-full -left-full'}  lg:hidden space-y-4 bg-gray-800 p-6`}>
          <div className="flex justify-between items-center">
            <h1 className="text-orange-500 font-bold text-xl">Filters</h1>
            <X size={24} className="text-orange-500 cursor-pointer" onClick={() => setIsOpened(false)} />
          </div>
          <div>
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="extension"
            >
              Extension
            </label>
            <select
              name="extension"
              value={filters.extension}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              {extensions.map((extension) => (
                <option key={extension} value={extension}>
                  {extension}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Length
            </label>
            <div className="flex items-center justify-between gap-4">
              <Input
                type="number"
                name="minLength"
                value={filters.minLength}
                onChange={handleInputChange}
                placeholder="Min length"
                min="1"
                max="63"
                maxLength="25"
              />
              <p className="text-gray-100">to</p>
              <Input
                type="number"
                name="maxLength"
                value={filters.maxLength}
                onChange={handleInputChange}
                min="1"
                max="64"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Price
            </label>

            <div className="flex  items-center justify-between gap-4">
              <Input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                min="1"
                max="9999"
                className="p-2 border border-gray-300 rounded"
              />
              <p className="text-gray-100">to</p>
              <Input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                min="1"
                max="9999"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="on hold">On Hold</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="isFeatured"
            >
              Featured
            </label>
            <select
              name="isFeatured"
              value={filters.isFeatured}
              onChange={handleInputChange}
              className="bg-gray-800 bg-opacity-50 placeholder-gray-500 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-gray-100 text-gray-100 border-gray-400"
            >
              <option value="">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
          <button
        className="block w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpened(false)}
      >
       Apply
      </button>
        </div>
    </>
  );
};

export default Domain;
