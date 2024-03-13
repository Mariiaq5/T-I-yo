const baseUrl = 'https://localhost:7088/api/Food';

export const addFood = (singleFood) => {
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleFood),
    });
};

export const editFood = (food) => {
    return fetch(`${baseUrl}/edit/${food.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
    });
};

export const deleteFood = (id) => {
    return fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE"
    });
  }