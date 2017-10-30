using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using OneChance.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Globalization;

namespace OneChance.Hubs
{
    
    //$.connection.hub.start().done

   // public class User
   // {
   //     public string ConnectionId { get; set; }
   //     public string Name { get; set; }
   // }

    public class AppHub : Hub
    {
       // static List<ApplicationUser> Users = new List<ApplicationUser>();

        // Отправка сообщений
     //   public void Send(string name, string message)
     //   {
     //       Clients.All.addMessage(name, message);
     //   }

        // Подключение нового пользователя (этот метод вызывается из javascript)
        public void Connect(string userId)
        {
            
            Groups.Add(Context.ConnectionId, userId);

            //  Groups.Add(Context.ConnectionId, userId);

            //.Connect(User.Identity.GetUserId());

            // var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            // var currentUser = manager.FindById(userId);
            // currentUser.ConnectionId = id;

            // if (!Users.Any(x => x.ConnectionId == id))
            // {
            //
            //
            //     
            //
            //     Users.Add(currentUser);
            //
            //     // Посылаем сообщение текущему пользователю
            //     Clients.Caller.onConnected(id, currentUser.Name, Users);
            //
            //     // Посылаем сообщение всем пользователям, кроме текущего
            //     Clients.AllExcept(id).onNewUserConnected(id, currentUser.Name);
            // }
        }

        // Отключение пользователя
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
           // var item = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
          //  if (item != null)
          //  {
          //   //   Users.Remove(item);
          //      var id = Context.ConnectionId;
          //      Clients.All.onUserDisconnected(id, item.Name);
          //  }

            return base.OnDisconnected(stopCalled);
        }
    }
}