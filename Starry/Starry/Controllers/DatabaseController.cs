using System;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections.Specialized;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Starry.Lib.Contracts;
using Starry.Lib.Impl.Services;
using System.Collections.Generic;

namespace Starry.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DatabaseController : ApiController
    {
        private readonly NameValueCollection settings;
        private readonly IDatabaseService dbservice;

        public DatabaseController()
        {
            settings = ConfigurationManager.AppSettings;
            dbservice = new DatabaseService();
        }


        [Route("api/DatabaseApi/GetKolList")]
        public async Task<JsonResult<IEnumerable<IKolEntity>>> GetKolList()
        {
            var kolList = await dbservice.GetKolList();
            return Json(kolList);
        }

        [Route("api/DatabaseApi/AddNewCompanyUser/{user_id}/{name}/{email}/{password}")]
        public async Task<JsonResult<bool>> AddNewCompanyUser(string user_id, string name, string email, string password)
        {
            var res = await dbservice.AddNewCompanyUser(user_id, name, email, password);
            if (res)
            {
                // Send verification email
            }
            return Json(res);
        }

        [Route("api/DatabaseApi/LoginCompanyUser/{password}")]
        public async Task<JsonResult<bool>> LoginCompanyUser(string password)
        {
            var res = await dbservice.LoginCompanyUser(password);
            return Json(res);
        }
    }
}
