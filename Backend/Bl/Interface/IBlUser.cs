using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api;

public interface IBlUser
{
    Task<bool> RegisterUserAsync(int id, string username, string phoneNumber);
    Task<List<User>> GetAllUsersAsync();
    Task<User> LogIn(int id, string phoneNumber);
}
