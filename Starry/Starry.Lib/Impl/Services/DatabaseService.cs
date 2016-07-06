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
                                    
                                    string owner_id = reader.GetString(0);
                                    string owner_name = reader.GetString(1);
                                    int avg_audience = reader.GetInt32(2);
                                    string profile_pic = reader.GetString(3);

                                    var entity = new KolEntity();
                                    entity.Name = owner_name;
                                    entity.Owner_Id = owner_id;
                                    entity.Fans = avg_audience.ToString();
                                    entity.ProfilePicUrl = profile_pic;
                                    kolList.Add(entity);
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
