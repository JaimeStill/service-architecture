using Playground.Core.ApiQuery;
using Playground.Data.Entities;

namespace Playground.Data.Services;

public static class ArmorExtensions
{
    public static IQueryable<Armor> Search(this IQueryable<Armor> armor, string search) =>
        armor.Where(x =>
            x.Name.ToLower().Contains(search.ToLower())
            || x.Category.Value.ToLower().Contains(search.ToLower())
        );
}

public class ArmorService : ServiceBase<Armor>
{
    IQueryable<Armor> Search(IQueryable<Armor> data, string term) =>
        data.Search(term);

    public ArmorService(AppDbContext db) : base(db) { }

    public override async Task<QueryResult<Armor>> QueryAll(QueryParams query) =>
        await Query(set, query, Search);

    public async Task<QueryResult<Armor>> QueryByCategory(int categoryId, QueryParams query) =>
        await Query(
            set.Where(x => x.CategoryId == categoryId),
            query, Search
        );
}