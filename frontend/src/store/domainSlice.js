import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domains: [],
    extensions: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    loading: false,
    error: null,
};

export const domainSlice = createSlice({
    name: "domain",
    initialState,
    reducers:{
        addDomainStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addDomainSuccess: (state, action) => {
            state.loading = false;
            state.total += 1;
            // check if the extension in the new added domain already exists if it does not add it to the list
            if (!state.extensions.find(extension => extension === action.payload.extension)) {
                state.extensions.push(action.payload.extension);
            }
            state.domains.push(action.payload);
        },
        addDomainFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateDomainStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateDomainSuccess: (state, action) => {
            state.loading = false;
            state.domains = state.domains.map(domain => domain.name === action.payload.name ? action.payload : domain);
        },
        updateDomainFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteDomainStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteDomainSuccess: (state, action) => {
            state.loading = false;
            state.total -= 1;
            state.domains = state.domains.filter(domain => domain.name !== action.payload.data);
        },
        deleteDomainFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getDomainsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getDomainsSuccess: (state, action) => {

            state.loading = false;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.totalPages = action.payload.totalPages;
            
            
            // Create a map to track unique domain names
            const domainMap = new Map();
        
            // Add existing domains to the map
            state.domains.forEach(domain => {
                domainMap.set(domain.name, domain);
            });
        
            // Add new domains from the payload to the map (automatically handles duplicates)
            action.payload.data.forEach(domain => {
                domainMap.set(domain.name, domain);
            });
        
            // Convert the map back to an array
            state.domains = Array.from(domainMap.values());
        },
        
        getDomainsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getExtensionsStart: (state) => {
            state.loading = true;
        },
        getExtensionsSuccess: (state, action) => {
            state.loading = false;
            state.extensions = action.payload;
        },
        getExtensionsFailure: (state) => {
            state.loading = false;
        },
        setEmptyDomain: (state) => {
            state.domains = [];
        },
        setErrorNull: (state) => {
            state.error = null;
        }

    }
})

export const { 
    addDomainStart, 
    addDomainSuccess, 
    addDomainFailure, 
    updateDomainStart, 
    updateDomainSuccess, 
    updateDomainFailure,
    getDomainsStart,
    getDomainsSuccess,
    getDomainsFailure,
    setEmptyDomain,
    deleteDomainStart,
    deleteDomainSuccess,
    deleteDomainFailure,
    setErrorNull,
    getExtensionsStart,
    getExtensionsSuccess,
    getExtensionsFailure
} = domainSlice.actions;
export default domainSlice.reducer;