using Microsoft.Data.SqlClient;
using T_I_yo_blog.Models;
using T_I_yo_blog.Utils;

namespace T_I_yo_blog.Repositories
{
    public class ImagesRepository : BaseRepository, IImagesRepository
    {
        public ImagesRepository(IConfiguration configuration) : base(configuration) { }
        public List<Image> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CountryId, ImageUrl
                        FROM Images
                        ORDER BY Id";
                    var reader = cmd.ExecuteReader();
                    var image = new List<Image>();
                    while (reader.Read())
                    {
                        image.Add(new Image()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CountryId = DbUtils.GetInt(reader, "CountryId")
                        });
                    }
                    reader.Close();
                    return image;
                }
            }
        }
        public void Add(Image image)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Images (ImageUrl, CountryId, Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@imageUrl, @countryId, @name)";
                    //DbUtils.AddParameter(cmd, "@id", image.Id);
                    DbUtils.AddParameter(cmd, "@ImageUrl", image.ImageUrl);
                    DbUtils.AddParameter(cmd, "@countryId", image.CountryId);
                    DbUtils.AddParameter(cmd, "@name", image.Name);
                    image.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Image> GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, ImageUrl, CountryId, Name FROM Images " +
                                      "WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Image>() {new Image()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                        CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                        Name = reader.GetString(reader.GetOrdinal("Name")),
                    }};
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        public void Delete(int imageId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Images " +
                                      "WHERE Id = @ImageId";
                    DbUtils.AddParameter(cmd, "@ImageId", imageId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Image image)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 UPDATE Images
                 SET ImageUrl = @imageUrl, CountryId = @countryId, Name = @name
                 WHERE id = @id";
                    cmd.Parameters.AddWithValue("@imageUrl", image.ImageUrl);
                    //cmd.Parameters.AddWithValue("@id", image.Id);
                    cmd.Parameters.AddWithValue("@countryId", image.CountryId);
                    cmd.Parameters.AddWithValue("@name", image.Name);
                    cmd.ExecuteNonQuery();
                }
            }
        }

       /* public Image GetImageById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT Id, CountryId, [ImageUrl] FROM Images
                     WHERE Id = @id
                     ";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Image image = new Image()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                        };
                        reader.Close();
                        return image;
                    }
                    reader.Close();
                    return null;
                }
            }
        } */
    }
}
