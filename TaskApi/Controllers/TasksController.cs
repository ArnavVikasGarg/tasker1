using Microsoft.AspNetCore.Mvc;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskRepository _repository;

        public TasksController(TaskRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetTasks() => Ok(_repository.GetAll());

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskItem task)
        {
            task.Id = Guid.NewGuid();
            _repository.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            if (!_repository.Update(id, task))
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            if (!_repository.Delete(id))
                return NotFound();
            return NoContent();
        }
    }
}