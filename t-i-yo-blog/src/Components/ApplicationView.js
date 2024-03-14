import React from "react";
import { Route, Routes } from "react-router-dom";
import { CountryList } from "./Countries/CountryList";
import { EditCountry } from "./Countries/EditCountry";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import { CountryAdd } from "./Countries/CountryAdd";
import { CountryDetails } from "./Countries/CountryDetails";
import { EditCity } from "./Cities/EditCity";
import { CityAdd } from "./Cities/CityAdd";
import { FoodAdd } from "./Food/FoodAdd";
import { EditFood } from "./Food/EditFood";
import { EditPlace } from "./Places/EditPlace";
import { PlaceAdd } from "./Places/PlaceAdd";

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
        <Route path="/cities/edit/:id" element={<EditCity/>} />
        <Route path="/cities/add" element={<CityAdd/>} />
        <Route path="/food/add" element={<FoodAdd />} />
        <Route path="/food/edit/:id" element={<EditFood/>} />
        <Route path="/places/edit/:id" element={<EditPlace/>} />
        <Route path="/places/add" element={<PlaceAdd/>} />
      </Routes>
    </>
  );

}