using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class UserService:IUser
{
    DatabaseManager databaseManager;
    public UserService(DatabaseManager db)
    {
        databaseManager = db;
    }

    public async Task<bool> DeleteAsync(User obj)
    {
        if (obj == null)
        {
            return false;
        }
        var deleted = await databaseManager.Users.FirstOrDefaultAsync(x => x.Id == obj.Id);
        if (deleted != null)
        {
            databaseManager.Users.Remove(deleted);
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await databaseManager.Users.ToListAsync();
    }

    public async Task<bool> UpdateAsync(User obj)
    {
        if (obj == null)
        {
            return false;
        }
        var userToUpdate = await databaseManager.Users.FirstOrDefaultAsync(c => c.Id == obj.Id);
        if (userToUpdate != null)
        {
            userToUpdate.Name = obj.Name;
            userToUpdate.Phone = obj.Phone;
            userToUpdate.Prompts = obj.Prompts;
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }
    public async Task<bool> CreateAsync(User obj) // Fixed spelling from "CreatAsync" to "CreateAsync"
    {
        if (obj == null)
        {
            return false;
        }
        await databaseManager.Users.AddAsync(obj);
        await databaseManager.SaveChangesAsync();
        return true;
    }
}
