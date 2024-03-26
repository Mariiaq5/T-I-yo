import React, { useState } from 'react';
import { addCountry } from '../../Managers/CountryManager';
import { useNavigate } from 'react-router';

  export const CountryAdd = ({ onSave }) => {
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryDescription, setNewCountryDescription] = useState('');
  const [newCountrySlogan, setNewCountrySlogan] = useState('');
  const [newCountryCapital, setNewCountryCapital] = useState('');
  const [newCountryImageUrl, setNewCountryImageUrl] = useState('');
  const navigate = useNavigate()


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newCountry = {
        name: newCountryName,
        description: newCountryDescription,
        slogan: newCountrySlogan,
        capital: newCountryCapital,
        imageUrl: newCountryImageUrl,
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
<div style={{ 
    backgroundImage: 'url("https://i.pinimg.com/originals/4e/32/e3/4e32e317ae668e90aa1b6672407d2e6f.jpg")', 
    backgroundPosition: 'center', 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <div style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      padding: '20px', 
      borderRadius: '10px' 
    }} className='country-form'>
      <h1>Create a new Country</h1>
      <form onSubmit={handleSave}>
        <label>
          Country Name:
          <input type="text" value={newCountryName} onChange={(e) => setNewCountryName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={newCountryDescription} onChange={(e) => setNewCountryDescription(e.target.value)} />
        </label>
        <label>
          Slogan:
          <input type="text" value={newCountrySlogan} onChange={(e) => setNewCountrySlogan(e.target.value)} />
        </label>
        <label>
          Capital:
          <input type="text" value={newCountryCapital} onChange={(e) => setNewCountryCapital(e.target.value)} />
        </label>
        Image Url:
        <label>
        <input type='url' value={newCountryImageUrl} onChange={(e) => setNewCountryImageUrl(e.target.value)} />
        </label>
        <button type="submit" class="btn btn-success">Save</button>       
      </form>
    </div>
    </div>
  );
};