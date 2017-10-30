using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using OneChance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Runtime.Serialization.Json;
using Microsoft.AspNet.Identity.EntityFramework;
using OneChance.Filters;

namespace OneChance.Controllers
{
    public class IntentController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        [Culture]
        [HttpGet] //Этот контроллер вызывается из javascript по Ajax
        public PartialViewResult Mine(TypeMission type)
        {
             return PartialView();
        }


        [Culture]
        [HttpGet] //Этот контроллер вызывается из javascript по Ajax
        public PartialViewResult GetViewForOneIntent()
        {
            return PartialView("~/Views/Intent/Review.cshtml");
        }

       


        [Culture]
        [HttpGet] //Этот контроллер вызывается из javascript по Ajax
        public JsonResult GetDataForOneIntent(int missionId, [Bind(Include = "UserId, Id")]Intent intent)
        {

            Mission mission = db.Missions
                .Where(p => p.Id == missionId)
                .Include(p => p.StepOfMissions.Select(q => q.Category))
                .Include(p => p.StepOfMissions.Select(q => q.Name))
                .Include(p => p.StepOfMissions.Select(q => q.TaskOfIntent))
                .FirstOrDefault();

           // 
           
          //  db.Entry(mission).Collection("StepOfMissions").Load();
            foreach (var stepOfMission in mission.StepOfMissions)
            {
                stepOfMission.Mission = null;
                if (stepOfMission.TaskOfIntent != null) { stepOfMission.TaskOfIntent.StepOfMission = null; stepOfMission.TaskOfIntent.Intent = null; }
            }



           


            var json = JsonConvert.SerializeObject(mission);
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        


        [HttpPost]  
        public JsonResult CreateTask([Bind(Include = "UserId, Id")]Intent intent, StepOfMission stepOfMission, int value, Results result)
        {
            if (result == Results.Cancel) { value = 0; }

           string currentUserId = User.Identity.GetUserId();
           if (currentUserId!= intent.UserId) { return Json("false"); } // Если интент не принадлежит пользователю
            TaskOfIntent newTask = TaskOfIntent.CreateConcreteType((TypeMission)stepOfMission.Type);

            TaskOfIntent existingTask = db.TaskOfIntents.Where(p => p.StepOfMissionId == stepOfMission.Id && p.IntentId==intent.Id).FirstOrDefault();
           if (existingTask != null)
           {
               existingTask.Result = result;
               existingTask.Count = existingTask.Count + value;
                existingTask.DateOfDone = DateTime.Now;
                existingTask.StepOfMission = db.StepOfMissions.Find(stepOfMission.Id);
                if (existingTask.Count >= stepOfMission.Count) { existingTask.Result = Results.Done; }
                db.Entry(existingTask).State = EntityState.Modified;
               db.SaveChanges();
                newTask = existingTask;
                newTask.StepOfMission=null;
                

            }
           else
            {
                
                newTask.Result = result;
                newTask.Count = value;
                newTask.IntentId = intent.Id;
                newTask.DateOfDone = DateTime.Now;
                newTask.ExecutorId = intent.UserId;
                newTask.StepOfMissionId = stepOfMission.Id;
                newTask.StepOfMission = db.StepOfMissions.Find(stepOfMission.Id);
                if (newTask.Count >= stepOfMission.Count) { newTask.Result = Results.Done; }
                db.TaskOfIntents.Add(newTask);
                db.SaveChanges();
               
            }

            newTask.StepOfMission = null;

            var json = JsonConvert.SerializeObject(newTask);
            return Json(json, JsonRequestBehavior.AllowGet);

        }


        //[HttpPost]
        //public JsonResult ChallengeTaskIsComplete([Bind(Include = "UserId, Id")]Intent editedIntent, int stepOfMissionId, int value, Results result)
        //{

        //    string currentUserId = User.Identity.GetUserId();
        //    if (currentUserId != editedIntent.UserId) { return Json("false"); } // Если интент не принадлежит пользователю

        //    TaskChallenge existingTask = db.TaskChallenges.Where(p => p.StepOfMissionId == stepOfMissionId && p.IntentId == editedIntent.Id).FirstOrDefault();
        //    if (existingTask != null)
        //    {
        //        existingTask.Result = result;
        //        existingTask.Value = value;
        //        db.Entry(existingTask).State = EntityState.Modified;
        //        db.SaveChanges();

        //    }


        //    var json = JsonConvert.SerializeObject(true);
        //    return Json(json, JsonRequestBehavior.AllowGet);

        //}




        [Culture]
        [HttpGet]
        public JsonResult GetMineIntentsJson(TypeMission type, int skipCount)
        {
            int takeCount = 10;
            string currentUserId = User.Identity.GetUserId();
            List<Intent> mineIntents;
            var s = db.Intents.Where(p=>p.Id==0);

            if (type == TypeMission.all) {
                mineIntents = db.Intents
                                    .Include(p => p.Mission)
                                    .Include(p => p.Mission.StatOfMission)

                                    .Include(p => p.Folder)
                                    
                                    .Include(p => p.Mission.StepOfMissions.Select(q => q.Name))
                                    .Include(p => p.Mission.StepOfMissions.Select(q => q.Category))
                                     .Include(p => p.Mission.StepOfMissions.Select(q => q.TaskOfIntent))
                                    .Include(p => p.StatOfIntent)
                                    .Include(p => p.Interaction)
                                  //.Include(p => p.TaskOfIntents.Select(e=>e.StepOfMission.Name))
                                  //.Include(p => p.TaskOfIntents.Select(e => e.StepOfMission.Category))
                                    //.Where(p => (type != TypeMission.all && (TypeMission)p.Mission.Type == type) || ())
                                    .Where(p => p.UserId == currentUserId)
                                    .OrderByDescending(p => p.Id)
                                    .Skip(skipCount).Take(takeCount).ToList()
                                     //Обнуляем, чтобы не было цикличного замыкания
                                     .Select(c => { c.Mission.StepOfMissions .Select(p =>
                                 {
                                     p.Mission = null;
                                     if (p.TaskOfIntent != null) { p.TaskOfIntent.StepOfMission = null; p.TaskOfIntent.Intent = null; }
                                     return p;
                                 }).ToList(); return c;
                                     })
                                     .Select(c => { c.Mission.Intent = null; c.TaskOfIntents = null; return c; })
                                    .OrderByDescending(p => p.Id)
                                     .ToList();
            }
            else
            {
                mineIntents = db.Intents
                                    .Include(p => p.Mission)
                                    .Include(p => p.Mission.StatOfMission)

                                    .Include(p => p.Folder)
                                    .Include(p => p.Mission.StepOfMissions.Select(q => q.Name))
                                    .Include(p => p.Mission.StepOfMissions.Select(q => q.Category))
                                    .Include(p => p.Mission.StepOfMissions.Select(q => q.TaskOfIntent))

                                    .Include(p => p.StatOfIntent)
                                    .Include(p => p.Interaction)
                                    
                                    //.Include(p => p.TaskOfIntents.Select(e => e.StepOfMission.Name))
                                    //.Include(p => p.TaskOfIntents.Select(e => e.StepOfMission.Category))
                                    
                                    .Where(p => (TypeMission)p.Mission.Type == type)
                                    .Where(p => p.UserId == currentUserId)
                                    .OrderByDescending(p => p.Id)
                                    .Skip(skipCount).Take(takeCount).ToList()
                                     //Обнуляем, чтобы не было цикличного замыкания
                                     .Select(c => { c.Mission.StepOfMissions
                                            .Select(p => 
                                                    { p.Mission = null;
                                                        if (p.TaskOfIntent != null) { p.TaskOfIntent.StepOfMission = null; p.TaskOfIntent.Intent = null; }
                                                        return p; }).ToList(); return c; })
                                     .Select(c => { c.Mission.Intent = null; c.TaskOfIntents = null; return c; })
                                    .OrderByDescending(p => p.Id)
                                     .ToList();
                                     
            }

           // foreach (var intent in mineIntents)
           // {
           //     intent.TaskOfIntents = null;
           //
           //     foreach( var stepOfMission in intent.Mission.StepOfMissions)
           //     {
           //         if (stepOfMission.TaskOfIntent!=null) { stepOfMission.TaskOfIntent.StepOfMission = null; stepOfMission.TaskOfIntent.Intent = null; }
           //     }
           // }

            var json = JsonConvert.SerializeObject(new ScrollCollection() {intents = mineIntents, takeCount = takeCount }
           // , Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.Objects }
            );


            


            return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeState([Bind(Include = "Id, UserId, State, MissionId")] Intent intent)
        {
            
            using (db)
            {


                string currentUserId = User.Identity.GetUserId();
                if (intent.UserId != currentUserId || intent == null) { return Json("Ошибка!"); }

                Intent modifiedIntent = db.Intents.Find(intent.Id);
                if (modifiedIntent.UserId != currentUserId) { return Json("Ошибка!"); }

                var currentMission = db.Missions.Where(p=>p.Id==intent.MissionId)
                                    .Include(p=>p.StatOfMission)
                                    .Include(p=>p.StepOfMissions.Select(q=>q.Category))
                                    .Include(p => p.StepOfMissions.Select(q => q.Name))                                    
                                    .FirstOrDefault();
                //db.Entry(currentMission).Reference(p => p.StatOfMission).Load();
                //db.Entry(currentMission).Collection(p => p.StepOfMissions).Load();


                if (modifiedIntent.State!=States.Deleted && intent.State == States.Deleted)
                {
                    //Увеличиваем стату у миссии
                    currentMission.StatOfMission.AddStat--;

                }

                if (modifiedIntent.State == States.Deleted && intent.State == States.Added)
                {
                    //Увеличиваем стату у миссии
                    currentMission.StatOfMission.AddStat++;

                }

                if ((modifiedIntent.State == States.Added || modifiedIntent.State == States.Paused) && intent.State==States.Active )
                {
                    //Увеличиваем стату у миссии
                    currentMission.StatOfMission.MakeStat++;
                    if (modifiedIntent.DateStart == null) { modifiedIntent.DateStart = DateTime.Now; }//Устанавливаем дату только при первом начале. Если пользователь хочет начать с нуля, пускай жмет "Обнулить полностью"
                    
                }

                if( (modifiedIntent.State == States.Active || modifiedIntent.State == States.Done || modifiedIntent.State == States.NeedToAlter|| modifiedIntent.State == States.WaitingForCheck)
                    && (intent.State == States.Deleted || intent.State==States.Paused || intent.State==States.Rejected || intent.State == States.Added))
                {
                    //Уменьшаем стату у миссии
                    currentMission.StatOfMission.MakeStat--;
                    
                }
                modifiedIntent.State = intent.State;
                
                db.Entry(currentMission).State = EntityState.Modified;
                modifiedIntent.Mission = currentMission;

                db.Entry(modifiedIntent).State = EntityState.Modified;
                db.SaveChanges();
                //intent.Mission.Intent = null;
                modifiedIntent.Mission = currentMission;
               // modifiedIntent.Mission.StepOfMissions = null;
               foreach (var step in modifiedIntent.Mission.StepOfMissions)
                {
                    step.Mission = null;
                }
                modifiedIntent.Mission.Intent = null;
                var json = JsonConvert.SerializeObject(modifiedIntent);
                return Json(json, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult ChangeVisibleFor([Bind(Include = "Id, UserId, VisibleFor")] Intent intent)
        {
            string currentUserId = User.Identity.GetUserId();
            if (intent.UserId != currentUserId || intent == null) { return Json("Ошибка!"); }

            Intent modifiedIntent = db.Intents.Find(intent.Id);
            if (modifiedIntent.UserId != currentUserId) { return Json("Ошибка!"); }

            modifiedIntent.VisibleFor = intent.VisibleFor;
            var currentMission = db.Missions.Include(p=>p.StatOfMission).Where(p=>p.Id==modifiedIntent.MissionId).FirstOrDefault();
            if (currentUserId == currentMission.UserId && currentMission.StatOfMission.AddStat<=1) //Если кроме меня миссию никто не добавил, то она тоже скрывается
            {
                currentMission.PublishedFor = (TypeOfGroup)intent.VisibleFor;
            }

            
            db.Entry(modifiedIntent).State = EntityState.Modified;
            db.SaveChanges();

            var json = JsonConvert.SerializeObject(intent.VisibleFor);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        private Intent CreateOnDb(Intent intent, Mission mission)
        {
            Intent newIntent = new Intent();

            string currentUserId = User.Identity.GetUserId();
            newIntent.UserId = currentUserId;
            newIntent.VisibleFor = ObserversGroup.OnlyI;
            newIntent.MissionId = mission.Id;
            newIntent.Mission = mission;
            
            newIntent.State = States.Added;
            db.Intents.Add(newIntent);
            db.SaveChanges();
            return newIntent;
        }
        

        [HttpPost]
        public JsonResult CreateIntent([Bind(Include = "MissionId")] Intent intent)
        {
            string currentUserId = User.Identity.GetUserId();
            Intent newIntent = null;
           
            var alreadyExisting = db.Intents.Where(p => p.UserId == currentUserId && p.MissionId == intent.MissionId).SingleOrDefault();

            //Увеличиваем стату у миссии
            var currentMission = db.Missions.Find(intent.MissionId);
            db.Entry(currentMission).Reference(p => p.StatOfMission).Load();
            db.Entry(currentMission).Reference(p => p.User).Load();
            currentMission.StatOfMission.AddStat++;            
            db.Entry(currentMission).State = EntityState.Modified;
           
            if (alreadyExisting == null) { newIntent = CreateOnDb(intent, currentMission);  } else
            {
                newIntent = alreadyExisting;
                if (newIntent.State != States.Deleted) { currentMission.StatOfMission.AddStat--; }
                newIntent.State = States.Added;
                db.Entry(newIntent).State = EntityState.Modified;
                db.SaveChanges();

            }
            currentMission.Intent = newIntent;
            currentMission.Intent.Mission = null;

            var json = JsonConvert.SerializeObject(currentMission);
                return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        
        public JsonResult RemoveIntent([Bind(Include = "Id")]Mission mission, bool isRemoveForever)
        {
            string currentUserId = User.Identity.GetUserId();
            //Находим его у пользователя со всеми связанными сущностями
            var deletedIntent = db.Intents.Include(p => p.Folder)
                                          .Include(p => p.Interaction)
                                          .Include(p => p.StatOfIntent)
                                          .Include(p => p.TaskOfIntents)
                                          .Where(p => p.MissionId == mission.Id && p.UserId==currentUserId)
                                          .FirstOrDefault();

           

            if (deletedIntent!=null) {

                //Уменьшаем стату у миссии
                var currentMission = db.Missions.Find(mission.Id);
                db.Entry(currentMission).Reference(p => p.StatOfMission).Load();
                db.Entry(currentMission).Reference(p => p.User).Load();
                //Уменьшаем стату у миссии
                if (deletedIntent.State==States.Active || deletedIntent.State == States.NeedToAlter || deletedIntent.State == States.WaitingForCheck || deletedIntent.State == States.NeedToAlter) { currentMission.StatOfMission.MakeStat--; }
                db.Entry(currentMission).State = EntityState.Modified;

                if (isRemoveForever) { db.Intents.Remove(deletedIntent);  //

                    if (currentMission.UserId == currentUserId) { deletedIntent.State = null;  }
                    else { deletedIntent = null; }
                    //Проверяем есть ли подписчики
                    if (currentMission.StatOfMission.AddStat == 0) {
                        db.Entry(currentMission).Collection(p => p.StepOfMissions).Load();
                        db.StepOfMissions.RemoveRange(currentMission.StepOfMissions);

                        
                        //Уменьшаем параметр - количество дочерних модифицированных миссия
                            var originalMission = db.Missions.Find(currentMission.Id);
                            originalMission.ModifiedMissionsCount--;
                            db.Entry(originalMission).State = EntityState.Modified;
                            

                        

                        db.Missions.Remove(currentMission);
                    } //Настроить каскадное удаление
                    
                    //Если нет, то удаляем и миссию тоже

                }
                else {
                    currentMission.StatOfMission.AddStat--;
                    deletedIntent.State = States.Deleted;
                    db.Entry(deletedIntent).State = EntityState.Modified;
                    
                }

                
                db.SaveChanges();
                //Intent intent = CreateOnDb(newIntent);
                currentMission.Intent = deletedIntent;
                if (deletedIntent != null) { currentMission.Intent.Mission = null; }
                var json = JsonConvert.SerializeObject(currentMission);
                return Json(json, JsonRequestBehavior.AllowGet);
            }
            return null;

            
        }



    }
}