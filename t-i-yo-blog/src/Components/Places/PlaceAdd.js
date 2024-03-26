import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { addPlace } from '../../Managers/PlaceManager';
import { useParams } from 'react-router-dom';
import { getCitiesByCountryId } from "../../Managers/CountryManager";


  export const PlaceAdd = () => {
    const { id } = useParams();
    const [newPlace, setNewPlace] = useState({
      name: "",
      placeType: "",
      description: "",
      countryId: id,
      cityId: ""
    });
  const [cities, setCities] = useState([]);
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPlace({
      ...newPlace,
      [name]: value
    });
  };

  const handleSubmit = () => {
    addPlace(newPlace)
    navigate(`/countries/details/${id}`)
  };

  const getCities = () => {
    getCitiesByCountryId(id).then((selectedCity) => setCities(selectedCity));
  };

  useEffect(() => {
    getCities();
  }, [id]);

  return (
<div style={{ 
    backgroundImage: 'url("https://i.pinimg.com/564x/6c/df/3d/6cdf3dcb506df77b133cdf4b2fff0a5e.jpg")', 
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
    }} className='place-form'>
      <h1>Add a new Place</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Place Name:
        </label>
        <input type="text" id="name" name="name" value={newPlace.name} onChange={handleInputChange} />
        <label>
          Place Type:
        </label>
        <input type="text" id="name" name="placeType" value={newPlace.placeType} onChange={handleInputChange} />
        <label>
          Place Description:
        </label>
        <input type="text" id="name" name="description" value={newPlace.description} onChange={handleInputChange} />
        <div>
        <label htmlFor="cityId">City ID:</label>
        <select id="cityId" name="cityId" value={newPlace.cityId} onChange={handleInputChange}>
          <option value="" disabled>Select a city</option>
          {cities.map(city => (
            <option key={city.id} value={city.city?.id}>{city.city?.name}</option>
          ))}
        </select>
      </div>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
    </div>
  );
};