import { useState, useEffect } from "react";
import { editCity, getCityById } from "../../Managers/CityManager";
import { useParams, useNavigate } from "react-router-dom";

export const EditCity = () => {
    const [city, setCity] = useState({
        name: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCityById(id)
            .then((data) => {
                setCity(data[0]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editCity(city).then(() => navigate(`/countries/details/${city.countryId}`));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCity((prevCity) => ({
            ...prevCity,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={city.name} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};