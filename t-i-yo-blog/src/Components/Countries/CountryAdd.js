import React, { useState } from 'react';
import { addCountry } from '../../Managers/CountryManager';
import { useNavigate } from 'react-router';

  export const CountryAdd = ({ onSave }) => {
  const [newCountryName, setNewCountryName] = useState('');
  const navigate = useNavigate()
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newCountry = {
        name: newCountryName,
      };
      const response = await addCountry(newCountry);
      if (response.ok) {
        onSave();
        setNewCountryName('');
      } else {
        console.error('Failed to add country:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding country:', error);
    }
    navigate('/countries');
  };
  return (
    <div className='country-form'>
      <h1>Create a new Country</h1>
      <form onSubmit={handleSave}>
        <label>
          Country Name:
          <input type="text" value={newCountryName} onChange={(e) => setNewCountryName(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
//export default CountryList;