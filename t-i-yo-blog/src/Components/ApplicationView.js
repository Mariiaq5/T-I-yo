import React from "react";
import { Route, Routes } from "react-router-dom";
import { CountryList } from "./Countries/CountryList";
import { EditCountry } from "./Countries/EditCountry";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import { CountryAdd } from "./Countries/CountryAdd";
import { CountryDetails } from "./Countries/CountryDetails";
import Home from "./Home/Home";
export default function ApplicationViews() {
  
  return (
    <>
      <Routes>
        <Route path="/countries" element={<CountryList/>} />
          <Route path="/countries/add" element={<CountryAdd/>} />
          <Route path="/countries/edit/:id" element={<EditCountry/>} />
          <Route path="/users" element={<UserProfileList />} />
        <Route path="/users/:id" element={<UserProfileDetails />} />
        <Route path="/countries/details/:id" element={<CountryDetails/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );

}