using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
public enum PublicStatuses: byte
    {
        buzy=1,
        free=2,
        insearch=3,
        waiting=4
    }

  // public class DatesRange
  // {
  //     public List<string> datesArray { get; set; }
  //     public string datesRange { get; set;}
  //
  //     public DatesRange()
  //     {
  //         datesArray = new List<string>();
  //     }
  // }


    public enum TypeMission: byte
    {
        all=0,
        quicklist=1,
        challenge=2,
        regular = 3,
        remind =4
        
        

    }

public static class Types
    {
        public static byte[] array = { quicklist.index, challenge.index, regular.index, remind.index };

       public static class all {
            public const string name = "Все";
            public const string scr = "";
            public const string abr = "all";
            public const byte index = 0;
       }

        public static class quicklist
        {
            public const string name = "Быстрый список";
            public const string scr = "";
            public const string abr = "quicklist";
            public const string menu = "Мои Быстрые списки";
            public const byte index = 1;
        }

        public static class challenge
        {
            public const string name = "Челлендж";
            public const string scr = "";
            public const string abr = "challenge";
            public const string menu = "Мои Челленджи";
            public const byte index = 2;
        }

        public static class regular
        {
            public const string name = "Регулярное";
            public const string scr = "";
            public const string abr = "regular";
            public const string menu = "Мои Регулярные";
            public const byte index = 3;
        }

        public static class remind
        {
            public const string name = "Напоминание";
            public const string scr = "";
            public const string abr = "remind";
            public const string menu = "Мои Напоминания";
            public const byte index = 4;
        }
    }

    public enum Results :byte
    {
        Forgot = 1, //0x0000 0001
        Active = 2, //0x0000 0010
        Done = 4,   //0x0000 0100
        PartialDone = 8, //0x0000 1000
        Cancel = 16   //0x0001 0000


        //   ForgotAndNotDone =0,
        //   Done = 1,
        //   CancelAndNotDone=2,
        //   CancelAndFullDone=3,
        //   CancelAndPartyDone=4,
        //   ForgotAndFullDOne=5,
        //   PartyDone=6,
        //   PartyDoneAndFullDone=7,
        //   DoneEarly=8

    }

    public enum ObserversGroup: byte
    {
        
        OnlyI = 1,
        MiniGroup = 2,
        Group = 3,
        All = 4,
        

    }

public enum TypeOfGroup: byte
    {
        OnlyI = 1,
        MiniGroup = 2,
        Group = 3,
        All = 4,
        
        onlyExecutor=5,
        onlyOwner=6,
        ExecutorAndOwner=7,
        
        GroupExeptExecutor=8,
        GroupExeptOwner=9,
        GroupExeptOwnerAndExecutor=10,
        AllExeptGroup=11,
        AllExeptExecutor = 12,
        AllExeptOwner = 13,
        AllExeptOwnerAndExecutor = 14        
        
    }

    public enum States : byte //Added, Active, Paused, WaitingForCheck, NeedToAlter, Done, Rejected, Deleted
    {
        Added = 0,
        Active = 1,
        Paused = 2,
        WaitingForCheck = 3,
        NeedToAlter = 4,
        Done = 5,
        Rejected = 6,
        Deleted = 7,
        WaitForStartDate = 8

    }
    

    public enum Stages: byte
    {
        HeadSent=0,
        SlaveReceived=1,
        SlaveAccept=2,
        HeadAccept=3,
        SlaveCancel=4,
        HeadCancel=5
    }

    public enum InteractionPatterns : byte
    {
        Command=0, //Одно намерение выполняют несколько человек. Паттерн Комманда
        Trainer = 1, //У каждого пользователя свое намерение. Паттерн Тренировка
        Individual = 2

    }

    

    public enum UserCapabilities : byte
    {
        Admin=0, //0x00000000
        CanRemove = 1,   //0x00000001
        CanEdit = 2,  //0x00000010
        CanObserve = 4,  //0x00000100
        CanReassign = 8,  //0x00001000

    }


    public enum PublicityLevels :byte
    {
        nobody=0,
        onlyFriends=1,
        all = 2

    }


    public enum JoinOptions :byte
    {
        all=1,
        onlyInvite=2,
        onlyAgreement=3
    }


    public enum FriendshipStates : byte
    {
        waiting=0,
        accepted=1,
        rejected=2
    }

}