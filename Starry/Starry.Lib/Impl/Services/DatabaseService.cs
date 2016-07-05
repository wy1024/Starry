using Starry.Lib.Contracts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Lib.Impl.Services
{
    public class DatabaseService : IDatabaseService
    {
        private string sqlConnectionString = "Data Source=starry.database.windows.net;Initial Catalog=starry;Persist Security Info=True;User ID=wy1024;Password=Starry.2016;Pooling=False";

        public DatabaseService()
        {

        }

        public async Task<IKolEntityDetails> GetKolDetails()
        {
            using(var connection = new SqlConnection(sqlConnectionString))
            {
                await connection.OpenAsync();

                try
                {
                    using (var command = new SqlCommand("GetKolDetails"))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (var reader = await command.ExecuteReaderAsync())
                        {

                        }
                    }
                }
                catch
                {

                }
            }

            return null;
        }

        public async Task<IEnumerable<IKolEntity>> GetKolList()
        {
            throw new NotImplementedException();
        }
    }
}
