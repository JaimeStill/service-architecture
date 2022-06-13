using Microsoft.EntityFrameworkCore;
using Playground.Core.ApiQuery;
using Playground.Data.Entities;

namespace Playground.Data.Services;

public static class CategoryExtensions
{
    public static IQueryable<Category> Search(this IQueryable<Category> categories, string search) =>
        categories.Where(x =>
            x.Value.ToLower().Contains(search.ToLower())
        );
}

public class CategoryService : ServiceBase<Category>
{
    IQueryable<Category> Search(IQueryable<Category> data, string term) =>
        data.Search(term);

    public CategoryService(AppDbContext db) : base(db) { }

    public override async Task<QueryResult<Category>> QueryAll(QueryParams query) =>
        await Query(set, query, Search);

    public async Task<List<Category>> GetAll() =>
        await set
            .OrderBy(x => x.Value)
            .ToListAsync();

    public async Task<List<Item>> GetItems(int categoryId) =>
        await db.Items
            .Where(x => x.CategoryId == categoryId)
            .OrderBy(x => x.Name)
            .ToListAsync();

    public async Task<bool> Validate(Category category) =>
        !await set
            .AnyAsync(x =>
                x.Id != category.Id
                && x.Value.ToLower() == category.Value.ToLower()
            );
}