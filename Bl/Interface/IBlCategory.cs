using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api;

public interface IBlCategory
{
    Task<List<SubCategory>> GetSubCategoriesByCategoryIdAsync(int categoryId);
    Task<List<Category>> GetCategoriesAsync();
}
