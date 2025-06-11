using Bl.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bl.Services;

public class BlPromptService : IBlPrompt
{
    private readonly IPrompt _prompt;
    private readonly IUser _user;
    private readonly ICategory _category;
    private readonly ISubCategory _subCategory;

    public BlPromptService(IDal dal)
    {
        _prompt = dal.Prompt;
        _user = dal.User;
        _category = dal.Category;
        _subCategory = dal.SubCategory;
    }

    public Task<List<Prompt>> GetAllPrompts()
    {
        throw new NotImplementedException();
    }

    public Task<string> GetPromptResponseAsync(int promptId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Prompt>> GetUserHistoryAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<int> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    {
        throw new NotImplementedException();
    }

    //public async Task<int> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    //{
    //    // Check if the user exists
    //    var userExists = (await _user.GetAllAsync()).Any(u => u.Id == userId);
    //    if (!userExists)
    //        throw new Exception("User does not exist");

    //    // Check if the category exists
    //    var categoryExists = (await _category.GetAllAsync()).Any(c => c.Id == categoryId);
    //    if (!categoryExists)
    //        throw new Exception("Category does not exist");

    //    // Check if the sub-category exists AND belongs to the category
    //    var subCat = (await _subCategory.GetAllAsync())
    //        .FirstOrDefault(sc => sc.Id == subCategoryId && sc.CategoryId == categoryId);
    //    if (subCat == null)
    //        throw new Exception("SubCategory does not exist or does not belong to the category");

    //    // Create the prompt object
    //    var prompt = new Prompt
    //    {
    //        UserId = userId,
    //        CategoryId = categoryId,
    //        SubCategoryId = subCategoryId,
    //        PromptText = promptText,
    //        CreatedAt = DateTime.UtcNow
    //    };

    //    await _prompt.CreateAsync(prompt);
    //    return prompt.Id; // Assumes CreateAsync sets the Id after DB insert
    //}
}