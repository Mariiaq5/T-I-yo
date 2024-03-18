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
        <div>
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
    );
};