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

    return (
<div>
        <div class="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        { userLS.admin == true ? (
                        <>
                    <button class="btn btn-outline-success btn-sm" onClick={() => navigate(`/countries/add`)}>Add Country</button>
                        </>
                    ) : (<></>)
                    }
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Slogan</th>
                <th>Capital</th>
            </tr>
        </thead>
        <tbody>
            {filteredCountries.map((country) => (
                <tr key={country.id}>
                    <td>{country.name}</td>
                    <td>{country.description}</td>
                    <td>{country.slogan}</td>
                    <td>{country.capital}</td>
                    <td>
                    <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`details/${country.id}`)}>Read More</button>

                    { userLS.admin == true ? (
                        <>
                    <button class="btn btn-outline-danger btn-sm" onClick={() => handleDelete(`${country.id}`)}>Delete Country</button>
                    <button class="btn btn-outline-success btn-sm" onClick={() => navigate(`edit/${country.id}`)}>Update Country</button>
                        </>
                    ) : (<></>)
                    }
                    </td>
                    
                </tr>
            ))}
        </tbody>
    </table>
</div>
    )
};