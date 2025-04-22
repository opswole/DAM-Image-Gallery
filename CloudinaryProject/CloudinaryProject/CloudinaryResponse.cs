using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudinaryProject
{
    internal class CloudinaryResponse
    {
        public class CreatedBy
        {
            [JsonProperty("access_key")]
            public string access_key { get; set; }

            [JsonProperty("custom_id")]
            public string custom_id { get; set; }

            [JsonProperty("external_id")]
            public string external_id { get; set; }
        }

        public class Resource
        {
            [JsonProperty("asset_id")]
            public string asset_id { get; set; }

            [JsonProperty("public_id")]
            public string public_id { get; set; }

            [JsonProperty("folder")]
            public string folder { get; set; }

            [JsonProperty("filename")]
            public string filename { get; set; }

            [JsonProperty("format")]
            public string format { get; set; }

            [JsonProperty("version")]
            public int version { get; set; }

            [JsonProperty("resource_type")]
            public string resource_type { get; set; }

            [JsonProperty("type")]
            public string type { get; set; }

            [JsonProperty("created_at")]
            public DateTime created_at { get; set; }

            [JsonProperty("uploaded_at")]
            public DateTime uploaded_at { get; set; }

            [JsonProperty("bytes")]
            public int bytes { get; set; }

            [JsonProperty("backup_bytes")]
            public int backup_bytes { get; set; }

            [JsonProperty("width")]
            public int width { get; set; }

            [JsonProperty("height")]
            public int height { get; set; }

            [JsonProperty("aspect_ratio")]
            public double aspect_ratio { get; set; }

            [JsonProperty("pixels")]
            public int pixels { get; set; }

            [JsonProperty("url")]
            public string url { get; set; }

            [JsonProperty("secure_url")]
            public string secure_url { get; set; }

            [JsonProperty("status")]
            public string status { get; set; }

            [JsonProperty("access_mode")]
            public string access_mode { get; set; }

            [JsonProperty("access_control")]
            public object access_control { get; set; }

            [JsonProperty("created_by")]
            public CreatedBy created_by { get; set; }

            [JsonProperty("uploaded_by")]
            public UploadedBy uploaded_by { get; set; }

            [JsonProperty("etag")]
            public string etag { get; set; }
        }

        public class Root
        {
            [JsonProperty("total_count")]
            public int total_count { get; set; }

            [JsonProperty("time")]
            public int time { get; set; }

            [JsonProperty("next_cursor")]
            public string next_cursor { get; set; }

            [JsonProperty("resources")]
            public List<Resource> resources { get; set; }
        }

        public class UploadedBy
        {
            [JsonProperty("access_key")]
            public string access_key { get; set; }

            [JsonProperty("custom_id")]
            public string custom_id { get; set; }

            [JsonProperty("external_id")]
            public string external_id { get; set; }
        }


    }
}
