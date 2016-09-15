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

        Task<bool> GetCompanyUserByUsername(string username);

        Task<string> GetCompanyNameByUsername(string username);

        Task<bool> AddNewKolUser(string user_id, string name, string email, string password);

        Task<bool> LoginKolUser(string username, string password);

        Task<bool> GetKolUserByUsername(string username);

        Task<string> GetKolNameByUsername(string username);

        Task<bool> AddNewCompanyGoal(ICompanyGoal goal);
    }
}
