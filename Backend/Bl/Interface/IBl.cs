using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api;

public interface IBl
{
    public IBlUser User { get; }
    public IBlCategory Category { get; }
    public IBlPrompt Prompts { get; }
}
