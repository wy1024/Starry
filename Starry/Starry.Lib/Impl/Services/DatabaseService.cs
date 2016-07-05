using Starry.Lib.Contracts;
using Starry.Lib.Impl.Kol;
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
            int someID = 111;


            using (var connection = new SqlConnection(sqlConnectionString))
            {
                await connection.OpenAsync();

                try
                {
                    using (var command = new SqlCommand("PeopleDetails_Select", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        var param = new SqlParameter("@owner_id", someID);
                        command.Parameters.Add(param);

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
            var kolList = new List<IKolEntity>();
            var kolEntity = new KolEntity();

            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();


                    using (var command = new SqlCommand("People_SelectAll", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    int _id = reader.GetInt32(0);
                                    int owner_id = reader.GetInt32(1);
                                    String owner_name = reader.GetString(2);
                                    Int16 verified = reader.GetInt16(3);

                                    kolEntity.Name = owner_name;
                                    kolList.Add(kolEntity);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return kolList;
        }
    }
}
