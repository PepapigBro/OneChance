using AndroidServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AndroidServerSide.Controllers
{
    public class UserProfileController : ApiController
    {
        // GET: api/UserProfile
        public IEnumerable<UserProfile> Get()
        {
            List<UserProfile> list;
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                list = db.UserProfiles.ToList();

            }
            return list;
        }

        // GET: api/UserProfile/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserProfile
        public bool Post([FromBody]UserProfile userprofile)
        {
            
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                db.UserProfiles.Add(userprofile);
                db.SaveChanges();

            }
            return true;
        }

        // PUT: api/UserProfile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserProfile/5
        public void Delete(int id)
        {
        }
    }
}
