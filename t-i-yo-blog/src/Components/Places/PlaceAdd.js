import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addPlace } from '../../Managers/PlaceManager';

  export const addPlace = ({ onSave }) => {
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceType, setPlaceType] = useState('');
  const [newPlaceDescription, setPlaceDescription] = useState('');
  const navigate = useNavigate()


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newPlace = {
        name: newPlaceName,
        placeType: newPlaceType,
        description: newPlaceDescription,
      };
      const response = await addPlaces(newPlaces);
      if (response.ok) {
        onSave();
        setNewPlaceName('');
      } else {
        console.error('Failed to add place:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding place:', error);
    }
    navigate('/places');
  };
  return (
    <div className='place-form'>
      <h1>Add a new Place</h1>
      <form onSubmit={handleSave}>
        <label>
          Place Name:
          <input type="text" value={newPlaceName} onChange={(e) => setNewPlaceName(e.target.value)} />
        </label>
        <label>
          Place Type:
          <input type="text" value={newPlaceType} onChange={(e) => setNewPlaceType(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={newCountryDescription} onChange={(e) => setNewCountryDescription(e.target.value)} />
        </label>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};