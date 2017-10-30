using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string AvatarPath { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public int UsersCount { get; set; }

        public string UserCreatorId { get; set; }
        public string SiteUrl { get; set; }
        public string AlbumId { get; set; }

        public JoinOptions JoinOption { get; set; }

        [NotMapped]
        public CommunityGroup MyAffilation { get; set; }

        [NotMapped]
        public bool? IsImCreator { get; set; }
    }

 


    public class CommunityGroup
    {

        [Key, Column(Order = 1)]
        public int GroupId { get; set; }

        [Key, Column(Order = 2)]
        public string UserId { get; set; }

        public UserInGroupStatus Status { get; set; }


        public string UserSenderId { get; set; } //кто отправил приглашение
        [ForeignKey("UserSenderId")]
        public ApplicationUser UserSender { get; set; } //кто отправил приглашение

        

    }
}