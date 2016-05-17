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

        public void CreateClientFromCode(string code)
        {
            string accessToken = string.Empty;
            string uid = string.Empty;
            client = new SinaWeiboClient(settings["appKey"], settings["appSecret"], settings["callbackUrl"], accessToken, uid);
            client.GetAccessTokenByCode(code);
        }

        public void CreateClientFromAccessToken(string access_token)
        {
            // TODO: this is a hack, need to actually handle param = 2.xxxx
            access_token = "2." + access_token;
            string uid = string.Empty;
            client = new SinaWeiboClient(settings["appKey"], settings["appSecret"], settings["callbackUrl"], access_token, uid);
        }

        [HttpGet]
        [Route("api/Register/{code}")]
        public string Register(string code)
        {
            CreateClientFromCode(code);
            string access_token = client.AccessToken;
            return access_token;
        }


        [Route("api/GetUserId/{access_token}")]
        public string GetUserId(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("account/get_uid.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }


        [Route("api/GetPublicTimeline/{access_token}")]
        public string GetPublicTimeline(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("statuses/friends_timeline.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetUserTimeline/{access_token}")]
        public string GetUserTimeline(string access_token)
        {
            CreateClientFromAccessToken(access_token);
            var response = client.HttpGet("statuses/user_timeline.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetActiveFollowers/{access_token}/{uid}")]
        public string GetActiveFollowers(string access_token, string uid)
        {
            CreateClientFromAccessToken(access_token);

            var response = client.HttpGet("friendships/followers/active.json", new
            {
                uid = uid
            });
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }

        [Route("api/GetFollowers/{access_token}/{uid}")]
        public string GetFollowers(string access_token, string uid)
        {
            CreateClientFromAccessToken(access_token);

            var fullResponse = "";

            var response = client.HttpGet("friendships/followers.json", new
            {
                uid = uid,
                count = 200
            });
            fullResponse += response.Content.ReadAsStringAsync().Result;
            
            return fullResponse;
        }

        [Route("api/GetUserInfo/{access_token}/{uid}")]
        public string GetUserInfo(string access_token, string uid)
        {
            CreateClientFromAccessToken(access_token);
            
            var response = client.HttpGet("users/show.json", new
            {
                uid = uid
            });
            var result = response.Content.ReadAsStringAsync().Result;
            return result;
        }
    }
}
