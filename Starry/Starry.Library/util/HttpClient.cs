using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Starry.Library.util
{
    public class HttpClientHelper
    {
        static HttpClient client;

        public HttpClientHelper()
        {
            client = new HttpClient();
        }

        public static string GetAsync(string uri)
        {
            var response = client.GetAsync(uri).Result;
            return response.Content.ReadAsStringAsync().Result;
        }


        public static string PostAsync(string api, Dictionary<string, string> parameters)
        {
            var content = new FormUrlEncodedContent(parameters.ToDictionary(k => k.Key, v => string.Format("{0}", v.Value)));
            var response = client.PostAsync(api, content).Result;

            return response.Content.ReadAsStringAsync().Result;
        }

    }
}
