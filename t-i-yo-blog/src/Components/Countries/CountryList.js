import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../../Managers/CountryManager';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router';

export const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

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
            console.log(`Delete clicked for country with id ${id}`);
        }
    return (
<div>
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
            {countries.map((country) => (
                <tr key={country.id}>
                    <td>{country.name}</td>
                    <td>{country.description}</td>
                    <td>{country.slogan}</td>
                    <td>{country.capital}</td>
                    <td>
                    <button class="btn btn-info btn-sm" onClick={() =>navigate(`details/${country.id}`)}>Read More</button>
                    </td>
                    
                </tr>
            ))}
        </tbody>
    </table>
</div>
    )
};