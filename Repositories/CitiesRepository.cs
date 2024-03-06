using Microsoft.Data.SqlClient;
using T_I_yo_blog.Models;
using T_I_yo_blog.Utils;


namespace T_I_yo_blog.Repositories
{
    public class CitiesRepository : BaseRepository, ICitiesRepository
    {
        public CitiesRepository(IConfiguration configuration) : base(configuration) { }
        public List<City> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, CountryId, Name
                        FROM Cities
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var cities = new List<City>();
                    while (reader.Read())
                    {
                        cities.Add(new City()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            CountryId = DbUtils.GetInt(reader, "CountryId"),
                        });
                    }
                    reader.Close();
                    return cities;
                }
            }
        }
        public void Add(City cities)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Cities (Id, Name, CountryId)
                                         OUTPUT INSERTED.ID
                                         VALUES (@Id, @Name, @CountryId)";
                    DbUtils.AddParameter(cmd, "@Id", cities.Id);
                    DbUtils.AddParameter(cmd, "@Name", cities.Name);
                    DbUtils.AddParameter(cmd, "@CountryId", cities.CountryId);
                    cities.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
          public List<City> GetById(int id)
          {
              using (var conn = Connection)
              {
                  conn.Open();
                  using (var cmd = conn.CreateCommand())
                  {
                      cmd.CommandText = "SELECT Id, Name, CountryId FROM Cities " +
                                        "WHERE Id = @Id";
                      DbUtils.AddParameter(cmd, "@Id", id);

                      using (var reader = cmd.ExecuteReader())
                      {
                          if (reader.Read())
                          {
                              return new List<City>() {new City()
                       {
                           Id = reader.GetInt32(reader.GetOrdinal("Id")),
                           Name = reader.GetString(reader.GetOrdinal("Name")),
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
        public void Delete(int cityId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Cities " +
                                      "WHERE Id = @CityId";
                    DbUtils.AddParameter(cmd, "@CityId", cityId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(City cities)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  UPDATE Cities
                  SET Name = @name, CountryId = @countryId
                  WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", cities.Name);
                    cmd.Parameters.AddWithValue("@countryId", cities.CountryId);
                    cmd.Parameters.AddWithValue("@id", cities.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //get cities by country Id
        public List<City> GetCitiesByCountryId(int countryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, Name, CountryId from Cities
                                       Where CountryId = @countryId";
                    DbUtils.AddParameter(cmd, "@countryId", countryId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<City>() {new City()
                     {
                         Id = reader.GetInt32(reader.GetOrdinal("Id")),
                         Name = reader.GetString(reader.GetOrdinal("Name")),
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



        /* public Country GetCountryById(int id)
         {
             using (SqlConnection conn = Connection)
             {
                 conn.Open();
                 using (SqlCommand cmd = conn.CreateCommand())
                 {
                     cmd.CommandText = @"
                        SELECT Id, [Name] FROM Country
                        WHERE Id = @id
                        ";
                     cmd.Parameters.AddWithValue("@id", id);
                     SqlDataReader reader = cmd.ExecuteReader();
                     if (reader.Read())
                     {
                         Country country = new Country()
                         {
                             Id = reader.GetInt32(reader.GetOrdinal("Id")),
                             Name = reader.GetString(reader.GetOrdinal("Name")),

                         };
                         reader.Close();
                         return country;
                     }
                     reader.Close();
                     return null;
                 } 
             } 
         } */
    }
}
