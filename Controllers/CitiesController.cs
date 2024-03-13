using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;
using T_I_yo_blog.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICitiesRepository _cityRepository;
        public CitiesController(ICitiesRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_cityRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(City city)
        {
            _cityRepository.Add(city);
            return CreatedAtAction(
                "Get", new { id = city.Id }, city);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _cityRepository.GetById(id);

                if (_cityRepository == null)
                {
                    return NotFound($"City with ID {id} not found");
                }

                _cityRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdatePlace(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            _cityRepository.Update(city);

            return NoContent();
        }

       /* [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var city = _cityRepository.GetById(id);
            if (city == null)
            {
                return NotFound();
            }
            return Ok(city);
        } */

        [HttpGet("/bycountry={countryId}")]
        public IActionResult GetCitiesByCountryId(int countryId)
        {
            var city = _cityRepository.GetCitiesByCountryId(countryId);
            if (city == null)
            {
                return NotFound();
            }
            return Ok(city);
        }
    }
}