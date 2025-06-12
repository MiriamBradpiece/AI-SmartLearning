using Bl.Api;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    IBlUser _blUser;
    public UserController(IBl bl)
    {
        _blUser = bl.User;
    }
    [HttpPost("register")]
    public async Task<ActionResult<bool>> RegisterUserAsync([FromQuery] int id, [FromQuery] string username, [FromQuery] string phoneNumber)
    {
        Console.WriteLine($"id: {id}, username: {username}, phoneNumber: {phoneNumber}");
        try
        {
            bool result = await _blUser.RegisterUserAsync(id, username, phoneNumber);
            if (result)
            {
                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    [HttpGet("Get-all-users")]
    public async Task<ActionResult<List<User>>> GetAllUsersAsync()
    {
        try
        {
            var users = await _blUser.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    [HttpGet("login")]
    public async Task<ActionResult<User>> LogIn([FromQuery] int id, [FromQuery] string name)
    {
        try
        {
            var user = await _blUser.LogIn(id, name);
            if (user != null)
            {
                var userDto = new User
                {
                    Id = user.Id,
                    Name = user.Name
                    // שדות נוספים...
                };
                return Ok(userDto);
            }
            return NotFound("User not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
