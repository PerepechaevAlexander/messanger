using messanger.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace messanger.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        private NoteRepository _noteRepository { get; }

        public NoteController(NoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }


        /// <summary>
        /// Получить заметки.
        /// </summary>
        [HttpGet(nameof(Get))]
        public async Task<IActionResult> Get()
        {
            var notes = await _noteRepository.Get();
            return Ok(notes);
        }
    }
}
