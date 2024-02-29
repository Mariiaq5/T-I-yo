using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface IUsersRepository
    {
        void Add(User user);
        void Delete(int id);
        void Update(User user);
        List<User> GetAll();
        User GetByEmail(string email);
        User GetById(int id);
    }
}