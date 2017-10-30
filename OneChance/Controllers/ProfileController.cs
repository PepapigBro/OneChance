using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using OneChance.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace OneChance.Controllers
{
    public class ProfileController : Controller
    {

   

        private ApplicationDbContext db = new ApplicationDbContext();
        private UserManager<ApplicationUser> manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));


        // GET: Profile
        [HttpGet]
        public JsonResult GetProfileCreateView()
        {
            
            var currentUser = manager.FindById(User.Identity.GetUserId());
            ViewBag.User = currentUser;
            var response = new
            {
                User = currentUser, //Здень нужно убрать лишние личные данные пользователя, т.к сейчас передается все его данные
                View = PartialView("~/Views/Profile/Create.cshtml").RenderToString()
            };

            var json = JsonConvert.SerializeObject(response);
            return Json(json, JsonRequestBehavior.AllowGet);

        }

        

        [HttpGet]
        public JsonResult GetProfileView()
        {
            var currentUser = manager.FindById(User.Identity.GetUserId());
            ViewBag.User = currentUser;
            var response = new
            {
                User = currentUser, //Здень нужно убрать лишние личные данные пользователя, т.к сейчас передается все его данные
                View = PartialView("~/Views/Profile/Index.cshtml").RenderToString()
            };
            var json = JsonConvert.SerializeObject(response);
            return Json(json, JsonRequestBehavior.AllowGet);
          
        }

        
       [HttpPost]//Получаем в параметрах текущий Intent (или его Id)
        public JsonResult UploadImageAvatar()
        {
           // string UserId = Request.Params["UserId"];
            HttpPostedFileBase image = Request.Files["file"];

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var currentUser = manager.FindById(User.Identity.GetUserId());

            string path = "";


            if (image != null)
            {
                // получаем имя файла
                //string fileName = System.IO.Path.GetFileName(image.FileName);
                string extention = Path.GetExtension(image.FileName);
                // сохраняем файл в папку Files в проекте
                //--Имя fileName представляет из себя IntentID, оно уникально
                path = "../UploadsPicture/" + currentUser.Email +"/avatar"+ extention;
                image.SaveAs(Server.MapPath("~/UploadsPicture/" + currentUser.Email + "/avatar" + extention));

                currentUser.AvatarPath = path;
                manager.Update(currentUser);

                
            }

            //Обновляем представление (div  скартинкой)
            return Json(path);
        }

        [HttpPost]
    public JsonResult SaveChanges([Bind(Include = "Name, Surname, isFemale, AvatarPath, Country, Sity, PhoneNumber, Language, Age")]ApplicationUser user)
        {
            // UserManager here is an instance of UserManager<ApplicationUser>
            //****Так получаем юзера целиком****
                 //UserManager<ApplicationUser> usermanager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
                 //ApplicationUser currentUser = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(System.Web.HttpContext.Current.User.Identity.GetUserId());
            //****Так получаем юзера целиком****


           //**так тоже можно получить свойства***//
           // string currentUserId = User.Identity.GetUserId();
           // var currentUser = db.Users.Find(currentUserId);

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
           
            // Get the current logged in User and look up the user in ASP.NET Identity
            var currentUser = manager.FindById(User.Identity.GetUserId());

            // var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            // var result = await UserManager.CreateAsync(user, model.Password)

            // if x = null, set y to -1.
            //int y = x ?? -1;

            // currentUser.Surname = user.Surname != null ? currentUser.Surname = user.Surname : currentUser.Surname = "dd";


            currentUser.Surname = user.Surname;
            currentUser.Sity = user.Sity;
            currentUser.Country = user.Country;
            currentUser.Age = user.Age;
            currentUser.IsFemale = user.IsFemale;
            currentUser.Language = user.Language;
           // currentUser.AvatarPath = user.AvatarPath;
            currentUser.Name = user.Name;
            currentUser.PhoneNumber = user.PhoneNumber;
            manager.Update(currentUser);

            var json = JsonConvert.SerializeObject(user);
            return Json(json, JsonRequestBehavior.AllowGet);
            //return PartialView("~/Views/Mission/Create.cshtml");
           // return null;//PartialView("~/Views/Search/Search.cshtml");

        }
    }
}