using Bl.Api;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromptController : ControllerBase
{
    IBlPrompt _blPrompt;
    public PromptController(IBl bl)
    {
        _blPrompt = bl.Prompts;
    }
    //[HttpPost("submit")]
    //public async Task<IActionResult> SubmitPrompt([FromBody] int UserId, int CategoryId, int SubCategoryId, string PromptText)
    //{
    //    if (
    //        string.IsNullOrWhiteSpace(PromptText))
    //        return BadRequest("Invalid input");

    //    try
    //    {
    //        var promptId = await _blPrompt.SubmitPromptAsync(UserId, CategoryId, SubCategoryId, PromptText);
    //        return Ok(new { PromptId = promptId });
    //    }
    //    catch (System.Exception ex)
    //    {
    //        return BadRequest(new { Error = ex.Message });
    //    }
    //}
    [HttpGet("get-history")]  
    public async Task<ActionResult<List<Prompt>>> GetUserHistory([FromQuery] int userId)
    {
        if (userId <= 0)
            return BadRequest("Invalid user ID");
        try
        {
            var prompts = await _blPrompt.GetUserHistoryAsync(userId);
            if (prompts == null )
                return NotFound("No prompts found for this user.");
           return Ok(prompts.Select(p => new Prompt
            {
                Id = p.Id,
                UserId = p.UserId,
                CategoryId = p.CategoryId,
                SubCategoryId = p.SubCategoryId,
                Prompt1 = p.Prompt1,
                CreatedAt = p.CreatedAt,
                Response = p.Response
           }).ToList());
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

}

