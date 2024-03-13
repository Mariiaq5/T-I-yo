import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addCity } from '../../Managers/CityManager';


  export const addCity = ({ onSave }) => {
  const [newCityName, setNewCountryName] = useState('');
  const navigate = useNavigate()


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newCity = {
        name: newCityName,
      };
      const response = await addCity(newCity);
      if (response.ok) {
        onSave();
        setNewCityName('');
      } else {
        console.error('Failed to add city:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding city:', error);
    }
    navigate('/cities');
  };
  return (
    <div className='city-form'>
      <h1>Add a new City</h1>
      <form onSubmit={handleSave}>
        <label>
          City Name:
          <input type="text" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} />
        </label>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};