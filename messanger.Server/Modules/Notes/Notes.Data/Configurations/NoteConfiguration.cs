using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Notes.Data.Models;
using Сore.Data.Configurations;

namespace Notes.Data.Configurations;

/// <summary>
/// Конфигурация <see cref="Note"/>
/// </summary>
public class NoteConfiguration : BaseEntityConfiguration<Note>
{
    /// <inheritdoc />
    public override void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("notes");
    }
}
