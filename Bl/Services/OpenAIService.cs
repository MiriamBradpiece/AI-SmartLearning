using Bl.Interface;
using Bl.Models;
using Dal.Api;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Bl.Services;

public class OpenAIService:IOpenAI
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _model;
    private readonly ILogger<OpenAIService> _logger;
    private readonly ICategory _category;
    private readonly ISubCategory _subCategory;

    public OpenAIService(HttpClient httpClient, IOptions<OpenAI> options, ILogger<OpenAIService> logger,IDal dal)
    {
        _httpClient = httpClient;
        var openAIOptions = options.Value;
        _apiKey = openAIOptions.ApiKey;
        _model = openAIOptions.Model;
        _logger = logger;
        _category = dal.Category;
        _subCategory = dal.SubCategory;
    }

    public async Task<string> GenerateLessonAsync(int  categoryID, int subCategory, string promptText)
    {
        var categories = await _category.GetAllAsync();
        var categoryName = categories.FirstOrDefault(c => c.Id == categoryID);
        var subCategories = await _subCategory.GetAllAsync();
        var subCategoryName = subCategories.FirstOrDefault(s => s.Id == subCategory)?.Name ?? "General";
        try
        {
            var fullPrompt = $"Teach a lesson about the category '{categoryName}', specifically the subcategory '{subCategoryName}'. The user wants to learn: {promptText}";

            var requestBody = new
            {
                model = _model,
                messages = new[]
                {
                new { role = "user", content = fullPrompt }
            }
            };

            var requestJson = JsonSerializer.Serialize(requestBody);
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = new StringContent(requestJson, Encoding.UTF8, "application/json")
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError($"OpenAI API error: {response.StatusCode} - {errorContent}");
                return "Sorry, there was a problem generating your lesson. Please try again later.";
            }

            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);
            var content = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return content ?? "No lesson content was returned.";
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP request error: {Message}", ex.Message);
            return "Sorry, there was a network problem. Please try again later.";
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON parsing error: {Message}", ex.Message);
            return "Sorry, there was a problem understanding the AI response.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error: {Message}", ex.Message);
            return "Sorry, an unexpected error occurred.";
        }
    }
}
