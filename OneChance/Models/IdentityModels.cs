using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace OneChance.Models
{
    // Чтобы добавить данные профиля для пользователя, можно добавить дополнительные свойства в класс ApplicationUser. Дополнительные сведения см. по адресу: http://go.microsoft.com/fwlink/?LinkID=317594.
    public class ApplicationUser : IdentityUser
    {
        public int? Age { get; set; }
        public bool IsFemale{ get; set; }
        [Column(TypeName ="datetime2")]
        public DateTime LastVisit { get; set; }
        public string AvatarPath { get; set; }
        public int FriendCount { get; set; } //Подписаться на событие изменения числа друзей
        public PublicStatuses PublicStatus { get; set; } //занят, ищу, ожидаю, в поиске и пр
        public bool IsOnline { get; set; }
        public PublicityLevels Publicity { get; set; } //nobody,  onlyFriends, all
        public PublicityLevels Correspondence { get; set; } //nobody,  onlyFriends, all
        public PublicityLevels FriendShip { get; set; }//nobody,  onlyFriends, all
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Language { get; set; }

        public string Country { get; set; }
        public string Sity { get; set; }
        public string Description { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Обратите внимание, что authenticationType должен совпадать с типом, определенным в CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Здесь добавьте утверждения пользователя
            return userIdentity;
        }
    }


    public class ApplicationDBInitializer : DropCreateDatabaseIfModelChanges<ApplicationDbContext>
    {

        protected override void Seed(ApplicationDbContext context)
        {

           
            ////Создаем главную директорию у нового пользователя
            //var mainfolder = Folder.CreateMainFolder(context, Userid);

            ////Создаем Папку в главной директории для пользователя
            //var folder = Folder.CreateFolder(context, Userid, "Переехать в Рай", mainfolder.Id);
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("MissionDbConnection", throwIfV1Schema: false)
        {
        }
       // public virtual IDbSet<ApplicationUser> Users { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public DbSet<Intent> Intents { get; set; }
        public DbSet<Interaction> Interactions { get; set; }
        public DbSet<StatOfMission> MissionStats { get; set; }
        public DbSet<StatOfStepOfMission> StepOfMissionStats { get; set; }


        public DbSet<Group> Groups { get; set; }
        public DbSet<UserAtGroup> UserAtGroups { get; set; }
        public DbSet<TaskOfIntent> TaskOfIntents { get; set; }
        public DbSet<TaskQuicklist> TaskQuicklists { get; set; }
        public DbSet<TaskChallenge> TaskChallenges { get; set; }
        public DbSet<TaskRemind> TaskReminds { get; set; }
        public DbSet<TaskRegular> TaskRegulars { get; set; }

        public DbSet<Mission> Missions { get; set; }
        public DbSet<StepOfMission> StepOfMissions { get; set; }
       // public DbSet<StepQuicklist> StepQuicklists { get; set; }
        public DbSet<StepChallenge> StepChallengies { get; set; }
        public DbSet<StepRemind> StepReminds { get; set; }
        public DbSet<StepRegular> StepRegulars { get; set; }
        public DbSet<Voting> Votings { get; set; }

        public DbSet<StepMissionName> StepMissionNames { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // использование Fluent API

            //modelBuilder.Entity<InfoIntent>()
            //.Map(m =>
            //{
            //    m.MapInheritedProperties();
            //    m.ToTable("InfoIntents");
            //});
            // modelBuilder.Entity<Mission>()
            // .HasMany(p => p.StepOfMissions)
            // .WithMany()
            // .WillCascadeOnDelete(true);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>(); //Отменяем каскадное удаление у всех сущностей


           // modelBuilder.Entity<Mission>()
           // .HasOptional(f => f.Intent)
           // .WithRequired(s => s.Mission);

            base.OnModelCreating(modelBuilder);
        }

        public static ApplicationDbContext Create()
        {
            Database.SetInitializer<ApplicationDbContext>(new ApplicationDBInitializer());
            return new ApplicationDbContext();

            
        }
    }
}









