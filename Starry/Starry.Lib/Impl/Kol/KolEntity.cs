using Starry.Lib.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Impl.Kol
{
    public class KolEntity : IKolEntity
    {
        public string Fans
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }

        public string Owner_Id
        {
            get; set;
        }

        public string ProfilePicUrl
        {
            get; set;
        }
    }
}
