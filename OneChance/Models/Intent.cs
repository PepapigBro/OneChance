using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace OneChance.Models
{
    //Директория у пользователя, в которой сохраняются намерения
    public class Folder
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string AvatarPath { get; set; }

    }


    #region Intent: намерение - появляется у пользователя, когда он добавляет себе миссию
    public class Intent
    {
        public int Id { get; set; }      //У одного юзера может быть несколько одинаковых intent, поэтому не делается составной ключ
        
        public int MissionId { get; set; } //Ссылка на оригинальный Intent
       
        public Mission Mission { get; set; } //Ссылка на оригинальный Intent
        public string UserId { get; set; } //UserId
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public int? InteractionId { get; set; }
        public Interaction Interaction { get; set; }
        public States? State { get; set; }   //Added, Active, Paused, WaitingForCheck, NeedToAlter, Done, Rejected, Deleted

        public int? FolderId { get; set; }
        public Folder Folder { get; set; }
        [Column(TypeName = "date")]
        public DateTime? DateStart { get; set; }
        public int? StatOfIntentId { get; set; }
        public StatOfIntent StatOfIntent { get; set; }
        public string MyComment { get; set; }
        public ObserversGroup? VisibleFor { get; set; } //nobody, privategroup, group, all, //

        [NotMapped]
        public int SummaryCount { get; set; }

        public ICollection<TaskOfIntent> TaskOfIntents { get; set; }

       // [NotMapped]
       // public List<StepOfMission> StepOfMissions { get; set; }

        public Intent()
        {
            TaskOfIntents = new List<TaskOfIntent>();
        }
    }

  
    #endregion


    #region TaskOfIntent: задачи конкретного Intent, которые добавляются по мере выполнения Mission
    public abstract class TaskOfIntent
    {
        public int Id { get; set; }
        public int IntentId { get; set; }
        public Intent Intent { get; set; }

        
        public int StepOfMissionId { get; set; }
        [Required]
        public StepOfMission StepOfMission { get; set; }

        // public DateTime DateDeadline { get; set; }
        [Column(TypeName = "date")]
        public DateTime? DateOfDone { get; set; }
        public string PhotoPath { get; set; }
        public int? VotingId { get; set; }
        public string MyComment { get; set; }
        public Results Result { get; set; } //Done, Cancel, Forgot
        public string ExecutorId { get; set; } //UserId

        public int? Count { get; set; }

        internal static TaskOfIntent CreateConcreteType(TypeMission type)
        {
          if (type== TypeMission.quicklist) { return new TaskQuicklist(); }
          if (type == TypeMission.challenge) { return new TaskChallenge(); }
          if (type == TypeMission.regular) { return new TaskRegular(); }
          if (type == TypeMission.remind) { return new TaskRemind(); }
          return null; 
        }

        public TaskOfIntent()
        {
            Result = Results.Active;
            Count = 0;
        }

    
    }
    
   [Table("TaskQuicklist")]
   public class TaskQuicklist: TaskOfIntent
   {   
       
   }

    [Table("TaskChallenge")]
    public class TaskChallenge : TaskOfIntent
    {
      // public int RepeatIndex { get; set; }
       // [NotMapped]
      //  public int SummaryCount { get; set; }

        

    }

    [Table("TaskRegular")]
    public class TaskRegular : TaskOfIntent
    {
    //    public int RepeatIndex { get; set; }
    }

    
    [Table("TaskRemind")]
    public class TaskRemind : TaskOfIntent
    { 
        
    }
    #endregion


    #region EditedStepOfMission: исправления, добавленные в Mission для конкретного Intent
    public abstract class EditedStepOfMission
    {
        public int StepOfMissionId { get; set; }
        public int TaskOfIntentId { get; set; }
        public DateTime EditedDate { get; set; }
        public string UserId { get; set; }
       
    }

    [Table("EditedStepQuicklist")]
    public class EditedStepQuicklist : EditedStepOfMission
    {
        public int Count { get; set; }

    }

    [Table("EditedStepChallenge")]
    public class EditedStepChallenge : EditedStepOfMission
    {
        public int Value { get; set; }
        public string Units { get; set; }
        public int Repeats { get; set; }
    }

    [Table("EditedStepRemind")]
    public class EditedStepRemind : EditedStepOfMission
    {
        public DateTime Date { get; set; }
        public bool IsRepeat { get; set; }

    }

    [Table("EditedStepRegular")]
    public class EditedStepRegular : EditedStepOfMission
    {
        public int MonRepeat { get; set; }
        public int TueRepeat { get; set; }
        public int WedRepeat { get; set; }
        public int ThuRepeat { get; set; }
        public int FriRepeat { get; set; }
        public int SatRepeat { get; set; }
        public int SunRepeat { get; set; }

        public int MonVolume { get; set; }
        public int TueVolume { get; set; }
        public int WedVolume { get; set; }
        public int ThuVolume { get; set; }
        public int FriVolume { get; set; }
        public int SatVolume { get; set; }
        public int SunVolume { get; set; }

    }
    #endregion












}