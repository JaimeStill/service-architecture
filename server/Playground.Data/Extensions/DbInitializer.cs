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
            Console.WriteLine("Seeding categories and items...");

            var categories = new List<Category>
            {
                new Category
                {
                    Value = "Curaiss",
                    Items = new List<Item>
                    {
                        new Armor
                        {
                            Name = "Armor of the Old Gods",
                            Defense = 24,
                            Weight = 3
                        },
                        new Armor
                        {
                            Name = "Daedric Armor",
                            Defense = 49,
                            Weight = 50
                        }
                    }
                },
                new Category
                {
                    Value = "Helmet",
                    Items = new List<Item>
                    {
                        new Armor
                        {
                            Name = "The Jagged Crown",
                            Defense = 23,
                            Weight = 9
                        },
                        new Armor
                        {
                            Name = "Deathbrand Helm",
                            Defense = 18,
                            Weight = 2
                        }
                    }
                },
                new Category
                {
                    Value = "Battleaxe",
                    Items = new List<Item>
                    {
                        new Weapon
                        {
                            Name = "Wuuthrad",
                            Damage = 25,
                            Weight = 25
                        },
                        new Weapon
                        {
                            Name = "Tsun's Battleaxe",
                            Damage = 27,
                            Weight = 36
                        }
                    }
                },
                new Category
                {
                    Value = "Sword",
                    Items = new List<Item>
                    {
                        new Weapon
                        {
                            Name = "Bloodscythe",
                            Damage = 13,
                            Weight = 10
                        },
                        new Weapon
                        {
                            Name = "Grimsever",
                            Damage = 12,
                            Weight = 14
                        }
                    }
                }
            };

            await db.Categories.AddRangeAsync(categories);
            await db.SaveChangesAsync();
        }
    }
}