import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_SAVED_CHARACTERS = gql`
  query GetSavedCharacters {
    getSavedCharacter {
      name
      starShips
      cines
    }
  }
`;

const SavedItemsTable = ({ show }) => {
  const [showTable, setShowTable] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_SAVED_CHARACTERS);

  useEffect(() => {
    if (show) {
      setShowTable(true);
      refetch();
    } else {
      setShowTable(false);
    }
  }, [show, refetch]);

  if (!showTable) return null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getSavedCharacter  === 0) {
    return <p>No saved items</p>;
  }

  return (
    <div>
      <h3>Saved Items</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Movies</th>
            <th>Vehicle Model</th>
          </tr>
        </thead>
        <tbody>
          {data.getSavedCharacter.map((character, index) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>{character.cines.join(', ')}</td>
              <td>{character.starShips ? character.starShips.join(', ') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedItemsTable;