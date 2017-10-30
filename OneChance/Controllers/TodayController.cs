using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using OneChance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Net;
using System.Web.Script.Serialization;
using System.IO;

namespace OneChance.Controllers
{
    public class TodayController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Today
        public ActionResult GetTodayView()
        {
            return PartialView("~/Views/Today/Today.cshtml");
        }

        public ActionResult getSomeDaysView()
        {
            return PartialView("~/Views/Today/SomeDays.cshtml");
        }



        //Получаем список предстоящих сегодня шагов Миссий, а также создаем для них TaskOfIntents
        [HttpGet]
        public JsonResult GetMineStepOfMissions(int skipCount, byte type, List<string> AddedParams) //AddedParams - стрококвый массив из выбранных дат
        {
            int takeCount = 10;
            string currentUserId = User.Identity.GetUserId();

            //Преобразуем строковые даты в даты
            List<DateTime> dates = new List<DateTime>();
            foreach (string dateISO in AddedParams)
            {
                dates.Add(DateTime.Parse(dateISO, null, System.Globalization.DateTimeStyles.RoundtripKind));
            }


            //Берем все мои интенты
            var intentsQuery = db.Intents.Where(p => p.UserId == currentUserId && p.State == States.Active);

            var mineStepOfMissions = (((db.Missions.Join(intentsQuery, o => o.Id, e => e.MissionId, (o, e) => o))) //Все Миссии которые у меня добавлены
                                      .SelectMany(p => p.StepOfMissions) //Все SteOfMissions которые у меня добавлены и запущены
                                      .Include(p => p.Mission)
                                      .Include(p => p.Category)
                                      .Include(p => p.Name)
                                      .ToList()); //получили список моих миссий
            //Добавили в свойство Intent текущий Intent, убрали циклическую зависимость у StepOfMission
            var steps = mineStepOfMissions
                        .Join(intentsQuery, o => o.Mission.Id, e => e.MissionId,
                            (o, e) => {
                                o.Mission.Intent = e;
                                o.Mission.Intent.Mission = null;
                                o.Mission.StepOfMissions = null; return o;
                            }).ToList();


            //Выбрали те, что подходят под выбранные даты
            var ttt = steps.Where(p => p.StepMissionNameId != null)
                .Select(p => { p.repeatsAtPeriod = p.ShouldDone(dates, p.Mission.Intent.DateStart, p.Mission); return p; })
                .Select(p => { p.Mission.Intent.TaskOfIntents = null; return p; })
                .Where(p => p.repeatsAtPeriod > 0).ToList(); //Получили все миссии на текущие даты

           // StepOfMission.Combine(ttt); //Этот метод переопределен в каждом типе StepOfMission
                                        //В случае Regular or Remind  удаляет из коллекции все повторяющиеся элементы, объединяя их в одно

            //Вырали все TaskOfIntents, которые закреплены за текущими StepOfMissions
            var existingTaskOfIntents = ttt.Join(db.TaskOfIntents, o => o.Id, e => e.StepOfMissionId, (o, e) => e).ToList();


            //Подсоединяем каждому stepOfMission TaskOfIntent - существующий или новый
            foreach (var stepOfMission in ttt)
            {
                stepOfMission.Mission.Intent.TaskOfIntents = null;
                foreach (var taskOfIntent in existingTaskOfIntents)
                {
                    if (stepOfMission.Id == taskOfIntent.StepOfMissionId)
                    {
                        taskOfIntent.StepOfMission = null;
                        stepOfMission.TaskOfIntent = taskOfIntent;
                    }
                }
                if (stepOfMission.TaskOfIntent == null) { stepOfMission.TaskOfIntent = TaskOfIntent.CreateConcreteType((TypeMission)stepOfMission.Mission.Type); }
            }

            var eee = ttt.Where(p => (Convert.ToByte(p.TaskOfIntent.Result) & type) > 0)
                  .OrderBy(p => p.MissionId).ThenBy(p => p.Id)
                 .Skip(skipCount).Take(takeCount).ToList(); //Получили все миссии на текущие даты


            var json = JsonConvert.SerializeObject(new ScrollCollection() { stepOfMissions = eee, takeCount = takeCount }
              //,  Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.Objects }

              );
            return Json(json, JsonRequestBehavior.AllowGet);

        }



        //Получаем список предстоящих сегодня шагов Миссий, а также создаем для них TaskOfIntents
        [HttpGet]
        public JsonResult GetMineStepOfMissionsGroups(int skipCount, byte type,  List<string> AddedParams) //AddedParams - стрококвый массив из выбранных дат
        {
            int takeCount = 10;
            string currentUserId = User.Identity.GetUserId();

           //Преобразуем строковые даты в даты
           List<DateTime> dates = new List<DateTime>();
           foreach (string dateISO in AddedParams)
           {               
               dates.Add(DateTime.Parse(dateISO, null, System.Globalization.DateTimeStyles.RoundtripKind));           
           }
           
            //Берем все мои интенты
            var intentsQuery = db.Intents.Where(p => p.UserId == currentUserId && p.State == States.Active);

            var mineStepOfMissions = (((db.Missions.Join(intentsQuery, o => o.Id, e => e.MissionId, (o, e) => o))) //Все Миссии которые у меня добавлены
                                      .SelectMany(p => p.StepOfMissions) //Все SteOfMissions которые у меня добавлены и запущены
                                      .Include(p => p.Mission)
                                      .Include(p => p.Category)
                                      .Include(p => p.Name)
                                      .ToList()); //получили список моих миссий


            //Добавили в свойство Intent текущий Intent, убрали циклическую зависимость у StepOfMission
            var steps = mineStepOfMissions
                        .Join(intentsQuery, o => o.Mission.Id, e => e.MissionId,
                            (o, e) => {
                                o.Mission.Intent = e;
                                o.Mission.Intent.Mission = null;
                                o.Mission.StepOfMissions = null; return o;
                            }).ToList();


            //Выбрали те, что подходят под выбранные даты
            var ttt = steps.Where(p => p.StepMissionNameId != null)
                .Select(p => { p.repeatsAtPeriod = p.ShouldDone(dates, p.Mission.Intent.DateStart, p.Mission); return p; })
                .Select(p => { p.Mission.Intent.TaskOfIntents = null; return p; })
                .Where(p => p.repeatsAtPeriod > 0).ToList(); //Получили все StepOfMission на текущие даты


  
            //Вырали все TaskOfIntents, которые закреплены за текущими StepOfMissions
            var existingTaskOfIntents = ttt.Join(db.TaskOfIntents, o => o.Id, e => e.StepOfMissionId, (o, e) => e).ToList();


          //Подсоединяем каждому stepOfMission TaskOfIntent - существующий или новый
            foreach (var stepOfMission in ttt)
            {
                stepOfMission.Mission.Intent.TaskOfIntents = null;
                foreach (var taskOfIntent in existingTaskOfIntents)
                {
                    if (stepOfMission.Id == taskOfIntent.StepOfMissionId)
                    {
                        taskOfIntent.StepOfMission = null;
                        stepOfMission.TaskOfIntent = taskOfIntent;
                    }
                }
                if (stepOfMission.TaskOfIntent == null) { stepOfMission.TaskOfIntent = TaskOfIntent.CreateConcreteType((TypeMission)stepOfMission.Mission.Type); }
            }

            //группируем все полученные подходящие StepOfMissions по миссиям
            List<IGrouping<int, StepOfMission>> StepOfMissionsGroups = ttt.GroupBy(p => p.MissionId).ToList();



            //List<IGrouping<int, StepRemind>> remindGroups = ttt.Where(p => p.Mission.Type == (byte)TypeMission.remind).Select(p => p as StepRemind).GroupBy(p => p.MissionId).ToList(); 

            List<Mission> missions = new List<Mission>();
            foreach (var stepOfMissions in StepOfMissionsGroups) // проходимся по каждой группе stepOfMissions
            {
                Mission mission = stepOfMissions.First().Mission;
                mission.StepOfMissions = new List<StepOfMission>();
                foreach (var stepOfmission in stepOfMissions)
                {
                    
                    stepOfmission.Mission = null;
                    stepOfmission.Type = mission.Type;
                    for (var i = 0; i < stepOfmission.repeatsAtPeriod; i++)
                    {
                        mission.StepOfMissions.Add(stepOfmission);
                        mission.CountOnRangeDate++;
                        if (stepOfmission.Count!=null) { mission.ValueOnRangeDate += (int)stepOfmission.Count; }
                    }
                   
                }

                mission.RangeDatesCount = dates.Count();
                missions.Add(mission);
            }


            var eee = missions
                 .OrderBy(p => p.Id)
                .Skip(skipCount).Take(takeCount).ToList(); //Получили все миссии на текущие даты


            var json = JsonConvert.SerializeObject(new ScrollCollection() { missions = eee, takeCount = takeCount }
              //,  Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.Objects }

              );
            return Json(json, JsonRequestBehavior.AllowGet);

        }

        

        private TaskOfIntent CreateTaskOfMissionOnDb([Bind(Include = "StepOfMissionId")]TaskOfIntent newTaskOfIntent, Intent intent)
        {
            string currentUserId = User.Identity.GetUserId();
            if (currentUserId != intent.UserId) { return null; } // Если интент не принадлежит пользователю
            var existingTask = db.TaskOfIntents.Where(p => p.IntentId == intent.Id).FirstOrDefault();
            if (existingTask != null) { return existingTask; }

            newTaskOfIntent.IntentId = intent.Id;
            newTaskOfIntent.DateOfDone = DateTime.Now;
            newTaskOfIntent.ExecutorId = null;
            //newTaskOfIntent.Result = result;
            newTaskOfIntent.StepOfMissionId = newTaskOfIntent.StepOfMissionId;
            newTaskOfIntent.VotingId = null;
            newTaskOfIntent.PhotoPath = null;
            newTaskOfIntent.MyComment = null;
            //newTaskOfIntent.Count = count;

            db.TaskOfIntents.Add(newTaskOfIntent);
            db.SaveChanges();


            return newTaskOfIntent;
        }

    }
}