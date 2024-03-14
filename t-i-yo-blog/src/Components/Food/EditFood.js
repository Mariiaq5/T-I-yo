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
                setFood(data[0]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editFood(food).then(() => navigate(`/countries/details/${id}`));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFood((prevFood) => ({
            ...prevFood,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={food.name} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};