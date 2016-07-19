using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Contracts
{
    public interface ICompanyGoal
    {
        string CompanyUserId { get; }

        string CampaignName { get; }

        string View { get; }

        string Click { get; }

        string Demography { get; }

        string tags { get; }
    }
}
