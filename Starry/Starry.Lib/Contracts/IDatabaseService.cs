using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Contracts
{
    public interface IDatabaseService
    {
        Task<IEnumerable<IKolEntity>> GetKolList();

        Task<IKolEntityDetails> GetKolDetails();

        Task<bool> AddNewCompanyUser(string user_id, string name, string email, string password);

        Task<bool> LoginCompanyUser(string username, string password);
    }
}
