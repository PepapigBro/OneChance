﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
    public class ApiVk
    {

        private void AuthorizationForm_Load()
        {
            GetToken.DocumentCompleted += GetToken_DocumentCompleted;
            GetToken.Navigate("https://oauth.vk.com/authorize?client_id=5709976&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52");
        }

    }
   

     

        private void GetToken_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            if (GetToken.Url.ToString().IndexOf("access_token=") != 0)
            {
                GetUserToken();
            }
        }

        private void GetUserToken()
        {
            char[] Symbols = { '=', '&' };
            string[] URL = GetToken.Url.ToString().Split(Symbols);
            File.WriteAllText("UserInf.txt", URL[1] + "\n");
            File.AppendAllText("UserInf.txt", URL[5]);
            this.Visible = false;
        }
    }
}



