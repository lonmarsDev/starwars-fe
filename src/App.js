import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SearchBox from './SearchBox';
import CharacterSearch from './CharacterSearch';
import SavedItemsTable from './SavedItemsTable';

// uri: 'http://localhost:8080/query',

console.log("graph_url :", process.env.REACT_APP_SW_GRAPH_URL);

const client = new ApolloClient({
  uri: process.env.REACT_APP_SW_GRAPH_URL,
  cache: new InMemoryCache(),
});


const App = () => {
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setShowSavedItems(false);
    setSearchQuery(query);
  };

  const handleToggleSavedItems = () => {
    console.log("showSavedItems :", showSavedItems);
    if (showSavedItems === false) {
      setSearchQuery(null)
    }
    setShowSavedItems(!showSavedItems);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Starwars Character App</h1>
        <SearchBox onSearch={handleSearch} />
        <button onClick={handleToggleSavedItems}>
          {showSavedItems ? "Hide Saved Items" : "Show Saved Items"}
        </button>
        {searchQuery && <CharacterSearch name={searchQuery} />}
        {showSavedItems && <SavedItemsTable show={showSavedItems} />}
      </div>
    </ApolloProvider>
  );
};
export default App;