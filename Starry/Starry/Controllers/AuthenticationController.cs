using NetDimension.OpenAuth.Sina;
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

namespace Starry.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        SinaWeiboClient client;

        public AuthenticationController()
        {
            client = GetOpenAuthClient();
        }

        /// <summary>
        /// 封装一个方法来初始化OpenAuth客户端
        /// </summary>
        /// <returns></returns>
        private SinaWeiboClient GetOpenAuthClient()
        {

            string accessToken;
            string uid;
            //if(Session != null)
            //{
            //    accessToken = Session["access_token"] == null ? string.Empty : (string)Session["access_token"];
            //    uid = Session["uid"] == null ? string.Empty : (string)Session["uid"];
            //}
            //else
            //{
                accessToken = string.Empty;
                uid = string.Empty;
            //}


            var settings = ConfigurationManager.AppSettings;
            var client = new SinaWeiboClient(settings["appKey"], settings["appSecret"], settings["callbackUrl"], accessToken, uid);

            return client;
        }

        /// <summary>
        /// 授权认证
        /// </summary>
        /// <param name="code">新浪返回的code</param>
        /// <returns></returns>
        public bool Authorized(string code)
        {
            //if (string.IsNullOrEmpty(code))
            //{
            //    return RedirectToAction("Index");
            //}


            //var client = GetOpenAuthClient();

            client.GetAccessTokenByCode(code);
            

            //if (client.IsAuthorized)
            //{
            //    //用session记录access token
            //    Session["access_token"] = client.AccessToken;
            //    //用cookie记录uid
            //    Session["uid"] = client.UID;
            //}
            return client.IsAuthorized;

        }

        [Route("api/Register/{code}")]
        // GET: api/Authentication/5
        public string GetAccessCode(string code)
        {
            // POST Call
            bool isAuthorized = Authorized(code);
            //var app = new ClientApp(code);
            //bool gotAccess = app.GetAccess();

            var response = client.HttpGet("statuses/friends_timeline.json");
            //var response = client.HttpGet("statuses/mentions.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;

            //return isAuthorized.ToString();
        }
        

        [Route("api/GetPublicTimeline")]
        public string GetPublicTimeline()
        {
            var client = GetOpenAuthClient();

            if (!client.IsAuthorized)
            {
                return "Not authorized";
            }
            // 调用获取当前登录用户及其所关注用户的最新微博api
            // 参考：http://open.weibo.com/wiki/2/statuses/friends_timeline
            var response = client.HttpGet("statuses/friends_timeline.json");
            var result = response.Content.ReadAsStringAsync().Result;
            return result;


        }
    }
}
