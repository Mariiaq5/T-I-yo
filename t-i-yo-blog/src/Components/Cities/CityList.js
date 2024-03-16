export const CityList = () => {
    return (
        <table>
        <thead>
        <tr>
            <th>Name</th>
        </tr>
    </thead>
        {cities.map((city) => (
            <tr key={city.id}>
                <td>{city.countryId}</td>
                <td>{city.name}</td>
            </tr>
        ))}
        </table>
    )
}