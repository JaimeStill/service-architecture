using Microsoft.AspNetCore.Mvc;
using Playground.Core.ApiQuery;
using Playground.Data.Entities;
using Playground.Data.Services;

namespace Playground.Web.Controllers;

public class EntityController<T> : ControllerBase where T : EntityBase
{
    protected readonly IService<T> svc;

    public EntityController(IService<T> svc)
    {
        this.svc = svc;
    }

    [HttpGet("[action]")]
    public virtual async Task<ActionResult<QueryResult<T>>> Query([FromQuery]QueryParams query) =>
        Ok(await svc.QueryAll(query));

    [HttpPost("[action]")]
    public virtual async Task<ActionResult<T>> Save([FromBody]T entity) =>
        Ok(await svc.Save(entity));

    [HttpPost("[action]")]
    public virtual async Task<ActionResult<bool>> Remove([FromBody]T entity) =>
        Ok(await svc.Remove(entity));
}