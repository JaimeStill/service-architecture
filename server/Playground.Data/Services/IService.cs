using Playground.Core.ApiQuery;
using Playground.Data.Entities;

namespace Playground.Data.Services;

public interface IService<T> where T : EntityBase
{
    Task<QueryResult<T>> QueryAll(QueryParams query);
    Task<T> Find(int id);
    Task<T> Save(T entity);
    Task<bool> Remove(T entity);
}