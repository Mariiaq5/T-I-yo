using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface ICountriesRepository
    {
        List<Country> GetAll();
        List <Country> GetById(int id);
        Country GetCountryById(int id);
        void Add(Country country);
        void Update(Country country);
        void Delete(int Id);
    }
}