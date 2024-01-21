import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchResults } from '../../store/searchSlice';
import { searchProducts } from '../../store/productSlice';
import { useParams } from 'react-router-dom';

const SearchPage = () => {
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.search);
    const { query } = useParams();

    useEffect(() => {
        const fetchSearchResultsAsync = async () => {
            try {
                if (!query) {
                    // No need to search if the query parameter is empty
                    return;
                }
    
                console.log('searchTerm:', query);
    
                // Search products based on the search term
                const response = await dispatch(searchProducts(query));
                console.log('response:', response);
    
                // Ensure the response is OK before attempting to read the JSON
                if (!response.ok) {
                    throw new Error(`Error searching products: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log('data:', data);
    
                // Update the search results in the store
                dispatch(updateSearchResults(data));
            } catch (error) {
                console.error('Error searching products:', error.message);
            }
        };
    
        fetchSearchResultsAsync();
    }, [dispatch, query]);
    

    return (
        <main>
            <h2>Search Results for: {query}</h2>
            {/* Display search results here */}
            {searchResults.map((result) => (
                <div key={result.id}>{result.name}</div>
            ))}
        </main>
    );
};

export default SearchPage;
