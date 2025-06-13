using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interface;

public interface IOpenAI
{
    Task<string> GenerateLessonAsync(int categoryID, int subCategory, string promptText);
}
