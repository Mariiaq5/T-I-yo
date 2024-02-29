using System.ComponentModel.DataAnnotations;

namespace T_I_yo_blog.Models
{
    public class City
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Name { get; set; }
    }
}
