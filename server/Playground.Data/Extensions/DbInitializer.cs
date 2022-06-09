using Microsoft.EntityFrameworkCore;
using Playground.Data.Entities;

namespace Playground.Data.Extensions;
public static class DbInitializer
{
    public static async Task Initialize(this AppDbContext db)
    {
        Console.WriteLine("Initializing database");
        await db.Database.MigrateAsync();
        Console.WriteLine("Database initialized");

        if (!await db.Categories.AnyAsync(x => x.Value == "Light" || x.Value == "Heavy"))
        {
            Console.WriteLine("Seeding categories and armors...");

            var categories = new List<Category>
            {
                new Category
                {
                    Value = "Light",
                    Items = new List<Item>
                    {
                        new Armor
                        {
                            Name = "Deathbrand Helm",
                            Description = "Light Helmet",
                            Url = "deathbrand-helm",
                            Defense = 18,
                            Weight = 2
                        },
                        new Armor
                        {
                            Name = "Armor of the Old Gods",
                            Description = "Light Curaiss",
                            Url = "armor-of-the-old-gods",
                            Defense = 24,
                            Weight = 3
                        }
                    }
                },
                new Category
                {
                    Value = "Heavy",
                    Items = new List<Item>
                    {
                        new Armor
                        {
                            Name = "The Jagged Crown",
                            Description = "Heavy Helmet",
                            Url = "jagged-crown",
                            Defense = 23,
                            Weight = 9
                        },
                        new Armor
                        {
                            Name = "Daedric Armor",
                            Description = "Heavy Curaiss",
                            Url = "daedric-armor",
                            Defense = 49,
                            Weight = 50
                        }
                    }
                }
            };

            await db.Categories.AddRangeAsync(categories);
            await db.SaveChangesAsync();
        }
    }
}