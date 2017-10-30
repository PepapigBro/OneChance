var timerForCheck;

function get_random_color() {
    var colorArray = ["#45a545", "#45a545", "#45a545", "#45a545", "#45a545", "#d68d8d", "#b5b5b5", "#f2c167", "#afd8af", "#b25f5f"]
    var rand = Math.floor(Math.random() * (colorArray.length - 0 + 1)) + 0;
    return colorArray[rand]
}

var onechanceApp = angular.module("onechanceApp", ["ngRoute"]);

onechanceApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/MineMission/:missionTypeFilterAbr', {
        templateUrl: 'Mine Mission/Mine Mission.html'})
        
        .when('/MineMission', {
        templateUrl: 'Mine Mission/Mine Mission.html'})
        
        .when('/CreateMission/:currentTypeCreate', {
        templateUrl: 'Creating Mission/Creating Mission.html'})
        
        .when('/CreateMission', {
        templateUrl: 'Creating Mission/Creating Mission.html'})
        
        .when('/EditMission/:missionId', {
        templateUrl: 'Edit Mission/Edit Mission.html'})
    
        .when('/ViewMission/:missionId', {
        templateUrl: 'View Mission/View Mission.html'})
        
        .when('/SuggestMission', {
        templateUrl: 'Suggest Mission/Suggest Mission.html'})
        
        .when('/Today', {
        templateUrl: 'Today/Today.html'})
        
        .when('/Today/:otherDate', {
        templateUrl: 'Today/Today.html'})
    

        
        .otherwise({
        templateUrl: 'Searched Mission/Searched Mission.html'
            //redirectTo: 
    });
    
	}]);//Роутинг по страницам















function makeClone(obj, obj2) { //копирование объекта по шаблону obj2 (копируются только те свойства, которые есть у obj2)
    var clone = {}; // Создаем новый пустой объект
    for (var prop in obj) { // Перебираем все свойства копируемого объекта
        if (obj.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) { // Только собственные свойства
            if (typeof obj[prop] === "object") { // Если свойство так же объект
                
                clone[prop] = makeClone(obj[prop], obj2[prop]); // Делаем клон свойства
            }
            else {
                
                clone[prop] = obj[prop];
            } // Или же просто копируем значение
        }
    }
    return clone;
}

function cloneMission(mission) {
    var origin = JSON.parse(angular.toJson(mission.originMission));
    var progr = JSON.parse(angular.toJson(mission));
    progr.originMission = origin;
    progr.originMission.type = mission.originMission.type;
    return progr;
}

function IsEnabled(text, arr, categoryName) { //categoryName - Имя категории, номер дня или недели   
    var ExistingElement = null;
    if (typeof text == "undefined") {
        return ExistingElement;
    }
    if (text == "" || text == " ") {
        return ExistingElement
    } //Добавить регулярное выражение
    text = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(); //Делаем заглавной первую букву 
    arr.forEach(function (item, i, arr) {
        if ('name' in item && item.name.toLowerCase() == text.toLowerCase()) {
            if ('category' in item) {
                ExistingElement = item;
            }
            if ('day' in item && item.day == categoryName) {
                ExistingElement = item;
            }
        }
    })
    return ExistingElement;
}

onechanceApp.directive('onlyDigits', function () {
    return function (scope, element, attrs) {
        element.on('keydown', function (e) {
            var maxDigits = attrs['onlyDigits'];
            var input = $(element);
            var length = input.val().length;
            //alert(input.selectionStart + " "+input.selectionEnd);
            //Очищаем input при нажатии любой кнопки, если текст в нем выделен
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            //Ограничения для input по длине
            if (input.prop('selectionStart') != input.prop('selectionEnd')) {
                input.val() = "";
            }
            if (length >= maxDigits) {
                e.preventDefault();
                return
            }
        })
    }
}) //Разрешить ввод только цифр определенной длины

onechanceApp.directive("modalShowbyid", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            var id = attrs['modalShowbyid'];
            var modalWindow = $(id);
            modalWindow.modal({
                show: true
            });
        })
    }
})

var Missions;
var Progreses;
var MissionEmptyTemplates;
var MissionsRandomExamples;

//var modelNewMission;
//var modelNull;
//var modelsExample;
//var nullRemindProgress;  
FillModelArrays(); //Заполняем массивы данными



  