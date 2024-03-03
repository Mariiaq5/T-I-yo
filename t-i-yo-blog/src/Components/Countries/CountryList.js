import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../../Managers/CountryManager';
//import { useNavigate } from 'react-router';

export const CountryList = () => {
    const [countries, setCountries] = useState([]);

    const getCountries = () => {
        getAllCountries().then((thesecountries) => setCountries(thesecountries));
    }

    useEffect(() => {
        getCountries();
        }, []);

    return (
<div>
    <table>
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
                </tr>
            ))}
        </tbody>
    </table>
</div>
    )
};