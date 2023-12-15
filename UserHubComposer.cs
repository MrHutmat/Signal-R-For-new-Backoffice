using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SignalRProjectSite.Hubs;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Extensions;





namespace SignalRProjectSite
{
    public class UserHubComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {


            builder.Services.AddSignalR();

            builder.Services.AddSingleton<UserHubRoutes>();



            // next is adding the routes we defined earlier
            // builder.Services.AddUnique<UserHubRoutes>();
            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter("User")
                {
                    Endpoints = app => app.UseEndpoints(endpoints =>
                    {
                        var hubRoutes = app.ApplicationServices.GetRequiredService<UserHubRoutes>();
                        hubRoutes.CreateRoutes(endpoints);
                    })
                });
            });
        }
    }
}
