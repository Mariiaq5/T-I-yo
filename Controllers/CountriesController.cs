using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;
using T_I_yo_blog.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ICountriesRepository _countryRepository;
        public CountriesController(ICountriesRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_countryRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Country country)
        {
            _countryRepository.Add(country);
            return CreatedAtAction(
                "Get", new { id = country.Id }, country);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _countryRepository.GetById(id);

                if (_countryRepository == null)
                {
                    return NotFound($"Country with ID {id} not found");
                }

                _countryRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdateCountry(int id, Country country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            _countryRepository.Update(country);

            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var city = _countryRepository.GetById(id);
            if (city == null)
            {
                return NotFound();
            }
            return Ok(city);
        }

        [HttpGet("getfoodbycountryid")]
        public IActionResult GetFoodByCountryId(int id)
        {
            var food = _countryRepository.GetFoodByCountryId(id);
            if (food == null)
            {
                return NotFound();
            }
            return Ok(food);
        }

        [HttpGet("getcitiesbycountryid")]
        public IActionResult GetCitiesByCountryId(int id)
        {
            var city = _countryRepository.GetCitiesByCountryId(id);
            if (city == null)
            {
                return NotFound();
            }
            return Ok(city);
        }

        [HttpGet("getplacebycountryid")]
        public IActionResult GetPlacesByCountryId(int id)
        {
            var place = _countryRepository.GetPlacesByCountryId(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }
    }
}
