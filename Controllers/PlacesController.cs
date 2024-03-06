using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlacesRepository _placesRepository;
        public PlacesController(IPlacesRepository placesRepository)
        {
            _placesRepository = placesRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_placesRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Place place)
        {
            _placesRepository.Add(place);
            return CreatedAtAction(
                "Get", new { id = place.Id }, place);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _placesRepository.GetById(id);

                if (_placesRepository == null)
                {
                    return NotFound($"Place with ID {id} not found");
                }

                _placesRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Place place)
        {
            if (id != place.Id)
            {
                return BadRequest();
            }

            _placesRepository.Update(place);

            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var place = _placesRepository.GetPlaceById(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }

        [HttpGet("/bycountry/{countryId}")]
        public IActionResult GetPlacesByCountryId(int countryId)
        {
            var place = _placesRepository.GetPlacesByCountryId(countryId);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }
    }
}
