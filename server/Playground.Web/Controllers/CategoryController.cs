using Microsoft.AspNetCore.Mvc;
using Playground.Data.Entities;
using Playground.Data.Services;

namespace Playground.Web.Controllers;

[Route("api/[controller]")]
public class CategoryController : EntityController<Category>
{
    readonly CategoryService categorySvc;

    public CategoryController(CategoryService svc) : base(svc)
    {
        categorySvc = svc;
    }

    [HttpGet("[action]")]
    [ProducesResponseType(typeof(List<Category>), 200)]
    public async Task<IActionResult> GetAll() =>
        Ok(await categorySvc.GetAll());

    [HttpGet("[action]/{categoryId}")]
    [ProducesResponseType(typeof(List<Item>), 200)]
    public async Task<IActionResult> GetItems([FromRoute]int categoryId) =>
        Ok(await categorySvc.GetItems(categoryId));
}