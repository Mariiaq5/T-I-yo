using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using T_I_yo_blog.Repositories;
using System.Collections.Generic;
using System.Linq;
using T_I_yo_blog.Models;
using T_I_yo_blog.Utils;
using System.Diagnostics.Metrics;


namespace T_I_yo_blog.Repositories
{
    public class CountriesRepository : BaseRepository, ICountriesRepository
    {
        public CountriesRepository(IConfiguration configuration) : base(configuration) { }
        public List<Country> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Description, Slogan, Capital
                        FROM Countries
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var countries = new List<Country>();
                    while (reader.Read())
                    {
                        countries.Add(new Country()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Slogan = DbUtils.GetString(reader, "Slogan"),
                            Capital = DbUtils.GetString(reader, "Capital")
                        });
                    }
                    reader.Close();
                    return countries;
                }
            }
        }
        public void Add(Country countries)
        {
             using (var conn = Connection)
             {
                 conn.Open();
                 using (var cmd = conn.CreateCommand())
                 {
                     cmd.CommandText = @"INSERT INTO Countries (Name, Description, Slogan, Capital)
                                         OUTPUT INSERTED.ID
                                         VALUES (@name, @description, @slogan, @capital)";
                    DbUtils.AddParameter(cmd, "@name", countries.Name);
                    DbUtils.AddParameter(cmd, "@description", countries.Description);
                    DbUtils.AddParameter(cmd, "@slogan", countries.Slogan);
                    DbUtils.AddParameter(cmd, "@capital", countries.Capital);
                   countries.Id = (int)cmd.ExecuteScalar();
                 }
             }
        }

         public List<Country> GetById(int id)
         {
             using (var conn = Connection)
             {
                 conn.Open();
                 using (var cmd = conn.CreateCommand())
                 {
                     cmd.CommandText = "SELECT Id, Name, Description, Slogan, Capital FROM Countries " +
                                       "WHERE Id = @Id";
                     DbUtils.AddParameter(cmd, "@Id", id);

                     using (var reader = cmd.ExecuteReader())
                     {
                         if (reader.Read())
                         {
                            return new List<Country>() {new Country()
                     {
                         Id = reader.GetInt32(reader.GetOrdinal("Id")),
                         Name = reader.GetString(reader.GetOrdinal("Name")),
                         Description = reader.GetString(reader.GetOrdinal("Description")),
                         Slogan = reader.GetString(reader.GetOrdinal("Slogan")),
                         Capital = reader.GetString(reader.GetOrdinal("Capital")),
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
                     cmd.CommandText = "DELETE FROM Countries " +
                                       "WHERE Id = @id";
                     DbUtils.AddParameter(cmd, "@id", Id);
                     cmd.ExecuteNonQuery();
                 }
             }
         }
         public void Update(Country country)
         {
             using (SqlConnection conn = Connection)
             {
                 conn.Open();
                 using (SqlCommand cmd = conn.CreateCommand())
                 {
                     cmd.CommandText = @"
                  UPDATE Countries
                  SET Name = @name, Description = @description, Slogan = @slogan, Capital = @capital
                  WHERE id = @id";
                     cmd.Parameters.AddWithValue("@name", country.Name);
                     cmd.Parameters.AddWithValue("@id", country.Id);
                     cmd.Parameters.AddWithValue("@description", country.Description);
                     cmd.Parameters.AddWithValue("@slogan", country.Slogan);
                     cmd.Parameters.AddWithValue("@capital", country.Capital);
                     cmd.ExecuteNonQuery();
                 }
             }
         }
         public Country GetCountryById(int id)
         {
             using (SqlConnection conn = Connection)
             {
                 conn.Open();
                 using (SqlCommand cmd = conn.CreateCommand())
                 {
                     cmd.CommandText = @"
                       SELECT Id, Name FROM Countries
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
                             Description = reader.GetString(reader.GetOrdinal("Description")),
                             Slogan = reader.GetString(reader.GetOrdinal("Slogan")),
                             Capital = reader.GetString(reader.GetOrdinal("Capital")),
                             
                         };
                         reader.Close();
                         return country;
                     }
                     reader.Close();
                     return null;
                 }
             }
         }

        public List<Country> GetFoodByCountryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select co.Id, co.Name, co.Description, co.Slogan, co.Capital,
                                      f.Id as foodId, f.CountryId, f.Name as foodName 
                                      from Countries co
                                      Join Food f on co.Id = f.CountryId
                                      WHERE co.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Country> countries = new List<Country>();
                    var reader = cmd.ExecuteReader();
                    
                        while (reader.Read())
                        {
                            Country country = new Country()
                     {
                         Id = reader.GetInt32(reader.GetOrdinal("Id")),
                         Name = reader.GetString(reader.GetOrdinal("Name")),
                         Description = reader.GetString(reader.GetOrdinal("Description")),
                         Slogan = reader.GetString(reader.GetOrdinal("Slogan")),
                         Capital = reader.GetString(reader.GetOrdinal("Capital")),
                         Food = new Food()
                         {
                           Id = reader.GetInt32(reader.GetOrdinal("foodId")),
                           CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                           Name = reader.GetString(reader.GetOrdinal("foodName")),
                         }
                      };
                        countries.Add(country);
                        }
                    reader.Close();
                    return countries;
                }
            }
        }

        public List<Country> GetCitiesByCountryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select co.Id, co.Name, co.Description, co.Slogan, co.Capital,
                                       ci.Id as cityId, ci.Name as cityName, ci.CountryId
                                       from Countries co
                                       Join Cities ci on co.Id = ci.CountryId
                                      WHERE co.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Country> countries = new List<Country>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Country country = new Country()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Description = reader.GetString(reader.GetOrdinal("Description")),
                            Slogan = reader.GetString(reader.GetOrdinal("Slogan")),
                            Capital = reader.GetString(reader.GetOrdinal("Capital")),
                            City = new City()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("cityId")),
                                CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                                Name = reader.GetString(reader.GetOrdinal("cityName")),
                            }
                        };
                        countries.Add(country);
                    }
                    reader.Close();
                    return countries;
                }
            }
        }

        public List<Country> GetPlacesByCountryId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select co.Id, co.Name, co.Description, co.Slogan, co.Capital,
                                       pl.Id as placeId, pl.Name as placeName, pl.PlaceType, pl.CityId as placeCityId, 
                                       pl.Description as placeDescription, pl.CountryId
                                       from Countries co
                                       Join Places pl on co.Id = pl.CountryId
                                       WHERE co.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Country> places = new List<Country>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Country country = new Country()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Description = reader.GetString(reader.GetOrdinal("Description")),
                            Slogan = reader.GetString(reader.GetOrdinal("Slogan")),
                            Capital = reader.GetString(reader.GetOrdinal("Capital")),
                            Place = new Place()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("PlaceId")),
                                Name = reader.GetString(reader.GetOrdinal("placeName")),
                                PlaceType = reader.GetString(reader.GetOrdinal("PlaceType")),
                                CityId = reader.GetInt32(reader.GetOrdinal("placeCityId")),
                                Description = reader.GetString(reader.GetOrdinal("placeDescription")),
                                CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                            }
                        };
                        places.Add(country);
                        }
                    reader.Close();
                    return places;

                }
            }
        }
    }
}
