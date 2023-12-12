using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SignalRProjectSite.Hubs;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Extensions;





namespace SignalRProjectSite
{
    public class TestHubComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {


            builder.Services.AddSignalR();

            builder.Services.AddSingleton<TestHubRoutes>();



            // next is adding the routes we defined earlier
           // builder.Services.AddUnique<TestHubRoutes>();
            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter("test")
                {
                    Endpoints = app => app.UseEndpoints(endpoints =>
                    {
                        var hubRoutes = app.ApplicationServices.GetRequiredService<TestHubRoutes>();
                        hubRoutes.CreateRoutes(endpoints);
                    })
                });


                //options.AddFilter(new UmbracoPipelineFilter(
                //    "test",
                //    applicationBuilder => { },
                //    applicationBuilder => { },
                //    applicationBuilder =>
                //    {
                //        applicationBuilder.UseEndpoints(e =>
                //        {
                //            var hubRoutes = applicationBuilder.ApplicationServices.GetRequiredService<TestHubRoutes>();
                //            hubRoutes.CreateRoutes(e);
                //        });
                //    }
                //));
            });
        }
    }
}
