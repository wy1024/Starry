using Starry.Lib.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Impl.Login
{
    public class LoginEntity : ILoginEntity
    {
        public string password
        {
            get; set;
        }

        public string username
        {
            get; set;
        }
    }
}
