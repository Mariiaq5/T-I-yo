import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addFood, getFoodById } from '../../Managers/FoodManager';
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
<div style={{ 
    backgroundImage: 'url("https://st3.depositphotos.com/5510056/13635/i/450/depositphotos_136359822-stock-photo-collage-from-different-pictures-of.jpg")', 
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
      <h1>Add a new Food</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Food Name:
        </label>
        <input type="text" id="name" name="name" value={newFood.name} onChange={handleInputChange} />
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
    </div>
  );
};