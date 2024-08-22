import { 
    addDomainStart, 
    addDomainSuccess, 
    addDomainFailure,
    updateDomainStart, 
    updateDomainSuccess, 
    updateDomainFailure,
    getDomainsStart,
    getDomainsSuccess,
    getDomainsFailure,
    deleteDomainStart,
    deleteDomainSuccess,
    deleteDomainFailure,
    getExtensionsStart,
    getExtensionsSuccess,
    getExtensionsFailure
} from "../store/domainSlice.js";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/domains" : "/api/domains";


const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  }

export const createDomain = (domain) => async (dispatch) => {
    dispatch(addDomainStart());
    try {
        const response = await fetch(`${API_URL}/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(domain),
        });
        const data = await handleResponse(response);
        dispatch(addDomainSuccess(data.domain));
    } catch (error) {
        dispatch(addDomainFailure(error.message));
    }
}

export const updateDomain = (domain) => async (dispatch) => {
    dispatch(updateDomainStart());
    try {
        const response = await fetch(`${API_URL}/update`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(domain),
        });
        const data = await handleResponse(response);
        dispatch(updateDomainSuccess(data.domain));
    } catch (error) {
        dispatch(updateDomainFailure(error.message));
    }
}

export const getDomains = (filters) => async (dispatch) => {
    dispatch(getDomainsStart());
    try {
        const queryParams = new URLSearchParams();

        // Add only those filters that are provided
        if (filters.page) queryParams.append('page', filters.page);
        if (filters.limit) queryParams.append('limit', filters.limit);
        if (filters.extension) queryParams.append('extension', filters.extension);
        if (filters.minLength) queryParams.append('minLength', filters.minLength);
        if (filters.maxLength) queryParams.append('maxLength', filters.maxLength);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
        if (filters.status) queryParams.append('status', filters.status);
        filters.isFeatured ? queryParams.append('isFeatured', filters.isFeatured) : null;
        if (filters.searchName) queryParams.append('searchName', filters.searchName);

        // Construct the full URL with query parameters
        const url = `${API_URL}/get-domain?${queryParams.toString()}`;
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await handleResponse(response);
        dispatch(getDomainsSuccess({
            data: data.data,       // domains array
            total: data.total,        // total number of domains
            page: data.page,          // current page
            limit: data.limit,        // number of domains per page
            totalPages: data.totalPages // total number of pages
        }));
    } catch (error) {
        dispatch(getDomainsFailure(error.message));
    }
}

export const deleteDomain = (domain) => async (dispatch) => {
    dispatch(deleteDomainStart());
    try {
        const response = await fetch(`${API_URL}/delete/${domain.name}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await handleResponse(response);
        dispatch(deleteDomainSuccess(data));
    } catch (error) {
        dispatch(deleteDomainFailure(error.message));
    }
}

export const getExtensions = () => async (dispatch) => {
    dispatch(getExtensionsStart());
    try {
        const response = await fetch(`${API_URL}/get-extensions`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await handleResponse(response);
        dispatch(getExtensionsSuccess(data.data));
        console.log(data.data);
        
    } catch (error) {
        dispatch(getExtensionsFailure(error.message));
    }
}