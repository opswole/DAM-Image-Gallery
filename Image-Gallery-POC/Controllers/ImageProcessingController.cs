using System.IO.Compression;
using Image_Gallery_POC.Models;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Image_Gallery_POC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageProcessingController : ControllerBase
    {
        public ImageProcessingController()
        {
            InitialiseLogger();
        }

        private void InitialiseLogger()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.Console()
                .CreateLogger();
        }

        [HttpPost("process-images")]
        public async Task<IActionResult> ProcessImages([FromBody] List<ImageUrlModel> imageUrls)
        {
            Log.Debug("Received request to process images");

            if (imageUrls == null || imageUrls.Count == 0)
            {
                return BadRequest("No image URLs provided.");
            }

            var memoryStream = new MemoryStream();
            using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                foreach (var imageUrl in imageUrls)
                {
                    var filename = $"{imageUrl.Name}.jpg";
                    var entry = archive.CreateEntry(filename);

                    using (var entryStream = entry.Open())
                    using (var httpClient = new HttpClient())
                    using (var imageStream = await httpClient.GetStreamAsync(imageUrl.Url))
                    {
                        await imageStream.CopyToAsync(entryStream);
                    }
                }
            }

            memoryStream.Position = 0;

            Log.Debug("Finished processing images. Returning FileStreamResult.");
            return File(memoryStream, "application/zip", "images.zip");
        }
    }
}