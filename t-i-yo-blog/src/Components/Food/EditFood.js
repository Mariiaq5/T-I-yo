import { useState, useEffect } from "react";
import { editFood, getFoodById } from "../../Managers/FoodManager";
import { useParams, useNavigate } from "react-router-dom";

export const EditFood = () => {
    const [food , setFood] = useState({
        name: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getFoodById(id)
            .then((data) => {
                setFood(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editFood(food).then(() => navigate(`/countries/details/${food.countryId}`));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFood((prevFood) => ({
            ...prevFood,
            [name]: value
        }));
    };

    return (
<div style={{ 
    backgroundImage: 'url("https://i.pinimg.com/564x/06/36/c5/0636c51c86cf9625e84277464d68d946.jpg")', 
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
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={food.name} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
        </div>
    );
};