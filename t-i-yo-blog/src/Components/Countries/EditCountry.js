import { useEffect, useState } from "react";
import { Container, Input, InputGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryById, editCountry } from "../../Managers/CountryManager";

export const EditCountry = () => {
    const [country, setCountry] = useState({
        name: ""
    });
    const navigate = useNavigate();
    const { id} = useParams()
    useEffect(() => {
        getCountryById(id)
            .then((data) => {
                setCountry(data)
            })
        }, [id])
    const handleSubmit = (e) => {
        return editCountry(country).then(() => navigate("/country"));
    };
    return (
        <Container>
            <InputGroup>
                <Input
                    placeholder='Name'
                    value={country.name}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.name = e.target.value;
                        setCountry(copy);
                    }}
                    />
                    <Input
                    placeholder='Description'
                    value={country.description}
                    onChange={(e) => {
                        const copy = { ...country };
                        copy.description = e.target.value;
                        setCountry(copy);
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
};