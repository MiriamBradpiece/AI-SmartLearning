using Bl.Api;
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

}
