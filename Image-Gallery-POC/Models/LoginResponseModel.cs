namespace Image_Gallery_POC.Models;

public class LoginResponseModel
{
    public class LoginResponse
    {
        public string sessionId { get; set; }
        public UserDetails userDetails { get; set; }
    }

    public class UserDetails
    {
        public string avatarUrl { get; set; }
        public string backingFolderId { get; set; }
        public CreatedDate createdDate { get; set; }
        public string description { get; set; }
        public string email { get; set; }
        public bool hideHomeSpaceShortcut { get; set; }
        public string homeSpaceId { get; set; }
        public string id { get; set; }
        public ModifiedDate modifiedDate { get; set; }
        public string name { get; set; }
        public string username { get; set; }
    }

    public class CreatedDate
    {
        public string rfc3339 { get; set; }
        public string timestamp { get; set; }
    }

    public class ModifiedDate
    {
        public string rfc3339 { get; set; }
        public string timestamp { get; set; }
    }

}