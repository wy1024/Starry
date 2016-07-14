using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Contracts
{
    public interface IRegisterEntity
    {
        string username { get; }
        string name { get; }
        string email { get; }
        string password { get; }
    }
}
