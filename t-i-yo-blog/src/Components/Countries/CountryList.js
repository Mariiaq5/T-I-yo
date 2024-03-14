import React, { useState, useEffect } from 'react';
import { deleteCountry, getAllCountries } from '../../Managers/CountryManager';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router';

export const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const userString = localStorage.getItem("users");
    const userLS = JSON.parse(userString);

    const getCountries = () => {
        getAllCountries().then((thesecountries) => setCountries(thesecountries));
    }

    useEffect(() => {
        getCountries();
        }, []);

        const handleReadMore = (id) => {
            console.log(`Read more clicked for country with id ${id}`);
        };

        const handleDelete = (id) => {
            deleteCountry(id)
            window.location.reload();
        }

        const handleSearch = (event) => {
            setSearch(event.target.value);
          };

        const filteredCountries = countries.filter((country) => {
            const countryName = country.name.toLowerCase().includes(search.toLowerCase());
            return countryName;
        });
//getImages in seperate state and then map through the images around the image src and then create a ternerary statement like in country details that if the country.id ==== image.countryId it'll give that source
    return (
<div class="container">
        <div class="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            {filteredCountries.map((country) => (
                <div class="card text-center w-25" key={country.id}>
                <img class="card-img-top" src="https://kiyavia.com/files/travel-provider/zakarpattya/mesta/Zakarpattya_1920.jpg" alt="Card image cap"/>
                <div class="card-body">
                <h5 class="card-title">{country.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">{country.description}</li>
                    <li class="list-group-item"> capital: {country.capital}</li>
                    <li class="list-group-item">{country.slogan}</li>
                </ul>
                    <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`details/${country.id}`)}>Read More</button>

                    { userLS.admin == true ? (
                        <>
                    <button class="btn btn-outline-danger btn-sm" onClick={() => handleDelete(`${country.id}`)}>Delete Country</button>
                    <button class="btn btn-outline-success btn-sm" onClick={() => navigate(`edit/${country.id}`)}>Update Country</button>
                        </>
                    ) : (<></>)
                    }                  
                </div>
            ))}
             </div>
                </div>
    )
};