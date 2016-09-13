using System;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections.Specialized;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Starry.Lib.Contracts;
using Starry.Lib.Impl.Services;
using System.Collections.Generic;
using Starry.Lib.Impl.Login;
using Starry.Lib.Impl.Company;

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

        [HttpGet]
        [Route("api/DatabaseApi/GetKolList")]
        public async Task<JsonResult<IEnumerable<IKolEntity>>> GetKolList()
        {
            var kolList = await dbservice.GetKolList();
            return Json(kolList);
        }

        [HttpGet]
        [Route("api/DatabaseApi/GetCompanyUserByUsername/{username}")]
        public async Task<JsonResult<bool>> GetCompanyUserByUsername(string username)
        {
            bool userExists = await dbservice.GetCompanyUserByUsername(username);
            return Json(userExists);
        }

        [HttpGet]
        [Route("api/DatabaseApi/GetCompanyNameByUsername/{username}")]
        public async Task<JsonResult<string>> GetCompanyNameByUsername(string username)
        {
            string companyName = await dbservice.GetCompanyNameByUsername(username);
            return Json(companyName);
        }

        [HttpPost]
        [Route("api/DatabaseApi/AddNewCompanyUser")]
        public async Task<JsonResult<bool>> AddNewCompanyUser([FromBody]RegisterEntity entity)
        {
            var res = await dbservice.AddNewCompanyUser(entity.username, entity.name, entity.email, entity.password);
            if (res)
            {
                // Send verification email
            }
            return Json(res);
        }

        [HttpPost]
        [Route("api/DatabaseApi/LoginCompanyUser")]
        public async Task<JsonResult<bool>> LoginCompanyUser([FromBody]LoginEntity entity)
        {
            var res = await dbservice.LoginCompanyUser(entity.username, entity.password);
            return Json(res);
        }

        [HttpPost]
        [Route("api/DatabaseApi/AddNewCompanyGoal")]
        public async Task<JsonResult<bool>> AddNewCompanyGoal([FromBody]CompanyGoal goal)
        {
            var res = await dbservice.AddNewCompanyGoal(goal);
            if (res)
            {
                // Send verification email
            }
            return Json(res);
        }
    }
}
