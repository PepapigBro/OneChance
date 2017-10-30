using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OneChance.Models
{

    public class FriendShip
    {
        [Key, Column(Order = 1)]
        public string SenderId { get; set; } //userId
        [Key, Column(Order = 2)]
        public string RecieverId { get; set; } //userId
        [Column(TypeName = "date")]
        public DateTime? FriendshipStart { get; set; } //дата начала дружбы
        public FriendshipStates FriendshipState { get; set; } //waiting, accepted, rejected
    }

 
    public class Correspondence
    {
        public string SenderId { get; set; }//Отправитель
        public string Message { get; set; } //Сообщение
        public string DestinationId { get; set; } //Получатель
        [Column(TypeName = "datetime2")]        
        public DateTime? DateSend { get; set; } //дата отправки
        public bool IsRead { get; set; } //прочитано ли
    }

    public class ItemOfWall //запись на стене
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string ImagePath { get; set; }
        public int MessageStatId { get; set; }
    }

    public class StatOfMessage
    {
        public int Id { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public int Share { get; set; }
    }
    public class StatOfMission
    {
        public int Id { get; set; }
        public int AddStat { get; set; }
        public int MakeStat { get; set; }
        public int ChangeStat { get; set; }
        public int DeleteStat { get; set; }
    }
    public class StatOfStepOfMission
    {
        public int Id { get; set; }
        public int Done { get; set; }
        public int Cancel { get; set; }
        public int Delete { get; set; }
        public int Change { get; set; }
    }
    public class StatOfIntent
    {
        public int Id { get; set; }
        public int Observe { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
    }


    

    public class WallOfGroup
    {

    }


    public class WallOfUser
    {

    }


    public class Voting
    {
        public int Id { get; set; }
        public int VotesFor { get; set; }
        public int VotesAgainst { get; set; }
        [Column(TypeName = "datetime2")] 
        public DateTime? VoteStart { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime? VoteDeadline { get; set; }
        public int MinVotes { get; set; }
    }

    public class Interaction
    {
        public int Id { get; set; }
        public int HeadIntentId { get; set; }
        public InteractionPatterns InteractionPattern { get; set; } //Command, Trainer, Individual
        public Stages Stage { get; set; } //Received, Send, Agree, Disagree....
        public int GroupId { get; set; }
        public TypeOfGroup WhoCanDispose { get; set; }// nobody, onlyExecutor,onlyPartner, ExecutorAndParnter, Group, All
        public TypeOfGroup WhoCanEdit { get; set; } //
        public TypeOfGroup IsVisibleFor { get; set; } //
        public TypeOfGroup Reviewers { get; set; } //
        public bool isPossibleReassign { get; set; } //Возможно ли перепоручить
    }
    public class Group 
    {
        public int Id { get; set; }
        public string Creator { get; set; } //UserId
        public int NumberOfUsers { get; set; } //Обновляется по событию
        public JoinOptions JoinOption { get; set; }

        public string Name { get; set; }
        public string AvatarPath { get; set; }
        public string Description { get; set; }
        public string SiteUrl { get; set; }
        public string AlbumId { get; set; }
    }

    public class GroupPartners //Партнеры группы
    {
        [Key, Column(Order = 1)]
        public int GroupId { get; set; }

        [Key, Column(Order = 2)]
        public int PartnerId { get; set; }
    }





    public class UsersList 
    {
        public int Id { get; set; }
        public string CreatorId { get; set; }//UserId
    }

    public class User2
    {
        
    }


    public class ScrollCollection
    {
        public List<Intent> intents;
        public List<Mission> missions;
        public List<TaskOfIntent> taskOfintents;
        public List<StepOfMission> stepOfMissions;
        public int takeCount;
        public int SkipCount;
        
    }

    
    public class UserAtGroup
    {
        [Key, Column(Order = 1)]
        public int GroupId { get; set; }
        [Key, Column(Order = 2)]
        public string UserId { get; set; }
        // public int UserCapability { get; set; } //Представляет из себя сумму из возможностей //Admin= 0x00000000  CanRemove = 0x00000001  CanEdit = 0x00000010  CanObserve = 0x00000100  CanReassign = 0x00001000
    }
}