const baseUrl = 'https://localhost:7088/api/Images';

export const getAllImages = () => {
    return fetch(baseUrl) 
    .then((res) => {
        return res.json();
    })
}