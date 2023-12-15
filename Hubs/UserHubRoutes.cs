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
    public class UserHubRoutes : IAreaRoutes
    {
        private readonly IRuntimeState _runtimeState;
        private readonly string _umbracoPathSegment;

        public UserHubRoutes(
            IOptions<GlobalSettings> globalSettings,

            //Something about IHostingEnvironment soon no god.

            Umbraco.Cms.Core.Hosting.IHostingEnvironment hostingEnvironment,
            IRuntimeState runtimeState)
        {
            _runtimeState = runtimeState;
            _umbracoPathSegment = globalSettings.Value.GetUmbracoMvcArea(hostingEnvironment);
        }

        public void CreateRoutes(IEndpointRouteBuilder endpoints)
        {
            switch (_runtimeState.Level)
            {
                case Umbraco.Cms.Core.RuntimeLevel.Run:
                    endpoints.MapHub<UserHub>(GetUserHubRoute());
                    break;
            }

        }

        public string GetUserHubRoute()
        {
            return $"/{_umbracoPathSegment}/{nameof(UserHub)}";
        }
    }
}
