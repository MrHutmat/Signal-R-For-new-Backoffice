using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SignalRProjectSite.Hubs;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Extensions;

namespace SignalRProjectSite
{
    // Implements IComposer to compose services for Umbraco
    public class UserHubComposer : IComposer
    {
        // Method for configuring services
        public void Compose(IUmbracoBuilder builder)
        {
            // Add SignalR to the services
            builder.Services.AddSignalR();

            // Add a singleton instance (one instance shared across the application) of the UserHubRoutes class to the services
            builder.Services.AddSingleton<UserHubRoute>();

            // Configure Umbraco pipeline options, specifically adding a filter for the "User" pipeline
            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter("User")
                {
                    // Define endpoints for the "User" pipeline
                    Endpoints = app => app.UseEndpoints(endpoints =>
                    {
                        // Retrieve the UserHubRoute service
                        var hubRoutes = app.ApplicationServices.GetRequiredService<UserHubRoute>();

                        // Call the CreateRoutes method to add routes for the UserHub
                        hubRoutes.CreateRoutes(endpoints);
                    })
                });
            });
        }
    }
}
