import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addFood } from '../../Managers/FoodManager';
import { useParams } from 'react-router-dom';


  export const FoodAdd = () => {
    const { id } = useParams();
    const [newFood, setNewFood] = useState({
      name: "",
      countryId: id
    });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewFood({
      ...newFood,
      [name]: value
    });
  };

  const handleSubmit = () => {
    addFood(newFood)
    navigate(`/countries/details/${id}`)
  };

  return (
    <div className='food-form'>
      <h1>Add a new Food</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Food Name:
        </label>
        <input type="text" id="name" name="name" value={newFood.name} onChange={handleInputChange} />
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};