using System.ComponentModel.DataAnnotations;

namespace T_I_yo_blog.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Admin { get; set; }
    }
}
