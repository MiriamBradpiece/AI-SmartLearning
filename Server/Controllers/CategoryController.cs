using Bl.Api;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        IBlCategory _blCategory;
       
        public CategoryController(IBl bl)
        {
            _blCategory = bl.Category;
        }
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _blCategory.GetCategoriesAsync();
            if (categories == null)
                return NotFound();
            return Ok(categories);
        }
        [HttpGet("get-subCategory")]
        public async Task<ActionResult<List<SubCategory>>> GetByCategoryId([FromQuery] int categoryId)
        {
            var subCategories = await _blCategory.GetSubCategoriesByCategoryIdAsync(categoryId);
            if (subCategories == null || subCategories.Count == 0)
            {
                return NotFound();
            }
            return Ok(subCategories);
        }
    }
}
