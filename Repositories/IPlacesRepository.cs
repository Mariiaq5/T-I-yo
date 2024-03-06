using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface IPlacesRepository
    {
        void Add(Place place);
        void Delete(int Id);
        List<Place> GetAll();
        List<Place> GetById(int id);
        List<Place> GetPlacesByCountryId(int countryId);
        Place GetPlaceById(int id);
        void Update(Place place);
    }
}