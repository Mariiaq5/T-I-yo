namespace T_I_yo_blog.Models
{
    public class Place
    {
        public int Id { get; set; }
        public int? CountryId { get; set; }
        public int? CityId { get; set; }
        public string Name { get; set; }
        public string PlaceType { get; set; }
        public string Description { get; set; }
    }
}
