using Microsoft.AspNetCore.Mvc;
using Playground.Data.Entities;
using Playground.Data.Services;

namespace Playground.Web.Controllers;

[Route("api/[controller]")]
public class ItemController : EntityController<Item>
{
    readonly ItemService itemSvc;
    public ItemController(ItemService svc) : base(svc)
    {
        itemSvc = svc;
    }

    [HttpGet("[action]/{url}")]
    [ProducesResponseType(typeof(Item), 200)]
    public async Task<IActionResult> FindByName(string url) =>
        Ok(await itemSvc.FindByName(url));
}