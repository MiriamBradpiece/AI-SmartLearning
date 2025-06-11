using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api;

public interface IDal
{
    public IUser User { get; }
    public ICategory Category { get; }
    public ISubCategory SubCategory { get; }
    public IPrompt Prompt { get; }
}
