Select co.Id, co.Name, co.Description, co.Slogan, co.Capital,
f.Id as foodId, f.CountryId, f.Name as foodName
from Countries co
Join Food f on co.Id = f.CountryId
Where co.Id = 7;