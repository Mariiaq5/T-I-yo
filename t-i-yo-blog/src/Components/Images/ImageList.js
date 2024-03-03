export const ImageList = () => {
    return (
        <table>
        <thead>
        <tr>
            <th>Name</th>
        </tr>
    </thead>
        {images.map((image) => (
            <tr key={image.id}>
                <td>{image.countryId}</td>
                <td>{image.imageUrl}</td>
            </tr>
        ))}
        </table>
    )
}