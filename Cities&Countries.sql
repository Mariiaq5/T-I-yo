Select Cities.Id as "CityId", Cities.Name as "CityName", Cities.CountryId, Countries.Id, Countries.Name as "CountryName"
from Cities
LEFT JOIN Countries on Cities.CountryId = Countries.Id;