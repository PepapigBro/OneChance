
function FillModelArrays() {
 
    //public int Id { get; set; }
    //public string UserId { get; set; }
    //public ApplicationUser User { get; set; }
     
    //public string Name { get; set; }
    //public string Description { get; set; }
    //public string AvatarPath { get; set; }
     
    //public byte Type {get; set; } //1, 2 ,3 ,4
    //public TypeOfGroup? PublishedFor { get; set; } //nobody, privategroup, group, all, //

    //[Column(TypeName ="date")]
    //    public DateTime? DateCreate { get; set; }

    //    public int? MissionStatId { get; set; }
    //    public StatOfMission StatOfMission { get; set; }

    //public ICollection<StepOfMission> StepOfMissions { get; set; }
    
    //    {

//    public int Id { get; set; }
        
//    public int? MissionId { get; set; }
//   // public virtual Mission Mission { get; set; }

//    public int? CategoryId { get; set; }
//    public Category Category { get; set; }

//[NotMapped]
//public string CategoryName { get; set; }

//public string Name { get; set; }
        
        
//public string AvatarPath { get; set; }
//public int? StepOfMissionStatId { get; set; }
//public StepOfMissionStat StepOfMissionStat { get; set; }

    //public int Id { get; set; }
    //public int Done { get; set; }
    //public int Cancel { get; set; }
    //public int Delete { get; set; }
    //public int Change { get; set; }

   

var emptyQuicklist = {
    Id: undefined,
    User: undefined,
    Name: "",
    Description: "",
    AvatarPath: "",
    Type: types.quicklist.index,
    PublishedFor: PublicityLevels.Nobody.index,
    DateCreate: undefined,
    StatOfMission: {Id: undefined, AddStat: 0, MakeStat: 0, ChangeStat: 0, DeleteStat: 0},
    StepOfMissions: [
        { Id: undefined, Category: { Id: undefined, Name: "Все позиции" }, Name: "", AvatarPath: "", StatOfStepOfMission{Id:, Done, Cancel, Delete, Change} }//Категория
         ],
    
    allComments: []
} //Быстрый список
var emptyChallenge = {
    id: 1003,
    type:types.challenge,
    owner: {name: "Митя", group: "Nike", id: ""},
    name: "",
    description: "",
    avatar: { id: 2003, path: "" },
    
    dateCreation: new Date(),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: {adding: 1, making: 0, changed :50, deleted: 7, id: 555}, //change можно использовать как особый бонус
    tasks: [
        {day: 1, name: "", value: 0,  units: "", repeats: 0, id: 555, missionId: 1002, statTask: {done: 0, cancel: 0, delete: 0}, allComments: [], avatar: {id: 2333, path: ""}}
      
               
    ],
    allComments: [],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Челлендж
var emptyRegular = {
    id: 1004,
    type:types.regular,
    owner: {name: "Митя", group: "Nike", id: ""},
    name: "",
    description: "",
    avatar: {id: 555, path: ""},
    dateCreation: new Date(2016, 11, 7),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: {adding: 1, making: 0, changed :50, deleted: 7, id: 555}, //change можно использовать как особый бонус
    tasks: [
        {week: 1, MonR: 0, TueR: 0, WedR: 0, ThuR: 0, FriR: 0, SatR: 0, SunR: 0, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, id: 555, missionId: 1004, statTask: {done: 0, cancel: 0, delete: 0}, allComments: [], avatar: {id: 444, path: ""}},
           
    ],
    allComments: [  ],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Регулярное
var emptyRemind = {
    id: 1005,
    type:types.remind,
    owner: {name: "Митя", group: "Nike", id: ""},
    name: "",
    description: "",
    avatar: {id: 777, path: ""},
    dateCreation: new Date(),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: {adding: 0, making: 0, changed :0, deleted: 0, id: 555}, //change можно использовать как особый бонус
    tasks: [

                       
    ],
    allComments: [
              ],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Напоминание

MissionEmptyTemplates = [emptyQuicklist, emptyChallenge, emptyRegular, emptyRemind];

var progress1 = {
    id: 2001,
    missionId: 1001,
    mission: mission1,
    user: {name: "Митя", id: "777"},
    directory: {name: "Покупки", id: 767},
    stage:  MissionStage.Active,
    dateStart: new Date(2016, 11, 7),
    stats: {observing: 7, likes :100, id: 959},
    myComment: "",    
    allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
               {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}
              ],
    aims: [//Цели на сегодня (или на другую выбранную дату) - определяется по дате в Mission. Если даты нет, подгружаются все
        {name: "Трансформеры", 
         count: 10, 
         category: "Игрушки", 
         iMade: 7, 
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, 
         taskId: 156, 
         missionId: 10, 
         isRemind: false, 
         myComment: "", 
         allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], 
         isNeedConfirm: true, 
         stage: TaskStage.Active, 
         executor: {name: "Bulka", id: "5555"}, 
         votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7),
         photos: [{id: 555, path: ""}, {id: 55, path: ""}] 
        },
        
         {name: "Куклы", 
          count: 7, 
          category: "Игрушки", 
          iMade: 7, 
          statTask: {done: 2, cancel: 10, delete: 1},
          aimsId: 2001, 
          taskId: 157, 
          missionId: 10, 
          isRemind: true, 
          myComment: "", 
          allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], 
          isNeedConfirm: true, 
          stage: TaskStage.Active, 
          executor: {name: "Bulka", id: "5555"}, 
          votes: {imFor: 510, imAgainst: 100, needed: 70}, 
          dateVoteDeadline: new Date(2016, 11, 7), 
          photos: [{id: 555, path: ""}, {id: 555, path: ""}] 
         },
        
         {name: "Бананчики", 
          count: 3, 
          category: "Фрукты", 
          iMade: 7, 
          statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 158, missionId: 10, isRemind: false, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}] },
        
         {name: "Мандарины", count: 5 , category: "Фрукты", iMade: 7, statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 159, missionId: 10, isRemind: true, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}] },
        
         {name: "Картошенька", count: 1 , category: "Овощи", iMade: 7, statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 160, missionId: 10, isRemind: false, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 55, path: ""}] },
        
         {name: "Лук", count: 5 , category: "Овощи", iMade: 7, statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 161, missionId: 10, isRemind: false, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 55, path: ""}, {id: 555, path: ""}] },
        
         {name: "Помидоры", count: 1 , category: "Овощи", iMade: 7, statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 162, missionId: 10, isRemind: false, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}] }
        


    ],
    //Свойства предложенных заданий
    partnerId: {name: "Barsik", id: ""}, //По умолчанию назначен сам пользователь
    InterplayStage: InterplayStage.UserAccepted,
    missionAgreement: {
        publicity: PeopleGroup.All, //Открытость для наблюдения
        edititorsGroup: PeopleGroup.OnlyBoss, // Кто может редактировать в процессе выполнения
        inspectionGroup: PeopleGroup.OnlyI, //Кто проверяет и утверждает
        whoCanRemove: PeopleGroup.Nobody, //Кто может удалять полностью Mission (если никто, то оно будет висеть вечно)
        isPossibleReassign: true,//Можно ли перепоручать
        isBossCanDoTo: false//Может ли поручитель (boss) тоже выполнять какие-то задачи        
    },
    
    miniGroupId: 212,
    group: {name: "Nike", id: 555},
    
    correctingTasks: [
       {originTaskId: 156, id: 163, name: "Картошенька с луком", count: 5},  
       {originTaskId: 156, id: 164, name: "", count: 0}
    ]
    
    
} //Быстрый список
var progress2 = {
    id: 2001,
    missionId: 1001,
    mission: mission2,
    user: {name: "Митя", id: "777"},
    directory: {name: "Покупки", id: 767},
    stage:  MissionStage.Active,
    dateStart: new Date(2016, 11, 7),
    stats: {observing: 7, likes :100, id: 959},
    myComment: "",    
    allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
               {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}
              ],
    aims: [//Цели на сегодня (или на другую выбранную дату) - определяется по дате в Mission. Если даты нет, подгружаются все
        {day: 2, name: "Попрыгать на кроватке", nedeedValue: 575,  units: "rv", nedeedRepeats: 1, myValue: 700, myRepeats: 1, 
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 156, missionId: 10, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 5555, path: ""}], dateDone: new Date(2016, 11, 7) },
  
        
        {day: 2, name: "Попить чаю", nedeedValue: 575,  units: "rv", nedeedRepeats: 1, myValue: 700, myRepeats: 1, 
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 156, missionId: 10, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 5555, path: ""}, {id: 555, path: ""}], dateDone: new Date(2016, 11, 7) },
        
        
        {day: 2, name: "Погладить кота", nedeedValue: 575,  units: "rv", nedeedRepeats: 1, myValue: 700, myRepeats: 1, 
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 156, missionId: 10, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}], dateDone: new Date(2016, 11, 7) }
    ],
    //Свойства предложенных заданий
    partnerId: {name: "Barsik", id: ""}, //По умолчанию назначен сам пользователь
    InterplayStage: InterplayStage.ImAccepted,
    missionAgreement: {
        publicity: PeopleGroup.All, //Открытость для наблюдения
        edititorsGroup: PeopleGroup.OnlyBoss, // Кто может редактировать в процессе выполнения
        inspectionGroup: PeopleGroup.OnlyI, //Кто проверяет и утверждает
        whoCanRemove: PeopleGroup.Nobody, //Кто может удалять полностью Mission (если никто, то оно будет висеть вечно)
        isPossibleReassign: true,//Можно ли перепоручать
        isBossCanDoTo: false//Может ли поручитель (boss) тоже выполнять какие-то задачи        
    },
    
    miniGroupId: 212,
    group: {name: "Nike", id: 555},
    correctingTasks: [
      {name: "Погулять", value: 575,  units: "rv", repeats: 1},
      {day: 5, name: "Погулять", value: 575,  units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: {done: 2, cancel: 10, delete: 1}, allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
                      {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], avatar: {id: 555, path: ""}}
    ]
    
    
}  //Челлендж
var progress3 = {
    id: 2001,
    missionId: 1003,
    mission: mission3,
    user: {name: "Митя", id: "777"},
    directory: {name: "Покупки", id: 767},
    stage:  MissionStage.Active,
    dateStart: new Date(2016, 11, 7),
    stats: {observing: 7, likes :100, id: 959},
    myComment: "",    
    allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
               {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}
              ],
    aims: //Цели на сегодня (или на другую выбранную дату) - определяется по дате в Mission. Если даты нет, подгружаются все
        {week: 3, day: 3, name: "Английский", nedeedValue: 575,  nedeedRepeats: 3, myValue: 700, myRepeats: 1, 
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 156, missionId: 10, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}], dateDone: new Date(2016, 11, 7) },
  
   
    //Свойства предложенных заданий
    partnerId: {name: "Barsik", id: ""}, //По умолчанию назначен сам пользователь
    interplayStage: InterplayStage.UserCanceled,
    missionAgreement: {
        publicity: PeopleGroup.All, //Открытость для наблюдения
        edititorsGroup: PeopleGroup.OnlyBoss, // Кто может редактировать в процессе выполнения
        inspectionGroup: PeopleGroup.OnlyI, //Кто проверяет и утверждает
        whoCanRemove: PeopleGroup.Nobody, //Кто может удалять полностью Mission (если никто, то оно будет висеть вечно)
        isPossibleReassign: true,//Можно ли перепоручать
        isBossCanDoTo: false//Может ли поручитель (boss) тоже выполнять какие-то задачи        
    },
    
    miniGroupId: 212,
    group: {name: "Nike", id: 555},
    correctingTasks: [
    {week: 1, MonR: 1, TueR: 1, WedR: 1, ThuR: 1, FriR: 1, SatR: 1, SunR: 1, MonV: 1, TueV: 1, WedV: 1, ThuV: 1, FriV: 1, SatV: 1, SunV:1, id: 555, missionId: 1002, statTask: {done: 2, cancel: 10, delete: 1}, allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
                      {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], avatar: {id: 555, path: ""}}
    ]
    
    
    
    
}  //Регулярное
var progress4 = {
    id: 2001,
    missionId: 1004,
    mission: mission4,
    user: {name: "Митя", id: "777"},
    directory: {name: "Покупки", id: 767},
    stage:  MissionStage.Active,
    dateStart: new Date(2016, 11, 7),
    stats: {observing: 7, likes :100, id: 959},
    myComment: "",    
    allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
               {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}
              ],
    aims: //Цели на сегодня (или на другую выбранную дату) - определяется по дате в Mission. Если даты нет, подгружаются все
        [
        {name: "Английский",  
         statTask: {done: 2, cancel: 10, delete: 1},
         aimsId: 2001, taskId: 156, missionId: 10, myComment: "", allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], isNeedConfirm: true, 
         stage: TaskStage.Active, executor: {name: "Bulka", id: "5555"}, votes: {imFor: 510, imAgainst: 100, needed: 70}, 
         dateVoteDeadline: new Date(2016, 11, 7), photos: [{id: 555, path: ""}, {id: 555, path: ""}], dateDone: new Date(2016, 11, 7) }
   
        ],
    
    
   
    //Свойства предложенных заданий
    partnerId: {name: "Митя", id: ""}, //По умолчанию назначен сам пользователь
    InterplayStage: InterplayStage.UserAccepted,
    missionAgreement: {
        publicity: PeopleGroup.All, //Открытость для наблюдения
        edititorsGroup: PeopleGroup.OnlyBoss, // Кто может редактировать в процессе выполнения
        inspectionGroup: PeopleGroup.OnlyI, //Кто проверяет и утверждает
        whoCanRemove: PeopleGroup.Nobody, //Кто может удалять полностью Mission (если никто, то оно будет висеть вечно)
        isPossibleReassign: true,//Можно ли перепоручать
        isBossCanDoTo: false//Может ли поручитель (boss) тоже выполнять какие-то задачи        
    },
    
    miniGroupId: 212,
    group: {name: "Nike", id: 555},
    correctingTasks: [
    {date: new Date(2017, 11, 8), isrepeat: false, id: 555, missionId: 1002, statTask: {done: 2, cancel: 10, delete: 1}, allComments: [{user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}, 
                      {user: {name: "", id:888}, stage: MissionStage.Active, comment: ""}], avatar: {id: 555, path: ""}}
    ]
    
}  //Напоминание

var mission1 = {
    id: 1000,
    type: types.quicklist,
    owner: { name: "Дмитрий Грачев", group: "", id: "U001" },
    name: "Продукты в Ашане на 1 неделю",
    description: "Веганская неделя",
    avatar: { id: 2000, path: "" },
    dateCreation: new Date(2016, 11, 7),
    isPublished: false,
    stats: { adding: 10, making: 10, changed: 0, deleted: 0, id: 3000 },
    tasks: [
        { category: "Все позиции" },

        //Категория
        {
            id: 5000, name: "", count: 0, category: "Овощи", categoryId: 4001, MissionId: 1000, stats: { done: 2, cancel: 4, delete: 1 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Active, comment: "Маловато овощей!" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6000, path: "" }
        },

        //Задача
        {
            id: 5001, name: "Картошка", count: 10, category: "Овощи", categoryId: 4001, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6001, path: "" }
        },
        //Задача
        {
            id: 5002, name: "Морковь", count: 3, category: "Овощи", categoryId: 4001, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6002, path: "" }
        },
        //Задача
        {
            id: 5003, name: "Броккули", count: 1, category: "Овощи", categoryId: 4001, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
            { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6003, path: "" }
        },


        //Категория
        {
            id: 5004, name: "", count: 0, category: "Фрукты", categoryId: 4002, MissionId: 1000, stats: { done: 2, cancel: 4, delete: 1 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Active, comment: "Маловато овощей!" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6004, path: "" }
        },

        //Задача
        {
            id: 5005, name: "Манго", count: 10, category: "Фрукты", categoryId: 4002, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6005, path: "" }
        },
        //Задача
        {
            id: 5006, name: "Авокадо", count: 3, category: "Фрукты", categoryId: 4002, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6006, path: "" }
        },
        //Задача
        {
            id: 5007, name: "Персики", count: 1, category: "Фрукты", categoryId: 4002, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
            { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6007, path: "" }
        },


        //Категория
        {
            id: 5008, name: "", count: 0, category: "Зелень", categoryId: 4003, MissionId: 1000, stats: { done: 2, cancel: 4, delete: 1 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Active, comment: "Маловато овощей!" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6005, path: "" }
        },


        //Категория
        {
            id: 5005, name: "", count: 0, category: "Консервы", categoryId: 4004, MissionId: 1000, stats: { done: 2, cancel: 4, delete: 1 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Active, comment: "Маловато овощей!" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6006, path: "" }
        },

        //Задача
        {
            id: 5006, name: "Оливки", count: 10, category: "Консервы", categoryId: 4004, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6007, path: "" }
        },
        //Задача
        {
            id: 5007, name: "Сгущенка", count: 3, category: "Консервы", categoryId: 4004, MissionId: 1000, stats: { done: 6, cancel: 0, delete: 0 }, allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Done, comment: "Норм, но можно было и лучше" },
                         { user: { name: "Mitya", id: "U001" }, stage: MissionStage.Done, comment: "Все нашел, кроме кинзы" }], avatar: { id: 6008, path: "" }
        }



    ],

    allComments: [{ user: { name: "Barsik", id: "U002" }, stage: MissionStage.Active, comment: "Годный список, пока справляюсь" },
               { user: { name: "Mitya Grachev", id: "U001" }, stage: MissionStage.Done, comment: "Все заказал в интернете, да и все! ахххха" }
    ]
} //Быстрый список
var mission2 = {
    id: 1003,
    type: types.challenge,
    owner: { name: "Митя", group: "Nike", id: "" },
    name: "Asos",
    description: "Краткое описание",
    avatar: { id: 2003, path: "" },
    dateCreation: new Date(2016, 11, 7),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: { adding: 1, making: 0, changed: 50, deleted: 7, id: 555 }, //change можно использовать как особый бонус
    tasks: [
        {
            day: 1, name: "Погулять", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 1, name: "Сходить в басик", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 2, name: "Попрыгать на кроватке", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 2, name: "Попить чаю", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 2, name: "Погладить кота", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 3, name: "Покормить уток", value: 575, units: "rv", repeats: 1, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        },

        {
            day: 4, name: "", value: 0, units: "", repeats: 0, id: 555, missionId: 1002, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 2333, path: "" }
        }


    ],
    allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
               { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }
    ],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Челлендж
var mission3 = {
    id: 1004,
    type: types.regular,
    owner: { name: "Митя", group: "Nike", id: "" },
    name: "Бег по утрам",
    description: "Краткое описание",
    avatar: { id: 555, path: "" },
    dateCreation: new Date(2016, 11, 7),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: { adding: 1, making: 0, changed: 50, deleted: 7, id: 555 }, //change можно использовать как особый бонус
    tasks: [
        {
            week: 1, MonR: 1, TueR: 1, WedR: 1, ThuR: 1, FriR: 1, SatR: 1, SunR: 1, MonV: 1, TueV: 1, WedV: 1, ThuV: 1, FriV: 1, SatV: 1, SunV: 1, id: 555, missionId: 1004, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 444, path: "" }
        },

        {
            week: 2, MonR: 2, TueR: 2, WedR: 2, ThuR: 2, FriR: 2, SatR: 2, SunR: 2, MonV: 2, TueV: 2, WedV: 2, ThuV: 2, FriV: 2, SatV: 2, SunV: 2, id: 555, missionId: 1004, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 441, path: "" }
        },
        {
            week: 3, MonR: 3, TueR: 3, WedR: 3, ThuR: 3, FriR: 3, SatR: 3, SunR: 3, MonV: 3, TueV: 3, WedV: 3, ThuV: 3, FriV: 3, SatV: 3, SunV: 3, id: 555, missionId: 1004, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 442, path: "" }
        }



    ],
    allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
               { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }
    ],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Регулярное
var mission4 = {
    id: 1005,
    type: types.remind,
    owner: { name: "Митя", group: "Nike", id: "" },
    name: "Икеа",
    description: "Кредит!",
    avatar: { id: 777, path: "" },
    dateCreation: new Date(2016, 11, 7),
    isPublished: true, //Публикация, чтоб могли находить и использовать другие
    stats: { adding: 1, making: 0, changed: 50, deleted: 7, id: 555 }, //change можно использовать как особый бонус
    tasks: [
        {
            date: new Date(2016, 11, 8), deadline: undefined, id: 555, missionId: 1005, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                         { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 777, path: "" }
        },
        {
            date: new Date(2016, 11, 5), deadline: undefined, id: 555, missionId: 1005, statTask: { done: 2, cancel: 10, delete: 1 }, allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
                      { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }], avatar: { id: 777, path: "" }
        }


    ],
    allComments: [{ user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" },
               { user: { name: "", id: 888 }, stage: MissionStage.Active, comment: "" }
    ],
    isOneChance: true //нельзя выполнить или отметить в другой день
} //Напоминание
















/*var mission1 = {
    id: 1001,
    type:types.quicklist,
    owner: {name: "Митя", group: "Nike"},
    name: "Asos",
    description: "Краткое описание",
    isPublished: false, //Публикация, чтоб могли находить и использовать другие
    stats: {adding: 1, making: 0, changed :50, deleted: 7}, //change можно использовать как особый бонус
    items: [
        {category: "Все позиции"},
        {category: "Test",  name: "",  count: ""},
        {category: "Фрукты", name: "", count: 0},
        {id: 156, name: "Хлеб", count: 10     , category: "Фрукты", categoryId: 1, originMissionId: 1001   },
        {id: 157, name: "Масло", count: 7     , category: "Фрукты", categoryId: 1, originMissionId: 1001   },
        {id: 158, name: "Картофель", count: 3 , category: "Фрукты", categoryId: 1, originMissionId: 1001   },
        {category: "Овощи", name: "", count: 0},
        {id: 159, name: "Сыр", count: 5       , category: "Овощи", categoryId: 2, originMissionId: 1001   },
        {id: 160, name: "Дилдо", count: 1     , category: "Овощи", categoryId: 2, originMissionId: 1001   },
        {category: "Игрушки", name: "", count: 0},
        {id: 161, name: "Вибродилдо", count: 5, category: "Игрушки", categoryId: 3, originMissionId: 1001   },
        {id: 162, name: "Иммитатор", count: 1 , category: "Игрушки", categoryId: 3, originMissionId: 1001   },
        
    ]
    
}
var mission2 = {
    id: 1002,
    type:types.remind,
    owner: {name: "Митя", group: "Nike"},
    name: "Икеа",
    description: "Кухня",
    isPublished: false,
    stats: {adding: 1, making: 0},
    comment: "",
    items: [
        {id: 163, originMissionId: 1002, date: new Date(2016, 11, 7), isrepeat: false},
        {id: 164, originMissionId: 1002, date: new Date(2016, 11, 8), isrepeat: true}       
    ]      
    
}
var mission3 = {
    id: 1003,
    type: types.regular,
    owner: {name: "Митя", group: "Nike"},
    name: "Бег по утрам",
    description: "Сексуальный и молодой",
    isPublished: false,
    stats: {adding: 1, making: 0},
    comment: "",
    items: [
        {id: 165, originMissionId: 1003, week: 1, MonR: 1, TueR: 1, WedR: 1, ThuR: 1, FriR: 1, SatR: 1, SunR: 1, MonV: 1, TueV: 1, WedV: 1, ThuV: 1, FriV: 1, SatV: 1, SunV:1},  
        
        {id: 166, originMissionId: 1003, week: 2, MonR: 1,  TueR: 2, WedR: 2, ThuR: 2, FriR: 2, SatR: 2, SunR: 2, MonV: 2, TueV: 2, WedV: 2, ThuV: 2, FriV: 2, SatV: 2, SunV: 2},
        
        {id: 167, originMissionId: 1003, week: 3, MonR: 1,  TueR: 3, WedR: 3, ThuR: 3, FriR: 3, SatR: 3, SunR: 3, MonV: 3, TueV: 3, WedV: 3, ThuV: 3, FriV: 3, SatV: 3, SunV: 3},
        
        {id: 168, originMissionId: 1003, week: 4, MonR: 1,  TueR: 4, WedR: 4, ThuR: 4, FriR: 4, SatR: 4, SunR: 4, MonV: 4, TueV: 4, WedV: 4, ThuV: 4, FriV: 4, SatV: 4, SunV: 4}
    ]
}
var mission4 = {
    id: 1004,
    type:types.challenge,
    owner: {name: "Митя", group: "Nike"},
    name: "100км за 25 дней",
    isPublished: false,
    description: "Я сошла с ума",
    stats: {adding: 1, making: 0},
    items: [
        {id: 169, originMissionId: 1004, day: 1, name: "1a", value: 575,  units: "rv", repeats: 1},
        {id: 170, originMissionId: 1004, day: 1, name: "1b", value: 575,  units: "rv", repeats: 1},
        {id: 171, originMissionId: 1004, day: 2, name: "2a", value: 575,  units: "rv", repeats: 1},
        {id: 172, originMissionId: 1004, day: 2, name: "2b", value: 575,  units: "rv", repeats: 1},
        {id: 173, originMissionId: 1004, day: 2, name: "2c", value: 575,  units: "rv", repeats: 1},
        {id: 174, originMissionId: 1004, day: 3, name: "3a", value: 575,  units: "rv", repeats: 1},
        {id: 175, originMissionId: 1004, day: 3, name: "3b", value: 575,  units: "rv", repeats: 1},
        {id: 176, originMissionId: 1004, day: 3, name: "3c", value: 575,  units: "rv", repeats: 1},
        {id: 177, originMissionId: 1004, day: 3, name: "3d", value: 575,  units: "rv", repeats: 1},
        {id: 178, originMissionId: 1004, day: 4, name: "4a", value: 575,  units: "rv", repeats: 1},
        {id: 179, originMissionId: 1004, day: 4, name: "4b", value: 575,  units: "rv", repeats: 1},
        {id: 180, originMissionId: 1004, day: 4, name: "4c", value: 575,  units: "rv", repeats: 1},
        {id: 181, originMissionId: 1004, day: 5, name: "5a", value: 575,  units: "rv", repeats: 1},
        
    ]
    
}

var progress1 = {
    id: 2111,
    originMissionId: 1001,
    originMission: mission1,
    userId: "Mitya",

    dateStart: "2016-08-01",
  
    stage:  MissionStage.Active,
    stats: {observing: 7, likes :100},
    comment: "",
    itemsProgress: [
        {id: 2001, originItemId: 156, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-02-17", donecount: 7, isRemind: false, comment: "", isConfirm: true, isDone: TaskStage.Done },
        {id: 2002, originItemId: 157, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-03-18", donecount: 3, isRemind: true, comment: "", isConfirm: true, isDone: TaskStage.Done  },
        {id: 2003, originItemId: 158, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-02-17", donecount: 7, isRemind: false, comment: "", isConfirm: false, isDone: TaskStage.Done},
        {id: 2004, originItemId: 159, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-03-18", donecount: 3, isRemind: true, comment: "", isConfirm: true, isDone: TaskStage.Done  },
        {id: 2005, originItemId: 160, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-02-17", donecount: 7, isRemind: false, comment: "", isConfirm: true, isDone: TaskStage.Done },
        {id: 2006, originItemId: 161, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-03-18", donecount: 3, isRemind: true, comment: "", isConfirm: true, isDone: TaskStage.Done  },
        {id: 2007, originItemId: 162, parentMissionId: 10, deadline: "2015-01-21", dateEnd: "2016-11-15", donecount: 24, isRemind: true, comment: "", isConfirm: false, isDone: TaskStage.Done },

    ],
    //Свойства предложенных заданий
    PartnerId: "Barsik",
    InterplayStage: InterplayStage.UserAccepted,
    IsPublicFor: TypeOfPeopleGroup.OnlyI,
    WhoCanChange: TypeOfPeopleGroup.Nobody,
    WhoCanDelete: TypeOfPeopleGroup.Nobody,
    EstimateGroup: TypeOfPeopleGroup.All, //Кто контроллирует

    MiniGroupId: 1221,
    Group: 121212,
    VotesPerConfirm: 57,   
    MinVoutesToWin: 67
    
}
var progress2 = {
    id: 2112,
    originMissionId: 1002, 
    originMission: mission2,
    userId: "Mitya",
    dateStart: "2016/11/05",
    stage:  MissionStage.Done,
    stats: {observing: 7, likes :100},   
    stats: {observing: 0}, 
    comment: "",
    itemsProgress: [
        {id: 2008, originItemId: 163, isDone: true, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done},
        {id: 2009, originItemId: 164, isDone: false, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done},
        {id: 2010, originItemId: 164, isDone: false, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done},
        {id: 2011, originItemId: 164, isDone: false, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done},
        {id: 2012, originItemId: 163, isDone: false, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done},
        {id: 2013, originItemId: 163, isDone: true, dateEnd: "2016/11/07", comment: "", isDone: TaskStage.Done}
    ] 
    ,
    //Свойства предложенных заданий
    PartnerId: "Дмитрий Грачев",
    MiniGroupId: 1221,
    Group: 121212,
    InterplayStage: InterplayStage.ImCanceled,
    CanChange: TypeOfPeopleGroup.Nobody,
    CanDelete: TypeOfPeopleGroup.All,
    IsPublicFor: TypeOfPeopleGroup.All,
    CanRate: TypeOfPeopleGroup.All,
    VotesPerConfirm: 57,   
    MinimumVoutesToWin: 67
}
var progress3 = {
    OriginalMissionId: 1003, 
    originMission: mission3,
    DateStart: "2016/11/05",
    userId: "Mitya",
    stage:  MissionStage.Pending,
    stats: {observing: 7, likes :100},
    comment: "",
    itemsProgress: [
        {id: 2014, originItemId: 165, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done},        
        {id: 2015, originItemId: 166, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done},        
        {id: 2016, originItemId: 167, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done},        
        {id: 2017, originItemId: 168, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done},        
        {id: 2018, originItemId: 165, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done},        
        {id: 2019, originItemId: 166, MonV: 0, TueV: 0, WedV: 0, ThuV: 0, FriV: 0, SatV: 0, SunV: 0, dateEnd: "2017/01/03", comment: "", isDone: TaskStage.Done}
    ],
    //Свойства предложенных заданий
    PartnerId: "",
    MiniGroupId: 1221,
    Group: 121212,
    InterplayStage: InterplayStage.Received,
    CanChange: TypeOfPeopleGroup.Nobody,
    CanDelete: TypeOfPeopleGroup.Group,
    IsPublicFor: TypeOfPeopleGroup.Group,
    CanRate: TypeOfPeopleGroup.All,
    VotesPerConfirm: 57,   
    MinimumVoutesToWin: 67
    
   
}
var progress4 = {
    OriginalMissionId: 1004, 
    originMission: mission4,
    DateStart: "2016/11/05",
    userId: "Mitya",
    stats: {observing: 0},
    stage:  MissionStage.Paused,
    stats: {observing: 7, likes :100},
    comment: "",
    itemsProgress: [
        {id: 2039, originItemId: 169, value: 575, dateEnd: "2017/01/03", comment: ""},
        {id: 2040, originItemId: 170, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2041, originItemId: 171, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2042, originItemId: 172, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2043, originItemId: 173, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2044, originItemId: 174, value: 575, dateEnd: "2017/01/03", comment: ""},
        {id: 2045, originItemId: 175, value: 575, dateEnd: "2017/01/03", comment: ""},
        {id: 2046, originItemId: 176, value: 575, dateEnd: "2017/01/03", comment: ""},        
        {id: 2039, originItemId: 177, value: 575, dateEnd: "2017/01/03", comment: ""},
        {id: 2040, originItemId: 178, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2041, originItemId: 179, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2042, originItemId: 180, value: 0,   dateEnd: "2017/01/03", comment: ""},
        {id: 2043, originItemId: 181, value: 0,   dateEnd: "2017/01/03", comment: ""},
    ],
    //Свойства предложенных заданий
    PartnerId: "Раечка Романова",
    MiniGroupId: 1221,
    Group: 121212,
    InterplayStage: InterplayStage.Received,
    CanChange: TypeOfPeopleGroup.Nobody,
    CanDelete: TypeOfPeopleGroup.Nobody,
    IsPublicFor: TypeOfPeopleGroup.MiniGroup,
    CanRate: TypeOfPeopleGroup.All,
    VotesPerConfirm: 57,   
    MinimumVoutesToWin: 67
    
    
}
*/

///*********************Шаблоны новых Mission******************************///
/*var templateMission1 = {
    id: 0,
    type:types.quicklist,
    owner: {name: "Пользователь", group: "Name"},
    name: "Новый быстрый список",
    description: "Краткое описание",
    isPublished: false,
    stats: {adding: 0, making: 0},
    items: [
        {category: "Все позиции"}
    ]
    
} //Шаблон быстрого списка
var templateMission2 = {
   id: 0,
    type:types.remind,
    owner: {name: "", group: ""},
    name: "Новое напоминание",
    description: "555",
    isPublished: false,
    stats: {adding: 0, making: 0},
    comment: "",
    items: [
        
    ]     
     
} //Шаблон Напоминание
var templateMission3 = {
    id: 0,
    type: types.regular,
    owner: {name: "Пользователь", group: "Name"},
    name: "Новое регулярное намерение",
    description: "Сексуальный и молодой",
    isPublished: false,
    stats: {adding: 1, making: 0},
    comment: "",
    items: [
        {id: null, originMissionId: null, week: 1, MonR: null, TueR: null, WedR: null, ThuR: null, FriR: null, SatR: null, SunR: null, MonV: null, TueV: null, WedV: null, ThuV: null, FriV: null, SatV: null, SunV: null}
    ]
} //Шаблон Регулярное
var templateMission4 = {
    id: 0,
    type:types.challenge,
    owner: {name: "Пользователь длинное имя", group: "Name"},
    name: "Новый челлендж",
    isPublished: false,
    description: "Я сошла с ума",
    stats: {adding: 1, making: 0},
    items: [
        {id: null, originMissionId: null, day: 1, name: "", value: null,  units: null, repeats: null}
        
    ]
    
} //Шаблон Челлендж

var templateProgress1 = {
    id: 0,
    originMissionId: 0,
    originMission: templateMission1,
    userId: "",
    entrastToUserId: "",
    entrastFromUserId: "",
    dateStart: "",
    isPublic: false,    
    isDeleted: false,
    isActive: false,    
    isDone: false,
    stats: {observing: 0},
    comment: "",
    itemsProgress: [{}
    ]
}
var templateProgress2 = {
    id: 0,
    originMissionId: 0, 
    originMission: templateMission2,
    userId: "",
    entrastToUserId: "",
    entrastFromUserId: "",
    dateStart: "",
    isPublic: false, 
    isDeleted: false,
    isActive: false,
    isDoneMonths: 0,    
    stats: {observing: 0}, 
    comment: "",
    itemsProgress: [
      
    ]  
} 
var templateProgress3 = {
    OriginalMissionId: 0, 
    originMission: templateMission3,
    DateStart: "",
    isPublic: false, 
    IsActive: false,
    IsDeleted: false,
    userId: "",
    entrastToUserId: "",
    entrastFromUserId: "",
    stats: {observing: 0},
    isDoneWeeks: 3,   
    comment: "",
    itemsProgress: [
    ]
    
   
}
var templateProgress4 = {
    OriginalMissionId: 0, 
    originMission: templateMission4,
    DateStart: "",
    userId: "",
    entrastToUserId: "",
    entrastFromUserId: "",
    isPublic: false, 
    IsActive: false,
    IsDeleted: false,
    stats: {observing: 0},
    isDoneDays: 0, 
    comment: "",
    itemsProgress: [
    
    ]
    
    
}


var nullRemindProgress = {
    OriginalMissionId: 0, 
    originMission: templateMission2,
    DateStart: "",
    userId: "",
    entrastToUserId: "",
    entrastFromUserId: "",
    isPublic: false, 
    IsActive: false,
    IsDeleted: false,
    stats: {observing: 0},
    isDoneDays: 0, 
    comment: "Hello Kitty",
    items: [ ]
    
} //Для календаря
*/


///*********************// Шаблоны новых Mission //***********************///





Missions= [mission1, mission2, mission3, mission4];
Progreses = [progress1, progress2, progress3, progress4]


MissionsRandomExamples= [mission1, mission2, mission3, mission4];
/*
modelNewMission = [cloneMission(templateProgress1), cloneMission(templateProgress2),  cloneMission(templateProgress3),  cloneMission(templateProgress4)];
modelNull = [nullRemindProgress];*/
}















