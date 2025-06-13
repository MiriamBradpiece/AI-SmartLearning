using Bl.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services;

public class BlUserService:IBlUser
{
    IUser _user;
    public BlUserService(IDal dal)
    {
        _user=dal.User;
    }
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _user.GetAllAsync();
    }

    public async Task<User> LogIn(int id, string name)
    {
        var users = await _user.GetAllAsync();
        var user = users.FirstOrDefault(u => u.Id==id);
        if (user == null)
            return null;
        return user;
    }

  

    public async Task<bool> RegisterUserAsync(int id, string username, string phoneNumber)
    {
        var users = await _user.GetAllAsync();
        var user = users.FirstOrDefault(c => c.Id==id);
        if (user == null)
        {
            var newClient = new User()
            {
                Id =id,
                Name = username,
                Phone = phoneNumber,
            };
            await _user.CreateAsync(newClient);
            return true;
        }
        return false;
    }
}
