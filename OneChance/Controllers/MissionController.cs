using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using OneChance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using OneChance.Filters;
using System.Net.Http;

namespace OneChance.Controllers
{
    [Culture]
    public class MissionController : Controller
    {
        
        private ApplicationDbContext db = new ApplicationDbContext();



        public async System.Threading.Tasks.Task<ActionResult> Test(string response2)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var currentUser = manager.FindById(User.Identity.GetUserId());


            // app.UseVkontakteAuthentication(new VkAuthenticationOptions()
            // {
            //     AppId = "5554503",
            //     AppSecret = "wOtSEOhNNy5opvtsspb6",
            //     Scope = "photos, email"//email,notify,photos,friends,status"
            // });
            //
            // https://oauth.vk.com/authorize?client_id=5554503&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52

            using (var client = new HttpClient())
            {
                var uri = new Uri("https://oauth.vk.com/authorize?client_id=1&display=page&redirect_uri=http://localhost:57211/Mission/Test&scope=friends&response_type=token&v=5.63&state=123456");

                var response = await client.GetAsync(uri);

                string textResult = await response.Content.ReadAsStringAsync();
            }


            return null;
        }

        [HttpGet]
        public ActionResult Index(bool? isNewUser)
        {
            ViewBag.isNewUser = isNewUser;

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            // Get the current logged in User and look up the user in ASP.NET Identity
            var currentUser = manager.FindById(User.Identity.GetUserId());
            ViewBag.currentUser = currentUser;

            return View("_OneChanceLayout");
        }
      
        [HttpGet]
        public PartialViewResult Create()
        {
            
            return PartialView();
        }

        [HttpGet]
        public PartialViewResult Search()
        {
            return PartialView("~/Views/Search/Search.cshtml");
        }

        [HttpGet]
        public JsonResult GetEmptyTemplates()
        {
            Mission missionQuicklist = new Mission() { Type = Types.quicklist.index, Name = "", StatOfMission=new StatOfMission(), StepOfMissions = new List<StepOfMission>() { new StepQuicklist() { Category = new Category() { Name = "Все позиции" }, CategoryName="Все позиции" } } };
            Mission missionChallenge = new Mission() { Type = Types.challenge.index, Name = "", StatOfMission = new StatOfMission(), StepOfMissions = new List<StepOfMission>() { new StepChallenge() { Category = new Category() { Name = "1" } } } };

            Mission missionRegular = new Mission() { Type = Types.regular.index, Name = "", StatOfMission = new StatOfMission(),
                StepOfMissions = new List<StepOfMission>() {
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "1" } },
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "2" }},
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "3" }},
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "4" }},
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "5" }},
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "6" }},
                        new StepRegular() { Category = new Category() { Name = "1" }, Name = new StepMissionName() {Text= "7" }}

                } };

            Mission missionRemind = new Mission() { Type = Types.remind.index, Name = "", StatOfMission = new StatOfMission(), StepOfMissions = new List<StepOfMission>()  };
            List<Mission> missionTemlates = new List<Mission>() { missionQuicklist, missionChallenge, missionRegular, missionRemind };


            var json = JsonConvert.SerializeObject(missionTemlates);
            return Json(json, JsonRequestBehavior.AllowGet);
        }



        [Culture]
        [HttpGet] //Этот контроллер вызывается из javascript по Ajax
        public PartialViewResult GetViewForEditMission()
        {
            return PartialView("~/Views/Mission/Edit.cshtml");
        }



        [Culture]
        [HttpGet] //Этот контроллер вызывается из javascript по Ajax
        public JsonResult GetDataForEditMission(int missionId)
        {

            Mission mission = db.Missions.Where(p=>p.Id==missionId).Include(p=>p.StepOfMissions.Select(o=>o.Name)).Include(p => p.StepOfMissions.Select(o => o.Category)).FirstOrDefault();

            // 

           // db.Entry(mission).Collection("StepOfMissions").Load();
            foreach (var stepOfMission in mission.StepOfMissions)
            {
                stepOfMission.Mission = null;
                if (stepOfMission.TaskOfIntent != null) { stepOfMission.TaskOfIntent.StepOfMission = null; stepOfMission.TaskOfIntent.Intent = null; }
            }






            var json = JsonConvert.SerializeObject(mission);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetSearchedMissionsJson(int skipCount, byte type, int? AddedParams)
        {
            
            int takeCount = 10;

            string currentUserId = User.Identity.GetUserId();



            IQueryable<Mission> missionsQuery;

            if (AddedParams != null)
            {
                missionsQuery = db.Missions
                  .Include(p => p.StepOfMissions.Select(q => q.Category))
                  .Include(p => p.StatOfMission)
                  .Include(p => p.User)
                  .Include(p => p.StepOfMissions.Select(q => q.Name))
                  .Where(p => (p.OriginalMissionId == AddedParams || p.Id == AddedParams))
                  //.Where(p => p.Type == type)
                  .Where(p => p.PublishedFor != TypeOfGroup.OnlyI)
                  .OrderByDescending(p => p.Id).Skip(skipCount).Take(takeCount);
            }
            else
            {
                missionsQuery = db.Missions
               .Include(p => p.StepOfMissions.Select(q => q.Category))
               .Include(p => p.StatOfMission)
               .Include(p => p.User)
               .Include(p => p.StepOfMissions.Select(q => q.Name))
               //.Where(p => (p.OriginalMissionId == AddedParams || p.Id == AddedParams))
               //.Where(p => p.Type == type)
               .Where(p => p.PublishedFor != TypeOfGroup.OnlyI)
               .OrderByDescending(p => p.Id).Skip(skipCount).Take(takeCount);
            }

 
            var alreadyAddedMe = db.Intents.Where(p => p.UserId == currentUserId).Join(missionsQuery, e => e.MissionId, o => o.Id, (e, o) => e).ToList();
            var missions = missionsQuery.ToList()
                                 //Обнуляем, чтобы не было цикличного замыкания
                                .Select(c => { c.StepOfMissions.Select(p => { p.Mission = null; return p; }).ToList(); return c; })
                                .ToList()
                                ;
            Mission createdByMe = missions.Where(p => p.UserId == currentUserId).FirstOrDefault();
            if (createdByMe != null) { createdByMe.Intent = new Intent() { UserId = currentUserId, State = null, TaskOfIntents=null }; }

            if (alreadyAddedMe != null)
            {
                foreach (var intent in alreadyAddedMe)
                {
                    foreach (var mission in missions)
                    {
                        if (mission.Id == intent.MissionId) { intent.Mission = null; mission.Intent = intent;  } //null - чтобы избежать зацикливания при сериализации в json
                        
                    }
                }
            }

            

            //Получаем количество модифицрованных миссий для каждой миссии
           // var childMissionCounts = db.Missions.SelectMany(p=>p.whe     Join(missions, o => o.OriginalMissionId, e => e.Id, (o, e) => { e.ModifiedMissionsCount = o.; return e; }).Count();

            var json = JsonConvert.SerializeObject(new ScrollCollection() { missions = missions, takeCount = takeCount });
            return Json(json, JsonRequestBehavior.AllowGet);

         }

        [Culture]
        [HttpGet]
        public JsonResult GetExamples()
        {
            //Получаем из базы количество миссий каждого типа
            //Инициализируем случайное число
            //Делаем выборку
            //преобразуем в json И отправляем клиенту
            //  var s = Types.quicklist.index;

            //Array valuesTypes = Enum.GetValues(typeof(Types));
            Random rand = new Random();
            List<Mission> randMissions = new List<Mission>();
            //Mission[] randMissions = new Mission[0];
            //var type = 4;
             foreach (byte type in Types.array)
             {
            var countElements = db.Missions.Where(p => p.Type == type).Count();
            Mission randomMission;

            if (countElements == 1) { randomMission = db.Missions
                                                        .Include(p => p.StepOfMissions.Select(q => q.Category))
                                                        .Include(p => p.StatOfMission)
                                                        .Include(p => p.User)
                                                        .Include(p=>p.StepOfMissions.Select(q=>q.Name))
                                                        .Where(p => p.Type == type).FirstOrDefault(); }
            else
            {
                var index = rand.Next(0, countElements); //countElements - не включительно
                randomMission = db.Missions
                                .Include(p => p.StepOfMissions.Select(q => q.Category))
                                .Include(p => p.StatOfMission)
                                .Include(p => p.User)
                                .Where(p => p.Type == type)
                                .Include(p => p.StepOfMissions.Select(q => q.Name))
                                .OrderBy(p => p.Id).Skip(index).Take(1).FirstOrDefault();
            }
            randMissions.Add(randomMission);
        }
            //избавляемся от цикличной зависимости
            foreach (var randMission in randMissions) {
                if (randMission != null)
                {
                    foreach (var step in randMission.StepOfMissions)
                    {
                        if (step.Mission != null && step.Mission.StepOfMissions != null)
                        {
                            foreach (var substep in step.Mission.StepOfMissions)
                            {
                                substep.Mission = null;
                            }
                        }
                    }
                }
            }

            var json = JsonConvert.SerializeObject(randMissions);
           
            //JsonRequestBehavior - Задает, разрешены ли HTTP-запросы GET от клиента.
            return Json(json, JsonRequestBehavior.AllowGet);
            
        }

        private Mission CreateOnDb(Mission newMission, StepOfMission[] newSteps, string[] uniqueCategories)
        {
            if (newMission.Id != 0) { //Если эта не новая миссия, а загруженная ранее с сервера

                if (newMission.OriginalMissionId==null) //Если у это оригинальная миссия
                {
                    newMission.OriginalMissionId = newMission.Id;
                }
              
                var originalMission = db.Missions.Find(newMission.OriginalMissionId);

                
                originalMission.ModifiedMissionsCount++;
                db.Entry(originalMission).State = EntityState.Modified;
              

            }
           

            newMission.AvatarPath = null;
            newMission.CountCategory = 0;
            newMission.CountStepOfMission = 0;
            newMission.DateCreate = DateTime.Now;
            newMission.Description=null;
            newMission.Id = 0;
            newMission.Intent = null;
            newMission.PublishedFor = null;
            newMission.StatOfMission = new StatOfMission();
            newMission.StatOfMissionId = null;
            //newMission.StepOfMissions.Count = 0;
            newMission.User = null;

            if (newSteps != null)
            {
                foreach (var step in newSteps)
                {
                    step.AvatarPath = null;
                    step.Category = new Category();
                    step.CategoryId = null;
                    // step.DateStart = null;
                    step.Id = 0;
                    step.Mission = null;
                    step.MissionId = 0;
                    step.StatOfStepOfMissionId = null;
                    step.StatOfStepOfMission = null;
                    step.StepMissionNameId = null;
                    step.TaskOfIntent = null;
                    step.dayLeavedAfterStart = 0;
                    step.repeatsAtPeriod = 0;

                }
            }
           
            string userId = User.Identity.GetUserId();

            //Создаем категории, если каких-то еще нет в базе
            List<Category> listOfCurrentCategory = new List<Category>();
            if (uniqueCategories != null)
            {
                foreach (string name in uniqueCategories)
                {
                    Category category = db.Categories.Where(e => e.Name == name).FirstOrDefault();
                    if (category == null)
                    {
                        category = new Category() { Name = name };
                        db.Categories.Add(category);
                        
                    }
                    listOfCurrentCategory.Add(category);
                }
                db.SaveChanges();
            }

           
           


            //Добавляем шаги и категори
            if (newSteps != null)
            {
                foreach (StepOfMission step in newSteps)
                {
                    
                    step.Category = listOfCurrentCategory.Where(p => p.Name == step.CategoryName).FirstOrDefault();
                    //db.StepMissionNames.Add();
                    // step.Name = new StepMissionName() { Text = step.Name.Text };
                    //db.StepMissionNames.Where(p=>p.)
                    if (step.Name == null || step.Name.Text == null) { step.StepMissionNameId = null; step.Name = null; }

                    newMission.StepOfMissions.Add(step);
                   
                }
            }



            newMission.CountCategory = listOfCurrentCategory.Count();
            newMission.CountStepOfMission = newSteps.Count();
            

            newMission.UserId = User.Identity.GetUserId();
            newMission.PublishedFor = TypeOfGroup.OnlyI;
            if ((newMission.Units == null)||(newMission.Units == "")|| (newMission.Units == " ")) { newMission.Units = "Количество"; }

            
            db.Missions.Add(newMission);
            db.SaveChanges();

            if (newMission.OriginalMissionId == null) {
                newMission.OriginalMissionId = newMission.Id;
                db.Entry(newMission).State = EntityState.Modified;
                db.SaveChanges();

            }

            //избавляемся от цикличной зависимости
            foreach (var step in newMission.StepOfMissions)
            {
                if (step.Mission!=null && step.Mission.StepOfMissions != null) { 
                foreach (var substep in step.Mission.StepOfMissions)
                {
                    substep.Mission = null;
                }
                }
            }
            
            return newMission;
            
        }


        [HttpPost]
        public JsonResult CreateMissionQuicklist([Bind(Exclude = "StepOfMissions")] Mission newMission, StepQuicklist[] newSteps,  string[] uniqueCategories)
        {
           Mission mission = CreateOnDb(newMission, newSteps, uniqueCategories);
            var json = JsonConvert.SerializeObject(mission,

              Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.Objects });
            return Json(json, JsonRequestBehavior.AllowGet);
        }



        
        [HttpPost]
        public JsonResult CreateMissionChallenge([Bind(Exclude = "StepOfMissions")] Mission newMission,
                                                   StepChallenge[] newSteps,
                                                   string[] uniqueCategories)
        {
            Mission mission = CreateOnDb(newMission, newSteps, uniqueCategories);
            var json = JsonConvert.SerializeObject(mission);
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateMissionRegular([Bind(Exclude = "StepOfMissions")] Mission newMission,
                                                 StepRegular[] newSteps,
                                                 string[] uniqueCategories)
        {
            Mission mission = CreateOnDb(newMission, newSteps, uniqueCategories);
            var json = JsonConvert.SerializeObject(mission);
            return Json(json, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult CreateMissionRemind([Bind(Exclude = "StepOfMissions")] Mission newMission,
                                                StepRemind[] newSteps,
                                                string[] uniqueCategories)
        {
            Mission mission = CreateOnDb(newMission, newSteps, uniqueCategories);
            var json = JsonConvert.SerializeObject(mission);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        //[HttpPost]
        //public ActionResult CreateMissionQuicklist([Bind(Include = "Name, Description, AvatarPath, Type")] Mission newMission,
        //                                           [Bind(Exclude = "Id, MissionId, CategoryId, StepOfMissionStatId")] StepQuicklist[] newSteps,
        //                                           string[] uniqueCategories)
        //{
        //    CreateOnDb(newMission, newSteps, uniqueCategories);
        //    return View();
        //}


    }
}