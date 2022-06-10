using Microsoft.EntityFrameworkCore;

namespace Playground.Data.Entities.Config;

public static class ItemConfig
{
    public static void ConfigureItem(this ModelBuilder builder)
    {
        builder
            .Entity<Item>()
            .HasDiscriminator(x => x.Type)
            .HasValue<Item>("item")
            .HasValue<Armor>("armor")
            .HasValue<Weapon>("weapon");
    }
}