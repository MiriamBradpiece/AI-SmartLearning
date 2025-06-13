using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api;

public interface IBlPrompt
{
    Task<Prompt> SubmitPromptAsync(int userId, int categoryId, int subCategoryId, string promptText);
    // קבלת היסטוריית הלמידה של משתמש מסוים
    Task<List<Prompt>> GetUserHistoryAsync(int userId);
    // קבלת כל הפרומפטים במערכת (לאדמין)
    Task<List<Prompt>> GetAllPrompts();
}
