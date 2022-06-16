using Microsoft.EntityFrameworkCore;
using Playground.Core.ApiQuery;
using Playground.Data.Entities;

namespace Playground.Data.Services;

public static class ItemExtensions
{
    public static IQueryable<Item> Search(this IQueryable<Item> items, string search) =>
        items.Where(x =>
            x.Name.ToLower().Contains(search.ToLower())
            || x.Type.ToLower().Contains(search.ToLower())
            || x.Category.Value.ToLower().Contains(search.ToLower())
        );
}

public class ItemService : ServiceBase<Item>
{
    IQueryable<Item> Search(IQueryable<Item> data, string term) =>
        data.Search(term);

    public ItemService(AppDbContext db) : base(db) { }

    public override async Task<QueryResult<Item>> QueryAll(QueryParams query) =>
        await Query(set, query, Search);

    public IAsyncEnumerable<Item> GetAllAsync() =>
        set
            .OrderBy(x => x.Name)
            .AsAsyncEnumerable();

    public async Task<Item> FindByName(string url) =>
        await set.FirstOrDefaultAsync(x =>
            x.Url.ToLower()
                .Equals(url.ToLower())
        );

    public async Task<bool> Validate(Item item) =>
        !await set
            .AnyAsync(x =>
                x.Id != item.Id
                && x.Type == item.Type
                && x.Name.ToLower() == item.Name.ToLower()
            );
}