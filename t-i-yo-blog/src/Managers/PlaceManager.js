const baseUrl = 'https://localhost:7088/api/Places';

export const addPlace = (singlePlace) => {
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singlePlace),
    });
};

export const editPlace = (place) => {
    return fetch(`${baseUrl}/edit/${place.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
    });
};

export const deletePlace = (id) => {
    return fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE"
    });
  }

  export const getPlaceById = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => res.json()
    );
}