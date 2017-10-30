using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;

//using System.Web.Http;

[assembly: OwinStartupAttribute(typeof(OneChance.Startup))]
namespace OneChance
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
          //  var config = new HttpConfiguration();
          //  config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            ConfigureAuth(app);

            
        }
    }
}
