using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface IFoodRepository
    {
        void Add(Food food);
        void Delete(int foodId);
        List<Food> GetAll();
        Food GetById(int id);
        List<Food> GetFoodByCountryId(int countryId);
        Food GetFoodById(int id);
        void Update(Food food);
    }
}