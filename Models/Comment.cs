namespace T_I_yo_blog.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public int UserId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
