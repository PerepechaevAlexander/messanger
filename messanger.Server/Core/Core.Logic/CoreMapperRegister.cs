using Core.Dto;
using Mapster;
using Сore.Data.Models;

namespace Core.Logic;

/// <summary>
/// Маппинги Core-модуля
/// </summary>
public class CoreMapperRegister : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<BaseModel, BaseDto>();
    }
}
