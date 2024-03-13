using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Repositories;
using T_I_yo_blog.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        public FoodController(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_foodRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Food food)
        {
            _foodRepository.Add(food);
            return CreatedAtAction(
                "Get", new { id = food.Id }, food);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _foodRepository.GetById(id);

                if (_foodRepository == null)
                {
                    return NotFound($"Food with ID {id} not found");
                }

                _foodRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult Update(int id, Food food)
        {
            if (id != food.Id)
            {
                return BadRequest();
            }

            _foodRepository.Update(food);

            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var food = _foodRepository.GetFoodById(id);
            if  (food == null)
            {
                return NotFound();
            }
            return Ok(food);
        }

       [HttpGet("CountryId = {countryId}")]
        public IActionResult GetFoodByCountryId(int countryId)
        {
            var place = _foodRepository.GetFoodByCountryId(countryId);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        } 
    }
}