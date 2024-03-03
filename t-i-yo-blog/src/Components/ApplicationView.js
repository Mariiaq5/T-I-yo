import React from "react";
import { Route, Routes } from "react-router-dom";
import { CountryList } from "./Countries/CountryList";
import CountryForm from "./Countries/CountryForm";
import { EditCountry } from "./Countries/EditCountry";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import { CountryAdd } from "./Countries/CountryAdd";

export default function ApplicationViews() {

  return (
    <>
      <Routes>
        <Route path="/countries" element={<CountryList/>} />
        <Route path="/countries/form" element={<CountryForm/>} />
        <Route path="/countries/edit/:id" element={<EditCountry/>} />
        <Route path="/users" element={<UserProfileList />} />
        <Route path="/users/:id" element={<UserProfileDetails />} />
        <Route path="/countries/add" element={<CountryAdd/>} />
      </Routes>
    </>
  );

}