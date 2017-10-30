using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AndroidServerSide.Startup))]
namespace AndroidServerSide
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
