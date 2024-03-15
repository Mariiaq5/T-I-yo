import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addCity } from '../../Managers/CityManager';
import { useParams } from 'react-router-dom';


  export const CityAdd = () => {
    const { id } = useParams();
    const [newCity, setNewCity] = useState({
      name: "",
      countryId: id
    });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewCity({
      ...newCity,
      [name]: value
    });
  };

  const handleSubmit = () => {
    addCity(newCity)
    navigate(`/countries/details/${id}`)
  };

  return (
    <div className='city-form'>
      <h1>Add a new City</h1>
      <form onSubmit={handleSubmit}>
        <label>
          City Name:
        </label>
        <input type="text" id="name" name="name" value={newCity.name} onChange={handleInputChange} />
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};