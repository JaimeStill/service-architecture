using Microsoft.AspNetCore.Mvc;
using Playground.Core.ApiQuery;
using Playground.Data.Entities;
using Playground.Data.Services;

namespace Playground.Web.Controllers;

[Route("api/[controller]")]
public class ArmorController : EntityController<Armor>
{
    readonly ArmorService armorSvc;

    public ArmorController(ArmorService svc) : base(svc)
    {
        armorSvc = svc;
    }

    [HttpGet("[action]/{categoryId}")]
    [ProducesResponseType(typeof(QueryResult<Armor>), 200)]
    public async Task<IActionResult> QueryByCategory(
        [FromRoute]int categoryId,
        [FromQuery]QueryParams query
    ) => Ok(await armorSvc.QueryByCategory(categoryId, query));
}