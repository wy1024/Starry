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
        public async Task<JsonResult<bool>> GetKolList()
        {
            var kolList = await dbservice.GetKolList();
            return Json(true);
        }
    }
}
