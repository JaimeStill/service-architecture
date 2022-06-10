using Playground.Core.ApiQuery;
using Playground.Data.Entities;

namespace Playground.Data.Services;

public static class WeaponExtensions
{
    public static IQueryable<Weapon> Search(this IQueryable<Weapon> weapons, string search) =>
        weapons.Where(x =>
            x.Name.ToLower().Contains(search.ToLower())
            || x.Category.Value.ToLower().Contains(search.ToLower())
        );
}

public class WeaponService : ServiceBase<Weapon>
{
    IQueryable<Weapon> Search(IQueryable<Weapon> data, string term) =>
        data.Search(term);

    public WeaponService(AppDbContext db) : base(db) { }

    public override async Task<QueryResult<Weapon>> QueryAll(QueryParams query) =>
        await Query(set, query, Search);

    public async Task<QueryResult<Weapon>> QueryByCategory(int categoryId, QueryParams query) =>
        await Query(
            set.Where(x => x.CategoryId == categoryId),
            query, Search
        );
}