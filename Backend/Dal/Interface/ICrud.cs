using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api;

public interface ICrud<T>
{
    Task<bool> CreateAsync(T obj);
    Task<List<T>> GetAllAsync();
    Task<bool> UpdateAsync(T obj);
    Task<bool> DeleteAsync(T obj);
}
