import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addPlace } from '../../Managers/PlaceManager';
import { useParams } from 'react-router-dom';


  export const PlaceAdd = () => {
    const { id } = useParams();
    const [newPlace, setNewPlace] = useState({
      name: "",
      placeType: "",
      description: "",
      countryId: id
    });
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

  return (
    <div className='place-form'>
      <h1>Add a new Place</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Place Name:
        </label>
        <input type="text" id="name" name="name" value={newPlace.name} onChange={handleInputChange} />
        <label>
          Place Place Type:
        </label>
        <input type="text" id="name" name="placeType" value={newPlace.placeType} onChange={handleInputChange} />
        <label>
          Place Description:
        </label>
        <input type="text" id="name" name="description" value={newPlace.description} onChange={handleInputChange} />
        
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};