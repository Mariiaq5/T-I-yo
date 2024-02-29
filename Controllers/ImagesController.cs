using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesRepository _imagesRepository;
        public ImagesController(IImagesRepository imagesRepository)
        {
            _imagesRepository = imagesRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_imagesRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Image image)
        {
            _imagesRepository.Add(image);
            return CreatedAtAction(
                "Get", new { id = image.Id }, image);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _imagesRepository.GetById(id);

                if (_imagesRepository == null)
                {
                    return NotFound($"Image with ID {id} not found");
                }

                _imagesRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _imagesRepository.Update(image);

            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var image = _imagesRepository.GetById(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }
    }
}
