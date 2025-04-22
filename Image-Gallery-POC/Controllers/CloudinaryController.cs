using System.Net;
using CloudinaryDotNet;
using dotenv.net;
using Image_Gallery_POC.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Image_Gallery_POC.Controllers;

public class CloudinaryController : Controller
{
    public Cloudinary ConfigureApi()
    {
        DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
        Cloudinary cloudinaryaccount = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
        cloudinaryaccount.Api.Secure = true;

        return cloudinaryaccount;
    }
    
    [HttpGet("cloudinary/{id}")]
    public async Task<IActionResult> CloudinaryGallery(string id)
    {
        CloudinaryResponseModel.Root model = null;

        var decodedid = WebUtility.UrlDecode(id);
        model = await GetFilesUsingFolderPrefix(decodedid);
        
        return Ok(model);
        
    }
    
    public async Task<CloudinaryResponseModel.Root> GetFilesUsingFolderPrefix(string directory)
    {
        var cloudinary = ConfigureApi();
        var searchResult = cloudinary.Search()
            .Expression($"folder:{directory}")
            .MaxResults(500)
            .Execute()
            .JsonObj
            .ToString();
        
        var model = JsonConvert.DeserializeObject<CloudinaryResponseModel.Root>(searchResult);
            
        foreach(var item in model.resources)
        {
            item.url = BuildUrl(cloudinary, item.public_id, item.format);
            // item.thumbnail_url = BuildThumbnailUrl(cloudinary, item.public_id, item.format);
        }

        return model;
    }
    
    public string BuildUrl(Cloudinary cloudinary, string publicId, string format)
    {
        return cloudinary.Api.UrlImgUp.BuildUrl(publicId + "." + format);
    }

    /*public string BuildThumbnailUrl(Cloudinary cloudinary, string publicId, string format)
    {
        return cloudinary.Api.UrlImgUp
            .Transform(new Transformation()
                .Height(200)
                .Width(200)
                .Crop("limit"))
            .BuildUrl(publicId + "." + format);
    }
    */


    public string SetTitle(string id)
    {
        // You can replace this with your own logic to set the title based on the id
        string title = "Default Title";

        switch (id)
        {
            case "<!-- INSERT FOLDER PATH 1 HERE -->":
                title = "Folder 1";
                break;
            case "<!-- INSERT FOLDER PATH 2 HERE -->":
                title = "Folder 2";
                break;
            case "<!-- INSERT FOLDER PATH 3 HERE -->":
                title = "Folder 3";
                break;
            case "<!-- INSERT FOLDER PATH 4 HERE -->":
                title = "Folder 4";
                break;
            
            //EXAMPLE
            //case "MyWebsite/Products/Shoes":
            //    title = "Shoes";
            //    break;
        }

        return title;
    }
    
    
}