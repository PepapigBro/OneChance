using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OneChance.Models
{

    

    public class Mission
    {
        private Mission o;
        private Intent e;


        public string Units { get; set; }

       // [ForeignKey("OriginalMissionId")]
       // public Mission OriginalMission { get; set; }
        public int? OriginalMissionId { get; set; }       
        public int ModifiedMissionsCount { get; set; }

        public int CountCategory { get; set; }
        public int CountStepOfMission { get; set; } //Общее количесвто steps

        [NotMapped]
        public int CountOnRangeDate { get; set; }
        [NotMapped]
        public int ValueOnRangeDate { get; set; }
        [NotMapped]
        public int RangeDatesCount { get; set; }

        public int Id { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
   
        public string Name { get; set; }
        public string Description { get; set; }
        public string AvatarPath { get; set; }
     
        public byte Type {get; set; } //1, 2 ,3 ,4
        public TypeOfGroup? PublishedFor { get; set; } //nobody, privategroup, group, all, //

        [Column(TypeName ="date")]
        public DateTime? DateCreate { get; set; }

        public int? StatOfMissionId { get; set; }
        public StatOfMission StatOfMission { get; set; }

        public ICollection<StepOfMission> StepOfMissions { get; set; }

        // [NotMapped]
        // public bool WhetherI { get; set; }
        // [NotMapped]
        // public States State { get; set; }   //Added, Active, Paused, WaitingForCheck, NeedToAlter, Done, Rejected, Deleted
        //[NotMapped]
        [NotMapped]
        public Intent Intent { get; set; }

        public Mission()
        {
            //this.Intent.Mission = null;
            StepOfMissions = new List<StepOfMission>();
        }

        public Mission(Mission o, Intent e)
        {
            this.o = o;
            this.e = e;
            this.Intent = e;
        }

        //     public Mission(Mission o, Intent e)
        //     {
        //         this.Intent = e;
        //
        //         Id = o.Id;
        //         UserId = o.UserId;
        //         User = o.User;
        //         Name = o.Name;
        //         Description = o.Description;
        //         AvatarPath = o.AvatarPath;
        //         this.Type = o.Type;
        //         PublishedFor = o.PublishedFor;
        //         DateCreate = o.DateCreate;
        //         StatOfMissionId = o.StatOfMissionId;
        //         this.StatOfMission = o.StatOfMission;
        //         StepOfMissions = o.StepOfMissions;
        //
        // }
    }

    public class Category
    {
        
        public int Id { get; set; }
        public string Name { get; set; }

        public Category(string name)
        {
            this.Name = name;
        }

        public Category() { }
      //  public virtual ICollection<StepOfMission> StepOfMissions { get; set; }
      //  public Category() {
      //      StepOfMissions = new List<StepOfMission>();
      //  }
    }

    public class StepMissionName
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

    public class StepOfMission
    {
        public int Id { get; set; }

        [NotMapped]
        public int dayLeavedAfterStart = 0;

        [NotMapped]
        public byte Type { get; set; } //1, 2 ,3 ,4

        public int MissionId { get; set; }
        public Mission Mission { get; set; }

        [NotMapped]
        public int repeatsAtPeriod { get; set; }

        public int? CategoryId { get; set; }
        
        public Category Category { get; set; }

        //internal abstract IEnumerable<TaskOfIntent> CreateTaskOfIntents(ApplicationDbContext db, Intent intent);
        //Этот метод переопределяется в классах наследниках

        [NotMapped]
        public string CategoryName { get; set; }



      //  internal static List<StepOfMission> Combine(List<StepOfMission> ttt) //На вход подается коллекция разнородных StepOfMissions
      //  {
      //    
      //      List<IGrouping<int, StepRegular>> regularGroups = ttt.Where(p => (TypeMission)p.Mission.Type == TypeMission.regular).Select(p => (StepRegular)p  ).GroupBy(p => p.MissionId).ToList();
      //
      //      List<StepOfMission> savedItems = new List<StepOfMission>();
      //      foreach (var steps in regularGroups) // проходимся по каждой группе stepOfMissions
      //      {
      //          var firstelement = steps.First();
      //          firstelement.repeatsAtPeriod = steps.Count();
      //          savedItems.Add(firstelement);
      //          
      //          foreach( var item in steps)
      //          {
      //              ttt.Remove(item);
      //          }
      //
      //      }
      //
      //      ttt.AddRange(savedItems);
      //      
      //
      //      return ttt;
      //  }

        //internal virtual List<StepOfMission> CombineSteps(List<StepOfMission> ttt) { return ttt; }

        public int? StepMissionNameId { get; set; }
        [ForeignKey("StepMissionNameId")]        
        public StepMissionName Name { get; set; }
        
        public int? Count { get; set; }

        


        public StepOfMission()
        {
          
        }

        public string AvatarPath { get; set; }
        public int? StatOfStepOfMissionId { get; set; }
        public StatOfStepOfMission StatOfStepOfMission { get; set; }

       
        public TaskOfIntent TaskOfIntent { get; set; }

        

        internal int ShouldDone(List<DateTime> selectedDates, DateTime? dateStart, Mission mission)
        {
            var repeats = repeatsCount(selectedDates, dateStart, mission);
            // var repeatsCount = 0;
            // foreach (DateTime date in selectedDates) //Пробегаем по каждой выбранной дате
            // {
            //     repeatsCount= repeatsCount+ isShouldDone(date, dateStart, mission);
            // }
            //
            // return repeatsCount;
            return repeats;
        }

        internal virtual int repeatsCount(List<DateTime> selectedDates, DateTime? dateStart, Mission mission) { return 0; }

        internal virtual int isShouldDone(DateTime selectedDate, DateTime? dateStart, Mission mission) { return 0; }
    }


   [Table("StepQuicklist")]
    public class StepQuicklist : StepOfMission
    {
        internal override int repeatsCount(List<DateTime> selectedDates, DateTime? dateStart, Mission mission) {
            var repeatsCount = 0;
            foreach (DateTime date in selectedDates) //Пробегаем по каждой выбранной дате
            {
                repeatsCount= repeatsCount+ isShouldDone(date, dateStart, mission);
            }
           if (repeatsCount>0) { return 1; } else { return 0; }
            
        }

        internal override int isShouldDone(DateTime dateToday, DateTime? dateStart, Mission mission)
        {
            dayLeavedAfterStart = Convert.ToInt32(Math.Ceiling((DateTime.Now.Date - ((DateTime)mission.Intent.DateStart).Date).TotalDays));
            var dateIsLaterDateStart = Convert.ToInt32(Math.Ceiling((((DateTime)dateToday).Date - ((DateTime)mission.Intent.DateStart).Date).TotalDays));
            if ((dateIsLaterDateStart >= 0)&&(this.Count>0)) { return 1; }
            else { return 0; }
        }
    }

    [Table("StepChallenge")]
    public class StepChallenge : StepOfMission
    {
        public int DayIndex { get; set; }

        //public int Repeats { get; set; }
        internal override int repeatsCount(List<DateTime> selectedDates, DateTime? dateStart, Mission mission)
        {
            var repeatsCount = 0;
            foreach (DateTime date in selectedDates) //Пробегаем по каждой выбранной дате
            {
                repeatsCount = repeatsCount + isShouldDone(date, dateStart, mission);
            }

            return repeatsCount;
        }
        internal override int isShouldDone(DateTime dateToday, DateTime? dateStartUser, Mission mission)
        {
            //this.Category.Name = 5 - день 5
            //dateStartUser = 10.01.2017
            //dateToday = 17.01
            int dayIndex = Convert.ToInt32(this.Category.Name);
            DateTime dateStart = (DateTime)dateStartUser;
            DateTime neededDate = (dateStart).AddDays(dayIndex-1);

            if ((
                (neededDate.Date == dateToday.Date )
                ||
                ((dateStart).Date == dateToday.Date && dayIndex==1)
                )&&(this.Count>0))
                
            { return 1; }
            else { return 0; }

            
        }
    }



    [Table("StepRemind")]
    public class StepRemind : StepOfMission
    {
        [Column(TypeName = "date")]
        public DateTime? DateStart { get; set; }

        public int? Repeats { get; set; } //0  - Означает без повторений. null - бесконечные повторения в заданный день месяца
                                          //p.ShouldDone(dates, p.Mission.Intent.DateStart, p.Mission)

        internal override int repeatsCount(List<DateTime> selectedDates, DateTime? dateStart, Mission mission)
        {
            var repeatsCount = 0;
            foreach (DateTime date in selectedDates) //Пробегаем по каждой выбранной дате
            {
                repeatsCount = repeatsCount + isShouldDone(date, dateStart, mission);
            }

            return repeatsCount;
        }

        internal override int isShouldDone(DateTime dateToday, DateTime? dateStartUser, Mission mission)
        {
            //this.DateStart = 25.02.207
            //dateStartUser = 10.01.2017
            //dateToday = 25.10.2017
            dayLeavedAfterStart = Convert.ToInt32(Math.Ceiling((DateTime.Now.Date - ((DateTime)mission.Intent.DateStart).Date).TotalDays));

            if (
                (((DateTime)this.DateStart).Date == dateToday.Date) //Если даты совпадают
             || (   
                    ((DateTime)this.DateStart).Day == dateToday.Day//Если совпадают дни месяца
                 && (dateToday.Date > ((DateTime)this.DateStart).Date) //Если текущая дата больше даты stepOfMission
                 && (this.Repeats==null) && (this.Count>0)
                 )


                ) { return 1;  }//если дата подходит, возвращаем единицу
            else { return 0; }
 
        }
    }

    [Table("StepRegular")]
    public class StepRegular : StepOfMission
    {
        [NotMapped]
        public int weekIndex { get; set; }
       
        //public string Units { get; set; }
        bool IsRepeats { get; set; }

        internal override int repeatsCount(List<DateTime> selectedDates, DateTime? dateStart, Mission mission)
        {
            var repeatsCount = 0;
            foreach (DateTime date in selectedDates) //Пробегаем по каждой выбранной дате
            {
                repeatsCount = repeatsCount + isShouldDone(date, dateStart, mission);
            }

            return repeatsCount;
        }

        internal override int isShouldDone(DateTime dateToday, DateTime? dateStartUser, Mission mission)
        {
            //this.Category.Name = 5; 5я неделя
            //this.Name = 4; 4й день
            //То есть 20й день

            //dateStartUser = 10.01.2017
            //dateToday = 25.10.2017
            var datesDiff = ((DateTime)dateToday - (DateTime)dateStartUser).TotalDays;
            var indexUserDay = datesDiff < 1 ? 1 : Math.Ceiling(datesDiff); //Например 15 день со дня начала

            var dayStart = Convert.ToInt32(((DateTime)dateStartUser).DayOfWeek); //день недели начала миссии от 0 до 6, 0 - воскресенье
            var normdayStart = dayStart == 0 ? 6 : dayStart-1; //преобразованный  сдвиг дня недели начала миссии от  до 6

            var weeksCount = mission.CountCategory ; //Узнаем общее количесвто повторяющихся недель, например 3

            var currentWeekIndex = Math.Ceiling((indexUserDay+ normdayStart)/7); //получаем текущую неделю по счету от начала выполнения, например 10я
            this.weekIndex = Convert.ToInt32(currentWeekIndex);
            // 10я неделя, всего 3 цикла
            //то есть 10/3=3 - 3*3=9 = 1
            var normWeek =  currentWeekIndex - Math.Floor(currentWeekIndex / weeksCount) * weeksCount;
            if (normWeek == 0) { normWeek = weeksCount; }
            var currDayOfWeek = Convert.ToInt32(dateToday.DayOfWeek); //текущий день недели от 0 до 6
            var currentDayOfWeek = currDayOfWeek == 0? 7: currDayOfWeek;// день недели от 1 до 7
           
                
            if (normWeek == Convert.ToInt32(this.Category.Name) && currentDayOfWeek== Convert.ToInt32(this.Name.Text)
                &&  (dateToday.Date >= ((DateTime)dateStartUser).Date) && (this.Count>0)
                ) { return 1; }
            else { return 0; }

        }
    }


}