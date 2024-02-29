using Microsoft.AspNetCore.Mvc;
using T_I_yo_blog.Models;
using T_I_yo_blog.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace T_I_yo_blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsRepository _commentsRepository;
        public CommentsController(ICommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult GetPostById(int userId)
        {
            return Ok(_commentsRepository.GetAllCommentsByUserId(userId));
        }

        [HttpPost]
        public IActionResult Post(Comment? comment)
        {
            _commentsRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentsRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentsRepository.Update(comment);
            return NoContent();
        }
    }
}
