using Playground.Core.Extensions;

namespace Playground.Data.Entities;

public class Item : EntityBase
{
    public int CategoryId { get; set; }
    public string Type { get; set; }
    public string Name { get; set; }
    public string Url => Name.UrlEncode();
    public int Weight { get; set; }

    public Category Category { get; set; }
}

public class Armor : Item
{
    public int Defense { get; set; }
}

public class Weapon : Item
{
    public int Damage { get; set; }
}