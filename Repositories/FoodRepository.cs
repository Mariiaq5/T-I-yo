using Microsoft.Data.SqlClient;
using T_I_yo_blog.Utils;
using T_I_yo_blog.Models;

namespace T_I_yo_blog.Repositories {
    public class FoodRepository : BaseRepository, IFoodRepository
    {
        public FoodRepository(IConfiguration configuration) : base(configuration) { }
        public List<Food> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, CountryId
                        FROM Food
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var food = new List<Food>();
                    while (reader.Read())
                    {
                        food.Add(new Food()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            CountryId = DbUtils.GetInt(reader, "CountryId")
                        });
                    }
                    reader.Close();
                    return food;
                }
            }
        }
        public void Add(Food food)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Food (Id, Name, CountryId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Id, @Name, @CountryId)";
                    DbUtils.AddParameter(cmd, "@id", food.Id);
                    DbUtils.AddParameter(cmd, "@Name", food.Name);
                    DbUtils.AddParameter(cmd, "@CountryId", food.CountryId);
                    food.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Food> GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, CountryId FROM Food " +
                                      "WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Food>() {new Food()
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
        public void Delete(int foodId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Food " +
                                      "WHERE Id = @FoodId";
                    DbUtils.AddParameter(cmd, "@FoodId", foodId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Food food)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 UPDATE Food
                 SET Name = @name, CountryId = @countryId
                 WHERE id = @id";
                    cmd.Parameters.AddWithValue("@name", food.Name);
                    cmd.Parameters.AddWithValue("@id", food.Id);
                    cmd.Parameters.AddWithValue("@countryId", food.CountryId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Food GetFoodById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            SELECT Id, CountryId, [Name] FROM Food
            WHERE Id = @id
            ";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Food food = new Food()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                        };
                        reader.Close();
                        return food;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public List<Food> GetFoodByCountryId(int countryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, Name, CountryId from Food 
                                       Where CountryId = @countryId";
                    DbUtils.AddParameter(cmd, "@countryId", countryId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new List<Food>() {new Food()
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
    }
}
