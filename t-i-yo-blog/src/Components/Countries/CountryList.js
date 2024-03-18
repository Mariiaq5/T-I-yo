import React, { useState, useEffect } from 'react';
import { deleteCountry, getAllCountries } from '../../Managers/CountryManager';
import { useNavigate } from 'react-router-dom';
import { getAllImages } from '../../Managers/ImageManager';


export const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const userString = localStorage.getItem("users");
    const userLS = JSON.parse(userString);
    const [images, setImages] = useState([]);

    const getCountries = () => {
        getAllCountries().then((thesecountries) => setCountries(thesecountries));
    }

    const getImages = () => {
        getAllImages().then((theseimages) => setImages(theseimages));
    }

    useEffect(() => {
        getCountries();
        }, []);

    useEffect(() => {
        getImages();
    }, []);

        const handleReadMore = (id) => {
            console.log(`Read more clicked for country with id ${id}`);
        };

        const handleDelete = (id) => {
            deleteCountry(id)
            window.location.reload();
        }

        const handleSearch = (event) => {
            setSearch(event.target.value);
          };

        const filteredCountries = countries.filter((country) => {
            const countryName = country.name.toLowerCase().includes(search.toLowerCase());
            return countryName;
        });

        /*const formattedImageUrl = images.filter((images) => {
            return formattedImageUrl === images.countryId;
        }); */
//getImages in seperate state and then map through the images around the image src and then create a ternerary statement like in country details that if the country.id ==== image.countryId it'll give that source
    return (
<div class="container">
        <div class="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by country name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        { userLS.admin == true ? (
                        <>
                    <button type="button" class="btn btn-outline-dark btn-sm" onClick={() => navigate(`/countries/add`)}>Add Country</button>
                        </>
                    ) : (<></>)
                    }
        <div class="row row-cols-1 row-cols-md-2 g-4">
        {filteredCountries.map(country => {
        // Find the corresponding image URL for the current country
        const imageUrl = images.find(images => images.countryId === country.id)?.url;
        const formattedImageUrl = imageUrl ? `"${imageUrl}"` : '';
        return (
          <div className="col-md-4" key={country.id}>
            <div className="card">
              {imageUrl && (
                <img src={formattedImageUrl} className="card-img-top" alt={country.name} />
              )}
              <div className="card-body">
                <h5 className="card-title">{images.countryId}</h5>
                <h4 className="card-name">{country.name}</h4>
                {/* Other card content */}
              </div>
              <ul class="list-group list-group-flush">
                    <li class="list-group-item">{country.description}</li>
                    <li class="list-group-item"> capital: {country.capital}</li>
                    <li class="list-group-item">{country.slogan}</li>
                </ul>
                    <button class="btn btn-outline-info btn-sm" onClick={() =>navigate(`details/${country.id}`)}>Read More</button>

                    { userLS.admin == true ? (
                        <>
                    <button class="btn btn-outline-danger btn-sm" onClick={() => handleDelete(`${country.id}`)}>Delete Country</button>
                    <button class="btn btn-outline-success btn-sm" onClick={() => navigate(`edit/${country.id}`)}>Update Country</button>
                        </>
                    ) : (<></>)
                    }
            </div>
          </div>
        );
      })}
             </div>
                </div>
    )
};