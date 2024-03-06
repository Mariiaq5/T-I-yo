using Microsoft.Data.SqlClient;
using T_I_yo_blog.Utils;
using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories
{
    public class PlacesRepository : BaseRepository, IPlacesRepository
    {
        public PlacesRepository(IConfiguration configuration) : base(configuration) { }
        public List<Place> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, CountryId, PlaceType, CityId, Description
                        FROM Places
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var places = new List<Place>();
                    while (reader.Read())
                    {
                        places.Add(new Place()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            CountryId = DbUtils.GetNullableInt(reader, "CountryId"),
                            PlaceType = DbUtils.GetString(reader, "PlaceType"),
                            CityId = DbUtils.GetNullableInt(reader, "CityId"),
                            Description = DbUtils.GetString(reader, "Description")
                        });
                    }
                    reader.Close();
                    return places;
                }
            }
        }
        public void Add(Place place)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Places (Id, Name, CountryId, CityId, Description, PlaceType)
                                        OUTPUT INSERTED.ID
                                        VALUES (@id, @name, @countryId, @cityId, @description, @placeType)";
                    DbUtils.AddParameter(cmd, "@id", place.Id);
                    DbUtils.AddParameter(cmd, "@name", place.Name);
                    DbUtils.AddParameter(cmd, "@countryId", place.CountryId);
                    DbUtils.AddParameter(cmd, "@cityId", place.CityId);
                    DbUtils.AddParameter(cmd, "@description", place.Description);
                    DbUtils.AddParameter(cmd, "@placeType", place.PlaceType);
                    place.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Place> GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, CountryId, CityId, Description FROM Places " +
                                      "WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Place>() {new Place()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Name = reader.GetString(reader.GetOrdinal("Name")),
                        CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                        CityId = reader.GetInt32(reader.GetOrdinal("CityId")),
                        Description = reader.GetString(reader.GetOrdinal("Description")),
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
        public void Delete(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Places " +
                                      "WHERE Id = @placeId";
                    DbUtils.AddParameter(cmd, "@placeId", Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Place place)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 UPDATE Places
                 SET Name = @name, CountryId = @countryId, CityId = @cityId, Description = @description, PlaceType = @placeType
                 WHERE id = @id";
                    cmd.Parameters.AddWithValue("@name", place.Name);
                    cmd.Parameters.AddWithValue("@id", place.Id);
                    cmd.Parameters.AddWithValue("@countryId", place.CountryId);
                    cmd.Parameters.AddWithValue("@cityId", place.CityId);
                    cmd.Parameters.AddWithValue("@description", place.Description);
                    cmd.Parameters.AddWithValue("@placeType", place.PlaceType);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Place GetPlaceById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            SELECT Id, [Name] FROM Places
            WHERE Id = @id
            ";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Place places = new Place()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        };
                        reader.Close();
                        return places;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        //get places by countryId
        public List<Place> GetPlacesByCountryId(int countryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, Name, PlaceType, CityId, Description, CountryId from Places
                                       Where CountryId = @countryId";
                    DbUtils.AddParameter(cmd, "@countryId", countryId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Place>() {new Place()
                     {
                         Id = reader.GetInt32(reader.GetOrdinal("Id")),
                         Name = reader.GetString(reader.GetOrdinal("Name")),
                         PlaceType = reader.GetString(reader.GetOrdinal("PlaceType")),
                         CityId = reader.GetInt32(reader.GetOrdinal("CityId")),
                         Description = reader.GetString(reader.GetOrdinal("Description")),
                         CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
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
    }
}
