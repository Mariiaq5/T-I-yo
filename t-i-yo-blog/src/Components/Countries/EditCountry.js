import { useEffect, useState } from "react";
//import { Container, Input, InputGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryById, editCountry } from "../../Managers/CountryManager";

export const EditCountry = () => {
    const [country, setCountry] = useState({
        name: "",
        description: "",
        slogan: "",
        capital: ""
    });

   /* const [countryData, setCountryData] = useState({
        name: "",
        description: "",
        slogan: "",
        capital: ""
    }); */

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCountryById(id)
            .then((data) => {
                setCountry(data[0]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        editCountry(country).then(() => navigate("/countries"));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCountry((prevCountry) => ({
            ...prevCountry,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" id="name" placeholder="name" name="name" value={country.name} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="description" name="description" value={country.description} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="slogan" name="slogan" value={country.slogan} onChange={handleInputChange} />
                </div>
                <div className="row">
                    <input type="text" id="capital" name="capital" value={country.capital} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};


/*export const EditCountry = () => {
    const [country, setCountry] = useState({
        name: ""
    });
    const [countryData, setCountryData] = useState({
    name: "",
    description: "",
    slogan: "",
    capital: ""
 }) 
    const navigate = useNavigate();
    const { id} = useParams()
    useEffect(() => {
        getCountryById(id)
            .then((data) => {
                setCountry(data)
            })
        }, [id])
    const handleSubmit = (e) => {
        return editCountry(country).then(() => navigate("/countries"));
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setCountryData(name, value);
      };

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <div class="row">
        <input type="text" id="name" name="name" value={countryData.name} onChange={handleInputChange} />
      </div>
      <div class="row">
        <input type="text" id="description" name="description" value={countryData.description} onChange={handleInputChange} />
      </div>
      <div class="row">
        <input type="text" id="slogan" name="slogan" value={countryData.slogan} onChange={handleInputChange} />
      </div>
      <div class="row">
        <input type="text" id="capital" name="capital" value={countryData.capital} onChange={handleInputChange} />
      </div>
      <button type="submit">Save</button>
    </form>
    </div>

        <Container>
            <InputGroup>
                <Input
                    placeholder='Name'
                    value={countryData.name}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.name = e.target.value;
                        setCountryData.name(copy);
                    }}
                    />
                    <Input
                    placeholder='Description'
                    value={countryData.description}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.description = e.target.value;
                        setCountryData.(copy);
                    }}
                    />
                    <Input
                    placeholder='Slogan'
                    value={country.slogan}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.slogan = e.target.value;
                        setCountry(copy);
                    }}
                    />
                    <Input
                    placeholder='Capital'
                    value={country.capital}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.capital = e.target.value;
                        setCountry(copy);
                    }}
                />
                <Button color='primary' onClick={(e) => handleSubmit(e)}>Save</Button>
            </InputGroup>
        </Container> 
    );
}; */