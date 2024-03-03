export const FoodList = () => {
    return (
        <table>
        <thead>
        <tr>
            <th>Name</th>
        </tr>
    </thead>
        {food.map((food) => (
            <tr key={food.id}>
                <td>{food.countryId}</td>
                <td>{food.name}</td>
            </tr>
        ))}
        </table>
    )
}