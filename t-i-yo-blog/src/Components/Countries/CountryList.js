import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Input, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getAllCountries, deleteCountry } from '../../Managers/CountryManager';
import { getAllImages } from '../../Managers/ImageManager';

export const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const userString = localStorage.getItem("users");
    const userLS = JSON.parse(userString);


    useEffect(() => {
        getCountries();
        getImages();
    }, []);

    const getCountries = () => {
        getAllCountries().then((theseCountries) => setCountries(theseCountries));
    };

    const getImages = () => {
        getAllImages().then((theseImages) => setImages(theseImages));
    };

    const handleDelete = (id) => {
        deleteCountry(id)
            .then(() => {
                // Remove the deleted country from the list of countries
                setCountries(countries.filter(country => country.id !== id));
            })
            .catch(error => console.error("Error deleting country:", error));
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredCountries = countries.filter((country) => {
        const countryName = country.name.toLowerCase().includes(search.toLowerCase());
        return countryName;
    });

    return (
        <div class="p-3 mb-2 bg-secondary">
        <div className="container">
            <div className="mb-3">
                <Input
                    type="text"
                    placeholder="Search by country name"
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            {userLS.admin && (
                <Button class="btn btn-dark" color='dark' size="md" onClick={() => navigate(`/countries/add`)}>
                    Add Country
                </Button>
            )}
            <Row xs="4" md="4" className="g-4">
                {filteredCountries.map(country => {
                    // Find the corresponding image URL for the current country
                    const imageUrl = images.find(image => image.countryId === country.id)?.imageUrl;
                    return (
                        <Col key={country.id}>
                            <Card className="h-100 d-flex flex-column">
                                {images && (
                                    <CardImg style={{height: "200px", width: "320px", objectFit: "fill"}} top src={imageUrl} className="img-fluid" alt={country.name}/>
                                )}
                                <CardBody className='d-flex flex-column justify-content-between'>
                                    <CardTitle tag="h5">{country.name}</CardTitle>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{country.description}</li>
                                        <li className="list-group-item">Capital: {country.capital}</li>
                                        <li className="list-group-item">Slogan: {country.slogan}</li>
                                    </ul>
                                    <div className='d-flex flex-column justify-content-between'>
                                            <Button color="secondary" size="sm" onClick={() => navigate(`/countries/details/${country.id}`)}>Read More</Button>
                                    {userLS.admin && (
                                        <>
                                            <Button color="danger" size="sm" onClick={() => handleDelete(country.id)}>Delete Country</Button>
                                            <Button color="dark" size="sm" onClick={() => navigate(`edit/${country.id}`)}>Update Country</Button>
                                        </>
                                    )}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
      </div>
    );
};
