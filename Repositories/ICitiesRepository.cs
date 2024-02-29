using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface ICitiesRepository
    {
        List<City> GetAll();
        List <City> GetById(int id);
      //  City GetCountryById(int id);
        void Add(City city);
        void Update(City city);
        void Delete(int id);
    }
}