Select co.Id, co.Name, co.Description, co.Slogan, co.Capital,
ci.Id as cityId, ci.Name as cityName, ci.CountryId
from Countries co
Join Cities ci on co.Id = ci.CountryId
Where co.Id = 7;
