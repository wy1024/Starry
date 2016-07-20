using Starry.Lib.Contracts;
using Starry.Lib.Impl.Kol;
using Starry.Lib.Impl.util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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

        public async Task<bool> AddNewCompanyUser(string user_id, string name, string email, string password)
        {
            // Need to check if user name exists
            
            // Hash passwords and generate verification code
            var passwordHash = new PasswordHashing();
            var hashedPassword = passwordHash.GenerateHashedPassword(password);
            var emailVerificationCode = passwordHash.GenerateEmailVerificationCode();

            // Write to SQL 
            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();


                    using (var command = new SqlCommand("CompanyUser_Insert", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        
                        // Add parameters for insert
                        command.Parameters.Add(new SqlParameter("@name", name));
                        command.Parameters.Add(new SqlParameter("@user_id", user_id));
                        command.Parameters.Add(new SqlParameter("@email", email));
                        command.Parameters.Add(new SqlParameter("@password_hashed", hashedPassword));
                        command.Parameters.Add(new SqlParameter("@created_date", DateTime.UtcNow));
                        command.Parameters.Add(new SqlParameter("@email_verified", Convert.ToInt32(0)));
                        command.Parameters.Add(new SqlParameter("@email_verification_code", emailVerificationCode));


                        int i = await command.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> LoginCompanyUser(string username, string password)
        {
            var passwordHash = new PasswordHashing();

            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();


                    using (var command = new SqlCommand("CompanyUser_Select", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@username", username);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                string password_hashed = reader.GetString(0);
                                bool isPasswordCorrect = passwordHash.ComparePassword(password, password_hashed);
                                return isPasswordCorrect;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return false;
        }

        public async Task<bool> GetCompanyUserByUsername(string username)
        {
            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();


                    using (var command = new SqlCommand("CompanyUser_Select", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@username", username);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                return true;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return false;
        }

        public async Task<string> GetCompanyNameByUsername(string username)
        {
            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();


                    using (var command = new SqlCommand("CompanyUser_Select", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@username", username);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                string name = reader.GetString(1);
                                return name;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return "";
        }

        public async Task<bool> AddNewCompanyGoal(ICompanyGoal goal)
        {
            // Write to SQL 
            try
            {
                using (var connection = new SqlConnection(sqlConnectionString))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("CompanyGoal_Insert", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Add parameters for insert
                        command.Parameters.Add(new SqlParameter("@company_user_id", goal.CompanyUserId));
                        command.Parameters.Add(new SqlParameter("@campaign_name", goal.CampaignName));
                        command.Parameters.Add(new SqlParameter("@view", goal.View));
                        command.Parameters.Add(new SqlParameter("@click", goal.Click));
                        command.Parameters.Add(new SqlParameter("@demography", goal.Demography));
                        command.Parameters.Add(new SqlParameter("@tags", goal.Tags));
                        command.Parameters.Add(new SqlParameter("@length", goal.Length));

                        int i = await command.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }
    }
}
