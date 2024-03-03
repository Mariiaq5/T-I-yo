export const PlaceList = () => {
    return (
        <table>
            <thead>
        <tr>
                <th>Name</th>
                <th>PlaceType</th>
                <th>Description</th>
            </tr>
        </thead>
            {places.map((place) => (
                <tr key={place.id}>
                    <td>{place.countryId}</td>
                    <td>{place.cityId}</td>
                    <td>{place.name}</td>
                    <td>{place.placeType}</td>
                    <td>{place.description}</td>
                </tr>
            ))}
        </table>
    )
}