/*import { getAllCountries } from "../../Managers/CountryManager";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export const CountryList = () => {
    const [country, setCountry] = useState([]);
  
    const navigate = useNavigate();
    
    const getCountry = () => {
      getAllCountries().then(allCountries => setCountry(allCountries));
    };
    useEffect(() => {
      getCountry();
    }, []);

    const addCountry = (singleCountry) => {
        addCountry(singleCountry).then(() => {getCountry();})
      }

return (
    <div>
        <a href="https://localhost:7088/api/Countries"><button>Add Country</button></a>
    </div>
);
} */