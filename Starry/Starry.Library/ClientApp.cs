using Starry.Library.util;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
//using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Library
{
    public class ClientApp
    {
        public ClientApp(string code)
        {
            this.ClientID = "2647399538";
            this.ClientSecret = "375f78df8a9132b10822eb0d68db3dec";
            this.RedirectUri = "http://www.dotadrafts.com/";
            this.Code = code;
        }

        public string ClientID { get; private set; }

        public string ClientSecret { get; private set; }

        public string RedirectUri { get; private set; }

        public string Code { get; private set; }

        public string Access_Token { get; private set; }

        public bool GetAccess()
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters["client_id"] = this.ClientID;
            parameters["client_secret"] = this.ClientSecret;
            parameters["grant_type"] = "authorization_code";
            parameters["redirect_uri"] = this.RedirectUri;
            parameters["code"] = this.Code;
            var result = HttpClientHelper.PostAsync("https://api.weibo.com/oauth2/access_token", parameters);
            if (string.IsNullOrEmpty(result))
            {
                return false;
            }
            else
            {
                this.Access_Token = result;
                return true;
            }
        }
    }
}
