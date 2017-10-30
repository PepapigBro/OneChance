


var types ={all:{name:"Все", src:"", abr: "all", index: 0}, quicklist:{name: "Быстрый список", menu: "Мои Быстрые списки", src: '', abr:"quicklist", index: 1}, challenge:{name: "Челлендж", menu: "Мои Челленджи", src: '', abr:"challenge", index: 2}, regular:{name: "Регулярное", menu: "Мои Регулярные", src: '', abr: "regular", index: 3}, remind:{name: "Напоминание", menu: "Мои Напоминания", src: '', abr: "remind", index: 4}}
var typesArr = [types.all, types.quicklist, types.challenge, types.regular, types.remind]

var months = [{month: "1", name: "Январь"},{month: "2", name: "Февраль"},{month: "3", name: "Март"},{month: "4", name: "Апрель"},{month: "5", name: "Май"},{month: "6", name: "Июнь"},{month: "7", name: "Июль"},{month: "8", name: "Август"},{month: "9", name: "Сентябрь"},{month: "10", name: "Октябрь"},{month: "11", name: "Ноябрь"},{month: "12", name: "Декабрь"} ];

var years = [{year: "2015"}, {year: "2016"}, {year: "2017"}, {year: "2018"}, {year: "2019"}, {year: "2020"}, {year: "2021"}, {year: "2022"}, {year: "2023"}, {year: "2024"}, {year: "2025"}, {year: "2026"}, {year: "2027"}, {year: "2028"}, {year: "2029"}, {year: "2030"} ];


var MissionProps = { Active: 1, Done: 2, Added: 4, Paused: 8, Deleted: 16, Private: 32, Public: 64, Created: 128 };



var categories = [
    {id: 1, name: "Фрукты"},
    {id: 2, name: "Овощи"},
    {id: 3, name: "Игрушки"},
]


var MissionPropFilter ={
 onlyIsAdded:0,
 onlyIsDone: 1, 
 onlyIsPublic: 2, 
 onlyIsEntrusted: 3, 
 onlyIsActive: 4, 
 onlyIsDeactive: 5,
 onlyIsDeleted: 6,
 onlyIsNew: 7
 }

var MiniGroup = {
    Id: 0,
    UserId: 0,
    CreatorId: 0,
    Name: "",
    IsPublic :true
    
}

var InterplayStage = {
    Sent: 1,            //Я отправил
    Received: 2,        //Я получил    
    UserAccepted: 3,    //Пользователь получил - принял
    ImAccepted: 4,      //Я получил - принял
    UserCanceled: 5,    //Пользователь получил - отказался
    ImCanceled: 6,      //Я получил - отказался  
}//Нечетные - то, что я предложил и действия пользователя //Четные - это то, что предложили мне и мои действия

var MissionStage={
    Added: 1, //Просто добавлено, висит в добаленных или порученных 
    Active: 2, //Выполняется
    Paused: 3, //Приостановлено
    WaitingForCheck: 4, //Отправлено поручателю на проверку
    NeedToAlter:5, //Поручатель проверил и не согласился принять
    Done: 6, //Выполнено
    Rejected: 7, //Отказался выполнять
    Deleted: 8 //Удалено
}

var PeopleGroup = {
    Nobody: { value: 0, name: "Не видит никто" },
    OnlyI: { value: 1, name: "Вижу только я" },
    OnlyBoss: { value: 2, name: "Видит только поручитель" },
    MiniGroup: { value: 3, name: "Видят некоторые" },
    Group: { value: 4, name: "Видит группа" },
    All: { value: 5, name: "Видят все пользователи" }
}

var ObserversGroup = {
    
    OnlyI: {value: 1, name: "Вижу только я"},    
    MiniGroup: {value: 2, name: "Видят некоторые"},
    Group: {value: 3, name: "Видит группа"},
    All: {value: 4, name: "Видят все пользователи"}    
}
var ObserversGroupArr = [null, ObserversGroup.OnlyI, ObserversGroup.MiniGroup, ObserversGroup.Group, ObserversGroup.All];

var PublicityLevels = {
    nobody: 0,
    onlyFriends: 1,
    all: 2
}
var PublicityLevelsDescription = [
    { name: "Не видит никто" },
    { name: "Видят только друзья" },
    { name: "Видят все" }]


var MissionAgreement={
    Publicity: PeopleGroup.All, //Открытость для наблюдения
    EdititorsGroup: PeopleGroup.OnlyBoss, // Кто может редактировать в процессе выполнения
    InspectionGroup: PeopleGroup.OnlyI, //Кто проверяет и утверждает
    HowCanRemove: PeopleGroup.Nobody, //Кто может удалять полностью Mission (если никто, то оно будет висеть вечно)
    IsPossibleReassign: true,//Можно ли перепоручать
    IsBossCanDoTo: false//Может ли поручитель (boss) тоже выполнять какие-то задачи
}//Если в группе проверки указан не я, а не соклько людей, то все решается голосованием


var TaskStage={
    Active: 0, //В ожидании (выведено в today)
    Forgot: 1, //Забыть на сегодня (сознательно)
    Done: 2, //Выполнено
    Delete: 3, //Не выполнять вовсе
    WaitingForConfirm: 4,//Ждет подтверждения
    NeedCorrection: 5, //Голосование окончено, задача призанана не выполненной
    CorrectionPending: 6, //Задача изменена, ждет подтверждения
    NotDOne: 7 //Не было произведено никаких действие (проигнорено вовсе)
    
}


/*
var MissionPropFilter ={
 onlyIsAdded:0,
 onlyIsDone: 1, 
 onlyIsPublic: 2, 
 onlyIsEntrusted: 3, 
 onlyIsActive: 4, 
 onlyIsDeactive: 5,
 onlyIsDeleted: 6,
 onlyIsNew: 7
 }
var MiniGroup = {
    Id: 0,
    UserId: 0,
    CreatorId: 0,
    Name: "",
    IsPublic :true
    
}
var StatusInterplay = {
    Sent: 1,
    Received: 2,
    UserAccepted: 3,
    ImAccepted: 4,
    UserCanceled: 5,
    ImCanceled: 6,    
    UserDeleted: 7,
    ImDeleted: 8
}//Нечетные - то, что я предложил и действия пользователя//Четные - это то, что предложили мне и мои действия
var TypeOfPeopleGroup = {
    Nobody: {value: 0, name: "Не видит никто"},
    OnlyI: {value: 1, name: "Вижу только я"},
    OnlyUser: {value: 2, name: "Видит только поручитель"},
    MiniGroup: {value: 3, name: "Видят некоторые"},
    Group: {value: 4, name: "Видит группа"},
    All: {value: 5, name: "Видят все пользователи"}    
}
var UsersVotesTask=[
    {    
    TaskId: 1,
    UserId: "Barsik",
    Vote: true
    },
    {    
    TaskId: 1,
    UserId: "Barsik",
    Vote: true
    }
    ]
var MissionStage={
    Added: 0, //Просто добавлено 
    Pending: 1, //В ожидании (поручено и ждет)
    Active: 2, //Выполняется
    Paused: 3, //Приостановлено
    Done: 4, //Выполнено
    Deleted: 5, //Удалено
    
    
    //Rejected:5 //Отменен
    
}
var TaskStage={
    Pending: 0, //В ожидании
    Active: 1, //Выполняется
    Paused: 2, //Приостановлено
    Done: 3, //Выполнено
    Deleted: 4 //Удалено
     
    //Rejected:5 //Отменен
    
}
*/

//Added, Active, Paused, WaitingForCheck, NeedToAlter, Done, Rejected, Deleted
var States= 
{
    Added: 0,
    Active: 1,
    Paused: 2,
    WaitingForCheck: 3,
    NeedToAlter: 4,
    Done: 5,
    Rejected: 6,
    Deleted: 7,
    WaitForStartDate: 8

}

var Results=
{
    Forgot: 1, //0x0000 0001
    Active: 2, //0x0000 0010
    Done: 4,   //0x0000 0100
    PartialDone: 8, //0x0000 1000
    Cancel: 16  //0x0001 0000
}