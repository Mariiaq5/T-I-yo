import { getAllCountries, deleteCountry, addCountry, updateCountry } from "../../Managers/CountryManager";
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
     if (checkIfAdmin()) {
       setIsAdmin(true);
     }
  }, []);

  const handleDelete = (id) => {
    if (isAdmin) {
      const confirmDelete = window.confirm("Do you want to delete this country?");
      if (confirmDelete) {
        deleteCountry(id).then(() => {
          getCountry();
        });
      }
    } else {
      alert("You do not have permission to delete this country.");
    }
  };

  const handleEdit = (country) => {
    if (isAdmin) {
      updateCountry(country).then(() => {
        getCountry();
      });
    } else {
      alert("You do not have permission to edit this country.");
    }
  };

  const handleAdd = () => {
    if (isAdmin) {
      // Add code here to handle adding a new country
    } else {
      alert("You do not have permission to add a new country.");
    }
  };

  const handleUserInfo = () => {
    if (isAdmin) {
      // Add code here to view user information
    } else {
      alert("You do not have permission to view user information.");
    }
  };

  return (
    <div>
      {country.map((c) => (
        <div key={country.id}>
          <p>Name: {country.name}</p>
          <p>Capital: {country.capital}</p>
          {isAdmin && (
            <div>
              <button onClick={() => handleEdit(country)}>Edit Country</button>
              <button onClick={() => handleDelete(country.id)}>Delete Country</button>
            </div>
          )}
        </div>
      ))}
      {isAdmin && (
        <button onClick={handleAdd}>Add New Country</button>
      )}
      {isAdmin && (
        <button onClick={handleUserInfo}>View User</button>
      )}
    </div>
  );
};