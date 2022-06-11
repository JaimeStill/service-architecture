[assembly:System.Runtime.Versioning.SupportedOSPlatform("windows")]
namespace Playground.Web;

using Playground.Core.Extensions;
using Playground.Core.Logging;
using Playground.Core.Upload;
using Playground.Data;
using Playground.Data.Services;
using Playground.Web.Hubs;

using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

public class Startup
{
    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }
    public LogProvider Logger { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;

        Logger = new LogProvider
        {
            LogDirectory = Configuration.GetValue<string>("LogDirectory")
                ?? $@"{Environment.WebRootPath}\logs"
        };
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();

        services
            .AddDbContext<AppDbContext>(options =>
            {
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseSqlServer(Configuration.GetConnectionString("Project"));
            })
            .AddControllers()
            .AddOData(options =>
                options
                    .Count()
                    .Filter()
                    .OrderBy()
                    .Select()
                    .SetMaxTop(100)
            )
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        if (Environment.IsDevelopment())
        {
            services.AddSingleton(new UploadConfig
            {
                DirectoryBasePath = $@"{Environment.ContentRootPath}/wwwroot/files/",
                UrlBasePath = "/files/"
            });
        }
        else
        {
            services.AddSingleton(new UploadConfig
            {
                DirectoryBasePath = Configuration.GetValue<string>("AppDirectoryBasePath"),
                UrlBasePath = Configuration.GetValue<string>("AppUrlBasePath")
            });
        }

        services.AddSignalR();
        services.AddLogging();
        services.RegisterServices();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseStaticFiles();
        app.UseDeveloperExceptionPage();

        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Reactive v1"));

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Logger.LogDirectory),
            RequestPath = "/logs"
        });

        app.UseDirectoryBrowser(new DirectoryBrowserOptions
        {
            FileProvider = new PhysicalFileProvider(Logger.LogDirectory),
            RequestPath = "/logs"
        });

        app.UseExceptionHandler(err => err.HandleError(Logger));

        app.UseRouting();

        app.UseAuthorization();

        app.UseCors(builder =>
        {
            builder.WithOrigins(GetConfigArray("CorsOrigins"))
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .WithExposedHeaders(
                  "Content-Disposition",
                  "Access-Control-Allow-Origin"
                );
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHubs();
        });
    }

    string[] GetConfigArray(string section) => Configuration.GetSection(section)
        .GetChildren()
        .Select(x => x.Value)
        .ToArray();
}