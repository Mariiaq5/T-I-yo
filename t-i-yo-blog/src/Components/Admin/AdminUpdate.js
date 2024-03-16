import { getAllCountries } from "../../Managers/CountryManager";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export const CountryList = () => {
    const [country, setCountry] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate();
    
    const getCountry = () => {
      getAllCountries().then(allCountries => setCountry(allCountries));
    };
    useEffect(() => {
      getCountry();
    }, []);

    const editCountry = (country) => {
        editCountry(country).then(() => {getCountry();})
      }

return (
    <div>
        <tr>
            <Button onClick={(e) => { e.preventDefault(); navigate(`/countries/edit/${country.id}`);}}> Edit Country </Button>
        </tr>
    </div>
);
}