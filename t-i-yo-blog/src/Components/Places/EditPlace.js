import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceById, editPlace } from "../../Managers/PlaceManager";

export const EditPlace = () => {
    const [place, setPlace] = useState({
        name: "",
        placeType: "",
        description: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getPlaceById(id)
            .then((data) => {
                setPlace(data[0]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editPlace(place).then(() => navigate(`/countries/details/${id}`));
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
                    <input type="text" id="placeType" name="placeType" value={place.placeType} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="description" name="description" value={place.description} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};