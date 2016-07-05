using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Contracts
{
    public interface IKolEntityDetails
    {
        string Name { get; }

        string ProfilePicUrl { get; }

        string Fans { get; }

        string FanStats { get; }
    }
}
