using System;
using System.Linq;
using CloudinaryDotNet;
using System.Configuration;
using Newtonsoft.Json;
using System.IO;
using System.Net;

namespace CloudinaryProject
{
    internal class Program
    {
        public static CloudinaryResponse.Root finalJson { get; set; } = new CloudinaryResponse.Root();
        //debug use only
        public static int pageCount { get; set; }
        static void Main(string[] args)
        {
            Cloudinary api = SetupAPI();
            GetResponse(api);
            DownloadImages(finalJson);
            Console.ReadLine();
        }

        static void GetResponse(Cloudinary api)
        {
            Console.WriteLine("Gathering initial data...");

            try
            {
                var responseString = api.Search()
                    .MaxResults(500)
                    .Execute()
                    .JsonObj
                    .ToString();

                var response = JsonConvert.DeserializeObject<CloudinaryResponse.Root>(responseString);

                // set response to base of finalJson
                finalJson = response;

                pageCount = 1;

                Console.WriteLine("Page: {0}", pageCount);

                if (response.next_cursor != null)
                {
                    Console.WriteLine("Gathering paginated data...");
                    GetResponseWithNextCursor(api, response.next_cursor);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Oops something went wrong: {0}", e.InnerException.Message);
            }
        }

        static void GetResponseWithNextCursor(Cloudinary api, string nextCursor)
        {
            try
            {
                var responseString = api.Search()
                    .MaxResults(500)
                    .NextCursor(nextCursor)
                    .Execute()
                    .JsonObj
                    .ToString();

                var response = JsonConvert.DeserializeObject<CloudinaryResponse.Root>(responseString);

                pageCount++;

                Console.WriteLine("Page: {0}", pageCount);

                foreach (var item in response.resources)
                {
                    finalJson.resources.Add(item);
                }

                if (response.next_cursor != null)
                {
                    GetResponseWithNextCursor(api, response.next_cursor);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Oops something went wrong: {0}", e.InnerException.Message);
            }
        }

        static Cloudinary SetupAPI()
        {
            Account account = new Account(
                ConfigurationManager.AppSettings["cloudinary_acc_name"],
                ConfigurationManager.AppSettings["cloudinary_api_key"],
                ConfigurationManager.AppSettings["cloudinary_api_secret"]);

            Cloudinary cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;

            return cloudinary;
        }

        static void DownloadImages(CloudinaryResponse.Root obj)
        {
            if (obj.resources != null)
            {
                try
                {
                    WebClient client = new WebClient();

                    foreach (var item in obj.resources)
                    {
                        Directory.CreateDirectory(ConfigurationManager.AppSettings["destination_folder"] + item.folder.Replace("/","\\"));
                        string filename = ConfigurationManager.AppSettings["destination_folder"] + item.folder.Replace("/", "\\").Trim() + "\\" + item.filename + "." + item.format;

                        if (!File.Exists(filename))
                        {
                            Console.WriteLine("Downloading {0}", filename);
                            client.DownloadFile(item.url, filename);
                        }
                        else
                        {
                            Console.WriteLine("Exists: {0}", filename);
                        }
                    }

                    client.Dispose();
                    Console.WriteLine("Downloads complete.");
                }
                catch (Exception e)
                {
                    Console.WriteLine("Oops something went wrong: {0}", e.InnerException.Message);
                }
            }
            else
            {
                Console.WriteLine("Oops something went wrong... obj.resources = null");
            }

        }
    }
}
