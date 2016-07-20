using Starry.Lib.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Impl.Company
{
    public class CompanyGoal : ICompanyGoal
    {
        public string CampaignName
        {
            get; set;
        }

        public string Click
        {
            get; set;
        }

        public string CompanyUserId
        {
            get; set;
        }

        public string Demography
        {
            get; set;
        }

        public string Length
        {
            get; set;
        }

        public string Tags
        {
            get; set;
        }

        public string View
        {
            get; set;
        }
    }
}
