using System.Web;
using System.Web.Optimization;

namespace OneChance
{
    public class BundleConfig
    {
        //Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
           // bundles.UseCdn = true;   //включаем поддержку CDN

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство сборки на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            
                bundles.Add(new StyleBundle("~/CSS/ProfileCSS").Include(
                        "~/Content/OneChanceCSS/ProfileView.css"
                       ));

            bundles.Add(new StyleBundle("~/CSS/OneChanceCSS").Include(
                        
                        "~/Content/OneChanceCSS/main.css",
                        "~/Content/OneChanceCSS/LeftMenu.css",                      
                        "~/Content/OneChanceCSS/NavBar.css",
                        "~/Content/OneChanceCSS/Tasks.css",
                        "~/Content/OneChanceCSS/Today.css"));


           

            bundles.Add(new ScriptBundle("~/bundles/onechanceJS").Include(
                "~/Scripts/prefixfree.min.js",
                "~/Scripts/jquery-3.1.1.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js",

          "~/Scripts/Js/Model-Constant.js",
          "~/Scripts/Js/ExampleRealData.js",
          "~/Scripts/Js/Javascript.js",
          "~/Scripts/Js/JsTasks.js",
          "~/Scripts/Js/PageController.js",
          "~/Scripts/Js/MissionController.js",
          "~/Scripts/Js/CategoriesController.js",
          "~/Scripts/Js/CategoriesDirective.js",
          "~/Scripts/Js/MissionDirective.js",
          "~/Scripts/Js/PageDirective.js",
          "~/Scripts/Js/JsToday.js",
          "~/Scripts/Js/TodayController.js",
          "~/Scripts/Js/TodayDirective.js",
          "~/Scripts/Js/StatController.js",
          "~/Scripts/Js/ProfileController.js"
          ));

        }
    }
}



