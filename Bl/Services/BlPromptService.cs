using Bl.Api;
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

    public Task<Prompt> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    {
        throw new NotImplementedException();
    }


    //public async Task<Prompt> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    //{
    //    try
    //    {
    //        var users = await _user.GetAllAsync();
    //        var user = users.Find(u => u.Id == userId);
    //        if (user == null) return null;

    //        var categories = await _category.GetAllAsync();
    //        var category = categories.Find(c => c.Id == categoryId);
    //        if (category == null) return null;

    //        var subCategories = await _subCategory.GetAllAsync();
    //        var subCategory = subCategories.Find(s => s.Id == subCategoryId && s.CategoryId == category.Id);
    //        if (subCategory == null) return null;

    //        //var aiResponse = await aI.GenerateLessonAsync(promptText);

    //        var prompt = new Prompt
    //        {
    //            UserId = user.Id,
    //            CategoryId = category.Id,
    //            SubCategoryId = subCategory.Id,
    //            Prompt1 = promptText,
    //            Response = aiResponse,
    //            CreatedAt = DateTime.UtcNow
    //        };
    //        await _prompt.CreateAsync(prompt);
    //        return prompt;
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError($"SubmitPromptAndGetLessonAsync error: {ex.Message}");
    //        return null;
    //    }
    //}
}
//using Bl.Interfaces;
//using Dal.Interfaces;
//using Microsoft.Extensions.Logging;
//using Models.Classes;
//using MongoDB.Bson;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace Bl
//{
//    public class PromptServiceBl : IPromptBl
//    {
//        private readonly IDal _dal;
//        private readonly IAIService _aiService;
//        private readonly ILogger<PromptServiceBl> _logger;

//        public PromptServiceBl(IDal dal, IAIService aiService, ILogger<PromptServiceBl> logger)
//        {
//            _dal = dal;
//            _aiService = aiService;
//            _logger = logger;
//        }

//        public async Task<Prompt?> SubmitPromptAndGetLessonAsync(string customId, string categoryName, string subCategoryName, string promptText)
//        {
//            try
//            {
//                var users = await _dal.Users.GetAllAsync();
//                var user = users.Find(u => u.CustomId == customId);
//                if (user == null) return null;

//                var categories = await _dal.Categories.GetAllAsync();
//                var category = categories.Find(c => c.Name == categoryName);
//                if (category == null) return null;

//                var subCategories = await _dal.SubCategories.GetAllAsync();
//                var subCategory = subCategories.Find(s => s.Name == subCategoryName && s.CategoryId == category.Id);
//                if (subCategory == null) return null;

//                var aiResponse = await _aiService.GenerateLessonAsync(promptText);

//                var prompt = new Prompt
//                {
//                    UserId = user.Id,
//                    CategoryId = category.Id,
//                    SubCategoryId = subCategory.Id,
//                    PromptText = promptText,
//                    Response = aiResponse,
//                    CreatedAt = DateTime.UtcNow
//                };
//                await _dal.Prompts.AddAsync(prompt);
//                return prompt;
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError($"SubmitPromptAndGetLessonAsync error: {ex.Message}");
//                return null;
//            }
//        }


//        public async Task<List<Prompt>> GetUserLearningHistoryAsync(string customId)
//        {
//            try
//            {
//                var users = await _dal.Users.GetAllAsync();
//                var user = users.Find(u => u.CustomId == customId);
//                if (user == null) return new List<Prompt>();

//                var allPrompts = await _dal.Prompts.GetAllAsync();
//                return allPrompts.FindAll(p => p.UserId == user.Id);
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError($"GetUserLearningHistoryAsync error: {ex.Message}");
//                return new List<Prompt>();
//            }
//        }


//        public async Task<List<Prompt>> GetAllPromptsAsync()
//        {
//            try
//            {
//                return await _dal.Prompts.GetAllAsync();
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError($"GetAllPromptsAsync error: {ex.Message}");
//                return new List<Prompt>();
//            }
//        }
//    }
//}

