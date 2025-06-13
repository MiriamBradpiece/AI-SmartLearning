using Bl.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services;

public class BlCategoryService:IBlCategory
{
    ICategory _category;
    ISubCategory _subCategory;

    public BlCategoryService(IDal dal)
    {
        _category = dal.Category;
        _subCategory = dal.SubCategory;
    }

    public async Task<List<Category>> GetCategoriesAsync()
    {
        return await _category.GetAllAsync();
    }

    public async Task<List<SubCategory>> GetSubCategoriesByCategoryIdAsync(int categoryId)
    {
        var allSubCategories = await _subCategory.GetAllAsync();
        return allSubCategories
            .Where(sc => sc.CategoryId == categoryId)
            .ToList();
    }
}
