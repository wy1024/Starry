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
using System.Web.Routing;
using System.Web.Http.Cors;
using Starry.Library.WeiboUtil;
using System.Collections.Specialized;

namespace Starry.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        SinaWeiboClient client;
        NameValueCollection settings;

        public AuthenticationController()
        {
            settings = ConfigurationManager.AppSettings;
        }

        private void CreateClientFromCode(string code)
        {
            string accessToken = string.Empty;
            string uid = string.Empty;
            client = new SinaWeiboClient(settings["appKey"], settings["appSecret"], settings["callbackUrl"], accessToken, uid);
            client.GetAccessTokenByCode(code);
        }

        private void CreateClientFromAccessToken(string access_token)
        {
            string uid = string.Empty;
            client = new SinaWeiboClient(settings["appKey"], settings["appSecret"], settings["callbackUrl"], access_token, uid);
        }

        [Route("api/Register/{code}")]
        // GET: api/Authentication/5
        public string Register(string code)
        {
            // POST Call
            CreateClientFromCode(code);
            string access_token = client.AccessToken;
            return access_token;
        }
        

        [Route("api/GetPublicTimeline/{access_token}")]
        public string GetPublicTimeline(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("statuses/friends_timeline.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetActiveFollowers/{access_token}")]
        public string GetActiveFollowers(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("friendships/followers/active.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetBilateralFriends/{access_token}")]
        public string GetBilateralFriends(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("users/show.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetUserInfo/{access_token}")]
        public string GetUserInfo(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("users/show.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }
    }
}
