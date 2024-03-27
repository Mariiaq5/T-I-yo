import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getCountryById } from "../../Managers/CountryManager";
import { getCitiesByCountryId } from "../../Managers/CountryManager";
import { getFoodByCountryId } from "../../Managers/CountryManager";
import { getPlacesByCountryId } from "../../Managers/CountryManager";
import { deleteCity } from "../../Managers/CityManager";
import { useNavigate } from "react-router-dom";
import { deleteFood } from "../../Managers/FoodManager";
import { deletePlace } from "../../Managers/PlaceManager";
import { Button } from "reactstrap";
import { addPlace } from "../../Managers/PlaceManager";


export const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const [cities, setCities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const userString = localStorage.getItem("users");
  const userLS = JSON.parse(userString);

//console.log(country)
  const getCountry = () => {
    getCountryById(id).then((selectedCountry) => setCountry(selectedCountry[0]));
  };
  const getCities = () => {
    getCitiesByCountryId(id).then((selectedCity) => setCities(selectedCity));
  };
  const getFood = () => {
    getFoodByCountryId(id).then((selectedFood) => setFoods(selectedFood));
  };
  const getPlaces = () => {
    getPlacesByCountryId(id).then((selectedPlace) => setPlaces(selectedPlace));
  };

  useEffect(() => {
    getCountry();
  }, [id]);

  useEffect(() => {
    getCities();
  }, [id]);

  useEffect(() => {
    getFood();
  }, [id]);

    useEffect(() => {
    getPlaces();
  }, [id]);

  const handleDeleteCity = (id) => {
    deleteCity(id)
    .then(getCities)
  }

  const handleDeleteFood = (id) => {
    deleteFood(id)
    .then(getFood)
  }

  const handleDeletePlace = (id) => {
    deletePlace(id)
    .then(getPlaces)
  }

  return (
    <div style={{ backgroundColor: '#9AA0A8'}}>
        <div class="container-fluid">
          <div class="row">
            <div class="card text-center" style={{ backgroundColor: '#9AA0A8'}}>
              <h2>
                 {country.name}
              </h2>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  {country.description}
                </li>
                <li class="list-group-item"> 
                  {country.slogan}
                </li>
                <li class="list-group-item">
                  {country.capital}
                </li>
                </ul>

                    <h3 class="text-center" style={{ backgroundColor: '#9AA0A8'}}>Cities:</h3>
                    { userLS.admin == true ? (
                  <>
                <button class="btn btn-outline-dark btn-lg"  onClick={() => navigate(`/cities/add/${id}`)}>Add</button>
                 </>
                 ) : (<></>)
                }
                    <table class="table table-striped">
                      <tbody>
                      {cities.map((city) => (
                        <tr key={city.city?.id}>   
                          <td>{city.city?.name}
                          { userLS.admin == true ? (
                  <>
                <button class="btn btn-outline-dark btn-sm" onClick={() => navigate(`/cities/edit/${city.city?.id}`)}>Update</button>
                {places.some(x => x.place?.cityId === city.city?.id) ? <></> 
                         : 
                          <button class="btn btn-outline-danger btn-sm" onClick={() => handleDeleteCity(`${city.city?.id}`)}>Delete</button>
                         } 
                 </>
                 ) : (<></>)
                }
                          </td>
                        </tr>                     
                        ))}
                      </tbody>

                    </table>

                    <h3 class="text-center">Food to try:</h3>
                    { userLS.admin == true ? (
                  <>
                  <button class="btn btn-outline-dark btn-lg" onClick={() =>navigate(`/food/add/${id}`)}>Add</button>
                 </>
                 ) : (<></>)
                }
                    <table class="table table-striped">
                      <tbody>
                      {foods.map((food) => (
                        <tr key={food.food?.id}>
                          <td>{food.food?.name}
                          { userLS.admin == true ? (
                  <>
                  <button class="btn btn-outline-dark btn-sm" onClick={() =>navigate(`/food/edit/${food.food?.id}`)}>Update</button>
                  {places.some(x => x.place?.foodId === food.food?.id) ? <></> 
                  : 
                  <button class="btn btn-outline-danger btn-sm" onClick={() =>handleDeleteFood(`${food.food?.id}`)}>Delete</button>
                  }
                 </>
                 ) : (<></>)
                }
                          </td>
                        </tr>                     
                        ))}
                      </tbody>
                    </table>

                    <h3 class="text-center">Places to visit:</h3>
                    { userLS.admin == true ? (
                  <>
                      <button class="btn btn-outline-dark btn-lg" onClick={() =>navigate(`/places/add/${id}`)}>Add</button>
                 </>
                 ) : (<></>)
                }
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Place Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                      {places.map((place) => (
                        <tr key={place.place?.id}>
                          <td>{place.place?.name}</td>
                          <td>{place.place?.placeType}</td>
                          <td>{place.place?.description}
                          { userLS.admin == true ? (
                  <>
                  <button class="btn btn-outline-dark btn-sm" onClick={() =>navigate(`/places/edit/${place.place?.id}`)}>Update</button>
                  {places.some(x => x.place?.placeId === place.place?.id) ? <></> 
                  : 
                  <button class="btn btn-outline-danger btn-sm" onClick={() =>handleDeletePlace(`${place.place?.id}`)}>Delete</button>
                  }
                 </>
                 ) : (<></>)
                }
                          </td>
                        </tr>                     
                        ))}
                      </tbody>
                    </table>
                   </div>
                   </div>
                   </div>
                   <Button class="btn btn-link" color='dark' size="sm" onClick={() => navigate(`/countries`)}>Back to countries</Button>
                   </div>
                     )
                      }; 