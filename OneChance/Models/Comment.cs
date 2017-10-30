using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
    public class Comment
    {
        [Key, Column(Order = 1)]
        public int TaskId { get; set; }
        [Key, Column(Order = 2)]
        public int MissionId { get; set; }
        [Key, Column(Order = 3)]
        public string UserId { get; set; }
        public string CommentText { get; set; }

    }


    
}


