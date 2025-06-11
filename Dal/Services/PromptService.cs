using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class PromptService:IPrompt
{
    DatabaseManager databaseManager;
    public PromptService(DatabaseManager db)
    {
        databaseManager = db;
    }

    public async Task<bool> CreateAsync(Prompt obj)
    {
        if (obj == null)
        {
            return false;
        }
        await databaseManager.Prompts.AddAsync(obj);
        await databaseManager.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Prompt obj)
    {
        if (obj == null)
        {
            return false;
        }
        var deleted = await databaseManager.Prompts.FirstOrDefaultAsync(x => x.Id == obj.Id);
        if (deleted != null)
        {
            databaseManager.Prompts.Remove(deleted);
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<Prompt>> GetAllAsync()
    {
        return await databaseManager.Prompts.ToListAsync();
    }

    public async Task<bool> UpdateAsync(Prompt obj)
    {
        if (obj == null)
        {
            return false;
        }
        var promptToUpdate = await databaseManager.Prompts.FirstOrDefaultAsync(c => c.Id == obj.Id);
        if (promptToUpdate != null)
        {
            promptToUpdate.UserId = obj.UserId;
            promptToUpdate.CategoryId = obj.CategoryId;
            promptToUpdate.SubCategoryId = obj.SubCategoryId;
            promptToUpdate.Response = obj.Response;
            promptToUpdate.User = obj.User;
            promptToUpdate.Prompt1 = obj.Prompt1;
            promptToUpdate.CreatedAt = obj.CreatedAt;
            promptToUpdate.Category = obj.Category;
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }
    public async Task<Prompt?> GetByIdAsync(int id)
    {
        return await databaseManager.Prompts
            .Include(p => p.Category)
            .Include(p => p.SubCategory)
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}
