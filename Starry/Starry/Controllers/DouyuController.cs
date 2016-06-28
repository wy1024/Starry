using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Starry.Library;
using System.Web.Http.WebHost;
using System.Web.SessionState;
//using System.Web.Routing;
using System.Web.Http.Cors;
using Starry.Library.WeiboUtil;
using System.Collections.Specialized;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace Starry.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DouyuController : ApiController
    {
        NameValueCollection settings;

        public DouyuController()
        {
            settings = ConfigurationManager.AppSettings;
        }

        /// <summary>
        /// http://open.douyucdn.cn/api/RoomApi/live/lol 
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [Route("api/RoomApi/live/{offset}/{limit}")]
        public async Task<JsonResult<string>> GetRoomsList(int offset = 0, int limit = 30)
        {
            string url = "http://open.douyucdn.cn/api/RoomApi/live/lol";
            string urlParameters = $"?limit={limit}&offset={offset}";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            // Get data response.
            var responseString = "";
            HttpResponseMessage response = await client.GetAsync(urlParameters);  // Blocking call!
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body. Blocking!
                responseString = await response.Content.ReadAsStringAsync();
            }
            else
            {
                responseString = "Failed to get rooms";
            }
            return Json(responseString);
        }

        /// <summary>
        /// http://open.douyucdn.cn/api/RoomApi/game
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [Route("api/RoomApi/game")]
        public async Task<JsonResult<string>> GetRoomsCategory()
        {
            string url = "http://open.douyucdn.cn/api/RoomApi/game";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            // Get data response.
            var responseString = "";
            HttpResponseMessage response = await client.GetAsync(string.Empty);  // Blocking call!
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body. Blocking!
                responseString = await response.Content.ReadAsStringAsync();
            }
            else
            {
                responseString = "Failed to get game category";
            }
            return Json(responseString);
        }

        [Route("api/RoomApi/room/{id}")]
        public async Task<JsonResult<string>> GetRoomInfo(int id)
        {
            string url = $"http://open.douyucdn.cn/api/RoomApi/room/{id}";

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            // Get data response.
            var responseString = "";
            HttpResponseMessage response = await client.GetAsync(string.Empty);  // Blocking call!
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body. Blocking!
                responseString = await response.Content.ReadAsStringAsync();
            }
            else
            {
                responseString = "Failed to get room info";
            }
            return Json(responseString);
        }
    }
}
