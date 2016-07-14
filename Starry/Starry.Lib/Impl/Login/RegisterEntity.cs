using Starry.Lib.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Impl.Login
{
    public class RegisterEntity : IRegisterEntity
    {
        public string email
        {
            get; set;
        }

        public string name
        {
            get; set;
        }

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
