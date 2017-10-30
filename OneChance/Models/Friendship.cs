using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
    public class Friendship
    {
        [Key, Column(Order = 1)]
        public string SenderId { get; set; }

        [Key, Column(Order = 2)]
        public string ReceiverId { get; set; }


        [ForeignKey("SenderId")]
        public virtual ApplicationUser UserSender { get; set; }

        [ForeignKey("ReceiverId")]
        public virtual ApplicationUser UserReceiver { get; set; }


        public FriendshipStatus Status { get; set; }

        [NotMapped]
        public bool isImSender { get; set; }

        //    public DateTime? FriendshipStart { get; set; } //дата начала дружбы

    }
}