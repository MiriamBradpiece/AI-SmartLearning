﻿using Bl.Api;
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
    [HttpPost("submit")]
    public async Task<IActionResult> SubmitPrompt([FromBody] SubmitPromptRequest req)
    {
        var prompt = await _blPrompt.SubmitPromptAsync(req.UserId, req.CategoryId, req.SubCategoryId, req.PromptText);
        if (prompt == null)
            return BadRequest("Invalid data or failed to generate lesson.");
        return Ok(prompt.Response);
    }
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
    [HttpGet("get-all-prompts")]
    public async Task<ActionResult<List<Prompt>>> GetAllPrompts()
    {
        try
        {
            var prompts = await _blPrompt.GetAllPrompts();
            if (prompts == null || !prompts.Any())
                return NotFound("No prompts found in the system.");
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
public class SubmitPromptRequest
{
    public int UserId { get; set; }
    public int CategoryId { get; set; }
    public int SubCategoryId { get; set; }
    public string PromptText { get; set; }
}
