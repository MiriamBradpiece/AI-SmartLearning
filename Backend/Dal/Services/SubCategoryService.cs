using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class SubCategoryService:ISubCategory
{
    DatabaseManager databaseManager;
    public SubCategoryService(DatabaseManager db)
    {
        databaseManager = db;
    }


    public async Task<bool> CreateAsync(SubCategory obj) // Fixed spelling from "CreatAsync" to "CreateAsync"
    {
        if (obj == null)
        {
            return false;
        }
        await databaseManager.SubCategories.AddAsync(obj);
        await databaseManager.SaveChangesAsync();
        return true;
    }
    public async Task<bool> DeleteAsync(SubCategory obj)
    {
        if (obj == null)
        {
            return false;
        }
        var deleted = await databaseManager.SubCategories.FirstOrDefaultAsync(x => x.Id == obj.Id);
        if (deleted != null)
        {
            databaseManager.SubCategories.Remove(deleted);
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<List<SubCategory>> GetAllAsync()
    {
        return await databaseManager.SubCategories.ToListAsync();
    }

    public async Task<bool> UpdateAsync(SubCategory obj)
    {
        if (obj == null)
        {
            return false;
        }
        var subCategoryToUpdate = await databaseManager.SubCategories.FirstOrDefaultAsync(c => c.Id == obj.Id);
        if (subCategoryToUpdate != null)
        {
            subCategoryToUpdate.Name = obj.Name;
            subCategoryToUpdate.CategoryId = obj.CategoryId;
            subCategoryToUpdate.Category = obj.Category;
            subCategoryToUpdate.Prompts = obj.Prompts;
            await databaseManager.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
