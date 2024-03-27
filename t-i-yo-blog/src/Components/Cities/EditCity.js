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
                setCity(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editCity(city).then(() => navigate(`/countries/details/${city.countryId}`));
    };

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setCity((prevCity) => ({
    //         ...prevCity,
    //         [name]: value
    //     }));
    // };

    return (
<div style={{ 
    backgroundImage: 'url("https://i.pinimg.com/564x/f3/08/34/f30834f637020559cb8fd160a10f9253.jpg")', 
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
    }} className='city-form'>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={city.name} onChange={(e) => {
                        const copy = {...city}
                        copy.name = e.target.value
                        setCity(copy)
                    }
                    } />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
        </div>
    );
};