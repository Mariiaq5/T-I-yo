using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface ICommentsRepository
    {
        List<Comment> GetAllCommentsByUserId(int userId);
        void Delete(int id);
        void Update(Comment comment);
        void Add(Comment comment);
    }
}