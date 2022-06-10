using Microsoft.AspNetCore.Mvc;
using Playground.Core.ApiQuery;
using Playground.Data.Entities;
using Playground.Data.Services;

namespace Playground.Web.Controllers;

[Route("api/[controller]")]
public class WeaponController : EntityController<Weapon>
{
    readonly WeaponService weaponSvc;

    public WeaponController(WeaponService svc) : base(svc)
    {
        weaponSvc = svc;
    }

    [HttpGet("[action]/{categoryId}")]
    [ProducesResponseType(typeof(QueryResult<Weapon>), 200)]
    public async Task<IActionResult> QueryByCategory(
        [FromRoute]int categoryId,
        [FromQuery]QueryParams query
    ) => Ok(await weaponSvc.QueryByCategory(categoryId, query));
}