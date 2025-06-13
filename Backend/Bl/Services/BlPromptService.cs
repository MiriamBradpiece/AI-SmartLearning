using Bl.Api;
using Bl.Interface;
using Dal.Api;
using Dal.Models;
using Microsoft.Extensions.Logging;
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
    private readonly ILogger<BlPromptService> _logger;
    private readonly IOpenAI openAI;

    public BlPromptService(IDal dal, ILogger<BlPromptService> logger, IOpenAI openAI)
    {
        _prompt = dal.Prompt;
        _user = dal.User;
        _category = dal.Category;
        _subCategory = dal.SubCategory;
        _logger = logger;
        this.openAI = openAI;

    }

    public async Task<List<Prompt>> GetAllPrompts()
    {
        var prompts = await _prompt.GetAllAsync();
        if (prompts == null || !prompts.Any())
        {
            _logger.LogWarning("No prompts found in the system.");
            return new List<Prompt>();
        }
        return prompts;
    }



    public async Task<List<Prompt>> GetUserHistoryAsync(int userId)
    {
        try
        {
            var users = await _user.GetAllAsync();
            var user = users.Find(u => u.Id == userId);
            if (user == null) return new List<Prompt>();

            var allPrompts = await _prompt.GetAllAsync();
            return allPrompts.FindAll(p => p.UserId == user.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError($"GetUserLearningHistoryAsync error: {ex.Message}");
            return new List<Prompt>();
        }
    }

    public async Task<Prompt> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    {
        try
        {
            var users = await _user.GetAllAsync();
            var user = users.Find(u => u.Id == userId);
            if (user == null)
            {
                _logger.LogWarning($"User not found: {userId}");
                return null;
            }

            var categories = await _category.GetAllAsync();
            var category = categories.Find(c => c.Id == categoryId);
            if (category == null)
            {
                _logger.LogWarning($"Category not found: {categoryId}");
                return null;
            }

            var subCategories = await _subCategory.GetAllAsync();
            var subCategory = subCategories.Find(s => s.Id == categoryId );
            if (subCategory == null)
            {
                _logger.LogWarning($"SubCategory not found: {categoryId} in category {categoryId}");
                return null;
            }

            var aiResponse = await openAI.GenerateLessonAsync(categoryId, subCategoryId, promptText);
            if (string.IsNullOrWhiteSpace(aiResponse))
            {
                _logger.LogWarning("AI response was empty or null.");
                return null;
            }

            var prompt = new Prompt
            {
                UserId = user.Id,
                CategoryId = category.Id,
                SubCategoryId = subCategory.Id,
                Prompt1 = promptText,
                Response = aiResponse,
                CreatedAt = DateTime.UtcNow
            };
            await _prompt.CreateAsync(prompt);
            return prompt;
        }
        catch (Exception ex)
        {
            _logger.LogError($"SubmitPromptAndGetLessonAsync error: {ex.Message}");
            return null;
        }
    }


    
}


