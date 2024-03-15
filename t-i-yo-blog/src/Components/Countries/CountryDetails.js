import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryById } from "../../Managers/CountryManager";
import { getCitiesByCountryId } from "../../Managers/CountryManager";
import { getFoodByCountryId } from "../../Managers/CountryManager";
import { getPlacesByCountryId } from "../../Managers/CountryManager";
import { deleteCity } from "../../Managers/CityManager";
import { useNavigate } from "react-router-dom";
import { deleteFood } from "../../Managers/FoodManager";
import { deletePlace } from "../../Managers/PlaceManager";

export const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const [cities, setCities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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
  }

  const handleDeleteFood = (id) => {
    deleteFood(id)
  }

  const handleDeletePlace = (id) => {
    deletePlace(id)
  }

  return (
        <div class="container-fluid">
          <div class="row">
            <div class="col"></div>
            <div class="card text-center">
              <h3>
                 {country.name}
              </h3>
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

                <div class="container-fluid">
                  <div class="col">
                   <div class="row"> 
                   <div class="card text-row">
                    <h3 class="text-center">Cities:</h3>
                    <table class="table table-striped">
                      <tbody>
                      {cities.map((city) => (
                        <tr key={city.city?.id}>   
                          <td>{city.city?.name}
                          <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`/cities/edit/${city.city?.id}`)}>Update</button>
                         {places.some(x => x.place?.cityId === city.city?.id) ? <></> 
                         : 
                          <button class="btn btn-outline-danger btn-sm" onClick={() =>handleDeleteCity(`${city.city?.id}`)}>Delete</button>
                         }                      
                          </td>
                        </tr>                     
                        ))}
                      </tbody>
                      <button class="btn btn-outline-success btn-lg"  onClick={() =>navigate(`/cities/add/${id}`)}>Add</button>
                    </table>
                   </div>
                   </div>

                   <div class="container-fluid">
                  <div class="col">
                   <div class="row"> 
                   <div class="card text-row">
                    <h3 class="text-center">Food to try:</h3>
                    <table class="table table-striped">
                      <tbody>
                      {foods.map((food) => (
                        <tr key={food.food?.id}>
                          <td>{food.food?.name}
                          <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`/food/edit/${food.food?.id}`)}>Update</button>
                          {places.some(x => x.place?.foodId === food.food?.id) ? <></> 
                         : 
                          <button class="btn btn-outline-danger btn-sm" onClick={() =>handleDeleteFood(`${food.food?.id}`)}>Delete</button>
                          }
                          </td>
                        </tr>                     
                        ))}
                      </tbody>
                      <button class="btn btn-outline-success btn-lg" onClick={() =>navigate(`/food/add/${id}`)}>Add</button>
                    </table>
                   </div>
                   </div>

                <div class="container-fluid">
                  <div class="col">
                   <div class="row"> 
                   <div class="card text-row">
                    <h3 class="text-center">Places to visit:</h3>
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
                          <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`/places/edit/${place.place?.id}`)}>Update</button>
                          {places.some(x => x.place?.placeId === place.place?.id) ? <></> 
                         : 
                          <button class="btn btn-outline-danger btn-sm" onClick={() =>handleDeletePlace(`${place.place?.id}`)}>Delete</button>
                          }
                          </td>
                        </tr>                     
                        ))}
                      </tbody>
                      <button class="btn btn-outline-success btn-lg" onClick={() =>navigate(`/places/add/${id}`)}>Add</button>
                    </table>
                   </div>
                   </div>
                </div>
                 </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                     )
                      };