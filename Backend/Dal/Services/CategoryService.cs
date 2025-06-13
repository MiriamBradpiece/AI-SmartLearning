using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class CategoryService : ICategory
{
    DatabaseManager databaseManager;
    public CategoryService(DatabaseManager db)
    {
        databaseManager = db;
    }
    public async Task<bool> CreateAsync(Category obj)
    {
        if (obj == null)
        {
            return false;
        }
        await databaseManager.Categories.AddAsync(obj);
        await databaseManager.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Category obj)
    {
        if (obj == null)
        {
            return false;
        }
        var deleted = await databaseManager.Categories.FirstOrDefaultAsync(x => x.Id == obj.Id);
        if (deleted != null)
        {
            databaseManager.Categories.Remove(deleted);
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await databaseManager.Categories.ToListAsync();
    }

    public async Task<bool> UpdateAsync(Category obj)
    {
        if (obj == null)
        {
            return false;
        }
        var categoryToUpdate = await databaseManager.Categories.FirstOrDefaultAsync(c => c.Id == obj.Id);
        if (categoryToUpdate != null)
        {
            categoryToUpdate.Name = obj.Name;
            categoryToUpdate.SubCategories = obj.SubCategories;
            categoryToUpdate.Prompts = obj.Prompts;
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
