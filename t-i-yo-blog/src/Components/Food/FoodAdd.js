import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { addFood } from '../../Managers/FoodManager';


  export const addFood = ({ onSave }) => {
  const [newFoodName, setNewFoodName] = useState('');
  const navigate = useNavigate()


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newFood = {
        name: newFoodName,
      };
      const response = await addFood(newFood);
      if (response.ok) {
        onSave();
        setNewFoodName('');
      } else {
        console.error('Failed to add food:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
    navigate('/food');
  };
  return (
    <div className='food-form'>
      <h1>Add a new Food</h1>
      <form onSubmit={handleSave}>
        <label>
          Food Name:
          <input type="text" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} />
        </label>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
  );
};