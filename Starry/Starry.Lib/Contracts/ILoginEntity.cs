using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Contracts
{
    public interface ILoginEntity
    {
        string username { get; }
        string password { get; }
    }
}
