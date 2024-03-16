using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_usersRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _usersRepository.Add(user);
            return CreatedAtAction(
                "Get", new { id = user.Id }, user);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _usersRepository.GetById(id);

                if (_usersRepository == null)
                {
                    return NotFound($"User with ID {id} not found");
                }

                _usersRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _usersRepository.Update(user);

            return NoContent();
        }

        [HttpGet("getbyemail")]
        public IActionResult Get(string email)
        {
            var user = _usersRepository.GetByEmail(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
