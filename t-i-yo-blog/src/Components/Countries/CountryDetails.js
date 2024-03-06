import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryById } from "../../Managers/CountryManager";
import { getCitiesByCountryId } from "../../Managers/CountryManager";
import { getFoodByCountryId } from "../../Managers/CountryManager";
import { getPlacesByCountryId } from "../../Managers/CountryManager";

export const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const [cities, setCities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);
  const { id } = useParams();

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
                          <td>{city.city?.name}</td>
                        </tr>                     
                        ))}
                      </tbody>
                    </table>
                   </div>
                   </div>

                   <div class="container-fluid">
                  <div class="col">
                   <div class="row"> 
                   <div class="card text-row">
                    <h3 class="text-center">Food to try:</h3>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                      {foods.map((food) => (
                        <tr key={food.food?.id}>
                          <td>{food.food?.name}</td>
                        </tr>                     
                        ))}
                      </tbody>
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
                          <td>{place.place?.description}</td>
                        </tr>                     
                        ))}
                      </tbody>
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