namespace Image_Gallery_POC.Routes;

public static class ThirdLightRouter
{
    public static void ConfigureRoutes(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapControllerRoute(
            name: "thirdlight",
            pattern: "thirdlight/{controller}/{action}",
            defaults: new { controller = "ThirdLight", action = "Index" } 
        );
    }
}