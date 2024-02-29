using System.ComponentModel.DataAnnotations;

namespace T_I_yo_blog.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Slogan { get; set; }
        public string Capital { get; set; }

    }
}
