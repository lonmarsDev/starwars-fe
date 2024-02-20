import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

const SEARCH_CHARACTER = gql`
  query SearchCharacter($name: String!) {
    searchCharacter(filter: { name: $name }) {
      name
      cines
      starShips
    }
  }
`;

const SAVE_SEARCH = gql`
  mutation SaveSearchInput($input: SaveSearchInput!) {
    saveSearch(input: $input)
  }
`;

const CharacterSearch = ({ name }) => {
  
  const { loading, error, data } = useQuery(SEARCH_CHARACTER, {
    variables: { name },
  });

  const [savedCharacters, setSavedCharacters] = useState([]);
  const [saveSearch] = useMutation(SAVE_SEARCH);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { searchCharacter } = data;
  
  if (searchCharacter.length === 0) {
    return <p>No characters found.</p>;
  }

  const handleSave = async (character) => {
    try {
      // Pass the character data to the saveSearch mutation
      const { data } = await saveSearch({
        variables: {
          "input":{
          characters: [
            {
              name: character.name,
              cines: character.cines,
              startShips: character.starShips
            }
          ]
        }}
      });
      
      if (data.saveSearch) {
        // Update savedCharacters state to include the saved character
        setSavedCharacters([...savedCharacters, character.name]);
        console.log("Character saved:", character.name);
      } else {
        console.error("Failed to save character:", data.saveSearch);
      }
    } catch (error) {
      console.error("Error saving character:", error);
    }
  };
  
  const isCharacterSaved = (characterName) => {
    // Check if the character is already saved
    return savedCharacters.includes(characterName);
  };

  return (
      searchCharacter.map((character, index) => (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{character.name}</td>
              </tr>
              <tr >
                <td>Cine:</td>
                <td>{character.cines ? character.cines.join(', ') : '-'}</td>
              </tr>
              <tr >
                <td>Vehicle: </td>
                <td>{character.starShips ? character.starShips.join(', ') : '-'} </td>
              </tr>
              <tr>
                <td>
                <button onClick={() => handleSave(character)} disabled={isCharacterSaved(character.name)}>
                      {isCharacterSaved(character.name) ? "Saved" : "Save"}
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      ))
  );
};
export default CharacterSearch;