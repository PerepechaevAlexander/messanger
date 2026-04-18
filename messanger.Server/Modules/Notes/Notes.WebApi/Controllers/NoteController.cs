using Microsoft.AspNetCore.Mvc;
using Notes.Logic.Contracts;

namespace Notes.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class NoteController : ControllerBase
{
    private INoteRepository _noteRepository { get; }

    public NoteController(INoteRepository noteRepository)
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
