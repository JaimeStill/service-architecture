namespace Playground.Data.Entities;

public class Item : EntityBase
{
    public int CategoryId { get; set; }
    public string Type { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Url { get; set; }

    public Category Category { get; set; }
}

public class Armor : Item
{
    public int Defense { get; set; }
    public int Weight { get; set; }
}