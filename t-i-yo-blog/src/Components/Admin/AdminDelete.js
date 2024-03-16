import { getAllCountries } from "../../Managers/CountryManager";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteCountry } from "../../Managers/CountryManager";

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

    const deleteCountry = (id) => {
      const confirmDelete = window.confirm("Do you want to delete this country?");
      if (confirmDelete) {
        deleteCountry(id).then(() => {getCountry();})
      }
    }

return (
    <div>
          <tr>
              <button className="table-button" onClick={() => deleteCountyById(country.id)}>Delete</button>
            </tr>
    </div>
);
}