using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Extensions;

namespace SignalRProjectSite.Hubs
{
    // Implements IAreaRoutes, responsible for defining routes
    public class UserHubRoutes : IAreaRoutes
    {
        // Dependency injection for runtime state and Umbraco path segment
        private readonly IRuntimeState _runtimeState;
        private readonly string _umbracoPathSegment;

        // Constructor with dependencies
        public UserHubRoutes(
           
            // IOption is used to access globalSettings (Umbraco MVC Area settings)
            IOptions<GlobalSettings> globalSettings,

            //  Provides information about the environment (application name, content root path, and environment name ("Development," "Staging," or "Production"))
            Umbraco.Cms.Core.Hosting.IHostingEnvironment hostingEnvironment,

            // Dynamically adjust behavior, handle events and routing changes based on the current state
            IRuntimeState runtimeState)
        {
            _runtimeState = runtimeState;

            // Gets the Umbraco MVC area path segment from global settings
            _umbracoPathSegment = globalSettings.Value.GetUmbracoMvcArea(hostingEnvironment);
        }

        // Method to create routes using IEndpointRouteBuilder
        public void CreateRoutes(IEndpointRouteBuilder endpoints)
        {
            // Checks for "runtime.Level" in a switch.
            switch (_runtimeState.Level)
            {
                // If the Umbraco runtime level is "Run", it maps the UserHub class to the one found in "GetUserHubRoute"
                case Umbraco.Cms.Core.RuntimeLevel.Run:
                    endpoints.MapHub<UserHub>(GetUserHubRoute());
                    break;
            }
        }

        // Method to get the route for the UserHub
        public string GetUserHubRoute()
        {
            // Umbraco path segment and the name of the UserHub to create route for mapping
            return $"/{_umbracoPathSegment}/{nameof(UserHub)}";
        }
    }
}
