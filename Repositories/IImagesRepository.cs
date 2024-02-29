using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public interface IImagesRepository
    {
        void Add(Image image);
        void Delete(int imageId);
        List<Image> GetAll();
        List<Image> GetById(int id);

      //  Image GetImageById(int id);
        void Update(Image image);
    }
}