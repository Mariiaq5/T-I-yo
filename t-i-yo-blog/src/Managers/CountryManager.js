
const baseUrl = 'https://localhost:7088/api/Countries';

export const getAllCountries = () => {
    return fetch(baseUrl) 
    .then((res) => {
        return res.json();
    })
}

export const addCountry = (singleCountry) => {
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleCountry),
    });
};

export const getCountryById = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => res.json()
    );
}

export const editCountry = (country) => {
    return fetch(`${baseUrl}/edit/${country.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(country),
    });
};

export const deleteCountry = (id) => {
    return fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE"
    });
  }
  
  export const getFoodByCountryId = (id) => {
    return fetch(`${baseUrl}/getfoodbycountryid?id=${id}`)
    .then((res) => res.json()
    );
}

export const getCitiesByCountryId = (id) => {
    return fetch(`${baseUrl}/getcitiesbycountryid?id=${id}`) 
    .then((res) => res.json()
    );
}

export const getPlacesByCountryId = (id) => {
    return fetch(`${baseUrl}/getplacebycountryid?id=${id}`) 
    .then((res) => res.json()
    );
}