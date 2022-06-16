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
    public async Task<IActionResult> FindByName([FromRoute]string url) =>
        Ok(await itemSvc.FindByName(url));

    [HttpGet("[action]")]
    public IAsyncEnumerable<Item> GetAllAsync() =>
        itemSvc.GetAllAsync();

    [HttpPost("[action]")]
    [ProducesResponseType(typeof(bool), 200)]
    public async Task<IActionResult> Validate([FromBody]Item item) =>
        Ok(await itemSvc.Validate(item));
}