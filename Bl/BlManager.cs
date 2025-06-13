using Bl.Api;
using Bl.Interface;
using Bl.Services;
using Dal;
using Dal.Api;
using Microsoft.Extensions.DependencyInjection;

namespace Bl;

public class BlManager:IBl
{
    public IBlUser User { get; }
    public IBlCategory Category { get; }
    public IBlPrompt Prompts { get; }
    public BlManager()
    {
        ServiceCollection services = new ServiceCollection();

        services.AddSingleton<IDal, DalManager>();

        services.AddSingleton<IBlUser, BlUserService>();
        services.AddSingleton<IBlPrompt, BlPromptService>();
        services.AddSingleton<IBlCategory, BlCategoryService>();
        services.AddHttpClient<IOpenAI, OpenAIService>();
        ServiceProvider serviceProvider = services.BuildServiceProvider();


        User = serviceProvider.GetService<IBlUser>();
        Category = serviceProvider.GetService<IBlCategory>();
        Prompts = serviceProvider.GetService<IBlPrompt>();
    }
}
