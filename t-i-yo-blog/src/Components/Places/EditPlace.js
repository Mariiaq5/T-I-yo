import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceById, editPlace } from "../../Managers/PlaceManager";

export const EditPlace = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({
        name: "",
        placeType: "",
        description: "",
        countryId: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        getPlaceById(id)
            .then((data) => {
                setPlace(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editPlace(place).then(() => navigate(`/countries/details/${place.countryId}`));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlace((prevPlace) => ({
            ...prevPlace,
            [name]: value
        }));
    };

    return (
<div style={{ 
    backgroundImage: 'url("https://i.pinimg.com/564x/91/af/80/91af803f57bf190ff9de770617de7434.jpg")', 
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
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={place.name} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="placeType" placeholder="placeType" name="placeType" value={place.placeType} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="description" placeholder="description" name="description" value={place.description} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
        </div>
    );
};