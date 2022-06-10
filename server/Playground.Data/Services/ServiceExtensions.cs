using Microsoft.Extensions.DependencyInjection;

namespace Playground.Data.Services;

public static class ServiceExtensions
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IService<>), typeof(ServiceBase<>));
        services.AddScoped<ArmorService>();
        services.AddScoped<CategoryService>();
        services.AddScoped<ItemService>();
        services.AddScoped<WeaponService>();
    }
}