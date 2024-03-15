const baseUrl = 'https://localhost:7088/api/Cities';

export const addCity = (singleCity) => {
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleCity),

        name: singleCity.name, 
        countryId: singleCity.countryId
    });
};

export const editCity = (city) => {
    return fetch(`${baseUrl}/edit/${city.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
    });
};

export const deleteCity = (id) => {
    return fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE"
    });
  }

  export const getCityById = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => res.json()
    );
}