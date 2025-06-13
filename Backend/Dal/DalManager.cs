using Dal.Api;
using Dal.Models;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Dal;

public class DalManager:IDal
{
    public IUser User { get; }
    public ICategory Category { get; }
    public ISubCategory SubCategory { get; }
    public IPrompt Prompt { get; }

    public DalManager()
    {
        ServiceCollection services = new ServiceCollection();
        services.AddSingleton<DatabaseManager>();
        services.AddSingleton<IUser, UserService>();
        services.AddSingleton<ICategory, CategoryService>();
        services.AddSingleton<ISubCategory, SubCategoryService>();
        services.AddSingleton<IPrompt, PromptService>();

        ServiceProvider serviceProvider = services.BuildServiceProvider();

        User = serviceProvider.GetService<IUser>();
        Category = serviceProvider.GetService<ICategory>();
        SubCategory = serviceProvider.GetService<ISubCategory>();
        Prompt = serviceProvider.GetService<IPrompt>();

    }
}
