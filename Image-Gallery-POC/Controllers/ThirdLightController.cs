using System.Text;
using Image_Gallery_POC.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Image_Gallery_POC.Controllers
{
    public class ThirdLightController : Controller
    {
        private string _sessionId { get; set; }

        [HttpGet("thirdlight/{id}")]
        public async Task<IActionResult> ThirdLightGallery(string id)
        {
            ThirdLightResponseModel model = null;
            try
            {
                model = await GetFilesFromFolderId(id);
            }
            catch
            {
                await ReauthoriseWithKey();
                model = await GetFilesFromFolderId(id);
            }

            return Ok(model);
        }

        public async Task ReauthoriseWithKey()
        {
            using (var httpClient = new HttpClient())
            {
                var requestBody = new { apiKey = "<!-- INSERT KEY HERE -->" };
                var jsonRequest = JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await httpClient.PostAsync(
                    "https://blindsimages.chorus-mk.thirdlight.com/rest/v1/auth/loginWithKey", content);

                string body = await response.Content.ReadAsStringAsync();
                var loginResponse = JsonConvert.DeserializeObject<LoginResponseModel.LoginResponse>(body);
                SetSessionId(loginResponse.sessionId);
            }
        }

        public void SetSessionId(string id)
        {
            _sessionId = id;
        }

        public async Task<ThirdLightResponseModel> GetFilesFromFolderId(string folderId)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("X-Chorus-Session", _sessionId);

                HttpResponseMessage response = await httpClient.GetAsync(
                    $"https://blindsimages.chorus-mk.thirdlight.com/rest/v1/folders/{folderId}/files");

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Failed to get files from folder id");
                }

                string responseData = await response.Content.ReadAsStringAsync();

                var model = JsonConvert.DeserializeObject<ThirdLightResponseModel>(responseData);
                return model;
            }
        }

        public string SetTitle(string id)
        {
            string title = "Default Title";

            switch (id)
            {
                case "<!-- INSERT FOLDER 1 GUID HERE -->":
                    title = "Folder 1";
                    break;
                case "<!-- INSERT FOLDER 2 GUID HERE -->":
                    title = "Folder 2";
                    break;
                case "<!-- INSERT FOLDER 3 GUID HERE -->":
                    title = "Folder 3";
                    break;
                case "<!-- INSERT FOLDER 4 GUID HERE -->":
                    title = "Folder 4";
                    break;
                // EXAMPLE
                //case "abcdefgh-0123-4567-8910-adcdefghijkl":
                //    title = "My Folder";
                //    break;
            }

            return title;
        }
    }
}