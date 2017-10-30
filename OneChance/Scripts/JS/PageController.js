var onechanceApp = angular.module("onechanceApp");

var timer;
//onechanceApp.run(function ($rootScope) {
//    $rootScope.fillingArray = [];


//    $rootScope.ClearfillingArray = function () {
//        $rootScope.fillingArray.length = 0;
//    }

//    $rootScope.PushfillingArray = function (item) {
//        $rootScope.fillingArray.push(item)
       
//    }

    
//});

onechanceApp.controller("PageController", function ($scope, $routeParams, $compile) {

    $scope.ObserversGroup = ObserversGroup;
    $scope.ObserversGroupArr = ObserversGroupArr;
    $scope.States = States;
    $scope.MineTodayMissionsArray = [];
    $scope.SearchedMission = [];

    $scope.MissionProps = MissionProps;
    $scope.BreadCrumbsParams; // тут хранится объект, которые можно изнутри передавать в BreadCrumbs строку
    
    $scope.indicatorTimer;

    $scope.SetBreadCrumbsParams = function (data) {
        $scope.BreadCrumbsParams = data;
    }

    $scope.missionCalendar =  {
        Type: types.remind.index,
        Name: "Calendar",
        StepOfMissions: []



    }
   // $scope.typeOfStatus;
    $scope.TypeOfItems=0;

    $scope.ShowIndicator = function (parentElement, indicatorElement) {
        var indicator;
        if (indicatorElement == null) { indicator = $('.indicator', parentElement); }
        else { indicator = indicatorElement; }
        
       $scope.indicatorTimer =  setTimeout(function () {
           if (indicatorElement == null) { parentElement.addClass('RemoveOpacity'); }
           indicator.removeClass('hidden');
           indicator.addClass('EndlessSpin');
          
        }, 10)
        
    }

    $scope.LoadComplete = function (element) {
       // setTimeout(function () {
        
        clearTimeout($scope.indicatorTimer);
        
        var indicator;
        if (element == null) {
           
            indicator = $('.indicator.EndlessSpin').eq(0);
            var indicatorTrigger = indicator.closest('.indicatorTrigger')
            indicatorTrigger.removeClass('RemoveOpacity')
        }
        else {
            
            indicator = element;
        }
            indicator.addClass('hidden');
            indicator.removeClass('EndlessSpin');
            

       // }, 2000)
       
        
    }

    

    $scope.SetTypeOfItems = function (type) {
        $scope.TypeOfItems = type;
    };
   
   // $scope.lastScrollTop = lastScrollTop;
   // $scope.IsListEnd = false;
    //$scope.ScrollIsBusy = false;
   // $scope.fillingArray = [];

    $scope.convertToDMY = function (dateString) {
        var currDate = new Date((Date.parse(dateString)));
       // alert(dateString)
        return currDate.getDate() + "." + currDate.getMonth() + "." + currDate.getFullYear();
    }

    $scope.diffDates = function (choosingDateStr) {
        var choosingDate = new Date((Date.parse(choosingDateStr)));
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date();
        var secondDate = new Date(2008, 01, 22);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - choosingDate.getTime()) / (oneDay)))
        return diffDays;
    }


    $scope.GetMineMissionData = function (type, skipCount) {
   
        //  alert(type)
        $(window).scrollTop(0);
        lastScrollTop = 0;
        ScrollIsBusy = false;
        IsListEnd = false;

        if (skipCount == 0) { $scope.ClearfillingArray(); }
                //Запрашиваем данные моих Intent
                $.ajax({
                    url: '/Intent/GetMineIntentsJson',
                    contentType: false,
                    type: "GET",
                    dataType: 'json',
                    data: { type: type, skipCount: skipCount },//scope.fillingArray.length + 1 }, //scope.MyIntentsArray.length
                    success: function (json) {//Получаем сериализованный список намерений пользователя
                        var ScrollIntentCollection = JSON.parse(json);
                        //  alert(ScrollIntentCollection.intents.length)
                        var mineIntents = ScrollIntentCollection.intents;
                        var takeCount = ScrollIntentCollection.takeCount;

                        mineIntents.forEach(function (item, i, arr) {

                            //Нулевые не добавляем, т.к возникает дальше исключение
                            if (item != null && item != undefined) {
                                $scope.PushfillingArray(item);
                            }
                        })

                        if (mineIntents.length < takeCount) { IsListEnd = true; }
                        $scope.updatePageScope();
                        //  alert("Длина полученного массива " + scope.MyIntentsArray.length)
                    },
                    error: function (xhr, status) {

                        alert("error GetMineMissionsJson");
                    },
                    complete: function () {
                        $scope.LoadComplete();
                    }
                })


    }





    $scope.prepareCalendar = function (scope) {
       
        //Послыаем сообщение на формирование категорий и списков и календаря                    
        scope.$broadcast('EventInitializeCategory');
        scope.$broadcast('EventNewScrollAndCurrent', new Date(2016,01,01)); //Установка текущей даты
        scope.MissionOpened = true;
        

        $('#modalCalendar').on("shown.bs.modal", function () {

            // scope.MissionOpened = true;
            scope.$broadcast('EventNewScrollAndCurrent', new Date()); //Установка текущей даты
            //  scope.$apply();  
           $('#modalCalendar').off("shown.bs.modal");

        })


       //scope.$broadcast('EventNewScrollAndCurrent', new Date()); ; //Установка текущей даты
    }


    $scope.SetUrlForScrollGetData = function(url){
        $scope.UrlForScrollGetData = url;
    };
    $scope.SetUrlForScrollTypeData=function(typeData){
        $scope.UrlForScrollTypeData=typeData
    
    };




    $scope.ShowCalendar = function (scpe) {

        $('#modalCalendar').modal({ show: true });
    }




    $scope.AddedParams;


    $scope.SetAddedParams = function (params) {
        
      
        
        $scope.AddedParams = params;
      
    };

    $scope.ClearAddedParams = function () {
        
        if ($scope.AddedParams != undefined) { $scope.AddedParams.length = 0; }

    };


  //
  // $scope.DatesRange = [];
  //
  //
  // $scope.SetDatesRange = function (params) {
  //     $scope.DatesRange = params;
  // };
  //
  // $scope.ClearDatesRange = function () {
  //
  //     if ($scope.DatesRange != undefined) { $scope.DatesRange.length = 0; }
  //
  // };



    $scope.fillingArray = [];

   $scope.ClearfillingArray = function () {
       $scope.fillingArray.length = 0;
    }
   

   $scope.PushfillingArray = function (item) {
       $scope.fillingArray.push(item)
   }

   $scope.ChangefillingArray = function(lastvalue, newvalue){
       $scope.fillingArray[$scope.fillingArray.indexOf(lastvalue)] = newvalue;
   }

   $scope.RemoveFromfillingArray = function (item) {
       $scope.fillingArray.splice($scope.fillingArray.indexOf(item), 1);
       
   }

   $scope.ChangefillingArrayByIndex = function (index, newvalue) {
       $scope.fillingArray[index] = newvalue;
   }

    $scope.mineStepOfMissions = [];

    $scope.Results = Results;

    $scope.Missions = Missions;
    $scope.Progreses = Progreses;
    
    $scope.mission;
    
      
    $scope.updatePageScope = function () {
        $scope.$apply();
    }

    
    $scope.UrlForScrollGetData = "";
    $scope.UrlForScrollTypeData = "";

    //$scope.ModelNewMission = modelNewMission;
    //$scope.ModelNull = modelNull;
   // $scope.ModelsExample=modelsExample;
    //$scope.nullRemindProgress=nullRemindProgress;
    
    $scope.PureMissionEmptyTemplates = [];// Здесь хранятся чистые шаблоны, они не изменяются однажды записавшись с сервера
    $scope.MissionEmptyTemplates=[]; //В этих шаблонах происходит создание. Изначально они чистые
    $scope.MissionsRandomExample=[];
    
    $scope.MyIntentsArray = []//Тут хранятся все Intents, добаленные пользователем к себе
    
    $scope.toInt = function (str) {
        return parseInt(str)
    }

    

    $scope.getProfileCreateView = function () { 
        $(window).scrollTop(0);
        lastScrollTop = 0;
        ScrollIsBusy = false;
        IsListEnd = false;
 
        $.ajax({
            url: '/Profile/GetProfileCreateView',
            contentType: 'application/html; charset=utf-8',
            type: "GET",
            dataType: 'json',
            success: function (json) {
                var response = JSON.parse(json);
                $('#Temp').html(response.View)
                var s = $('#Temp');
                $compile(s)($scope);
                $scope.$apply();
                $scope.$broadcast('SetUserDataEvent', response.User);
            },
            error: function (xhr, status) {
                alert("Error GetProfileCreateView");
            },
            complete: function () {                
            }
        })
    }


    $scope.getProfileCreateView = function () {
        $(window).scrollTop(0);
        lastScrollTop = 0;
        ScrollIsBusy = false;
        IsListEnd = false;
        scope.ShowIndicator($(element));

        jQuery.ajaxSettings.traditional = true //без этого к массиву добавляются прямоугольные скобки и потом в контроллее mvc массив не преобразуется нормально в list
        //Запрашиваем View для отображения моих миссий
        $.ajax({
            url: '/Profile/GetProfileView',
            contentType: 'application/html; charset=utf-8',
            type: "GET",
            dataType: 'json',
            success: function (json) {
                var response = JSON.parse(json);
                $('#Temp').html(response.View)
                var s = $('#Temp');
                $compile(s)($scope);
                $scope.$apply();
                $scope.$broadcast('SetUserDataEvent', response.User);
            },
            error: function (xhr, status) {
                alert("Error Get Profile View");
            },
            complete: function () {
                scope.LoadComplete();
            }
        })
        //***Запрашиваем View

    }



    $scope.getSearchingView = function (type, modifiedMissionId) {

        //$(event.target).popover('toggle')
        $(window).scrollTop(0);
        lastScrollTop = 0;
        ScrollIsBusy = false;
        IsListEnd = false;

        $scope.UrlForScrollGetData = "/Mission/GetSearchedMissionsJson";
        $scope.UrlForScrollTypeData = "missions";

        $scope.ClearfillingArray();

        $scope.AddedParams = null;
        
        if (modifiedMissionId != null) { $scope.AddedParams=modifiedMissionId}
        
        
        $.ajax({
            url: '/Mission/Search',
            contentType: 'application/html; charset=utf-8',
            type: "GET",
            dataType: 'html',
            data: { type: type },

            success: function (response) {

                

                $('#Temp').html(response)
                
                var s = $('#Temp');
                
                $compile(s)($scope);
                $scope.$apply();
                $scope.ShowIndicator(null, $('#searchIndicator'))

                //Запрашиваем данные моих Intent
                

                //if ($scope.SearchedMission.length > 0) { return false; }
                
                $.ajax({
                    url: '/Mission/GetSearchedMissionsJson',
                    contentType: false,
                    type: "GET",
                    dataType: 'json',
                    data: { type: type, skipCount: 0, AddedParams: $scope.AddedParams },
                    success: function (json) {//Получаем сериализованный список намерений пользователя
                        
                        var ScrollIntentCollection = JSON.parse(json);
                        var collection = ScrollIntentCollection.missions;
                        var takeCount = ScrollIntentCollection.takeCount;

                        collection.forEach(function (item, i, arr) {

                            //Нулевые не добавляем, т.к возникает дальше исключение
                            if (item != null && item != undefined) {
                                $scope.PushfillingArray(item);
                            }
                        })

                        //if (mineIntents.length < takeCount) { scope.IsListEnd = true; }
                        if (collection.length < takeCount) { IsListEnd = true; }
                        $scope.updatePageScope();
                        //  alert("Длина полученного массива " + scope.MyIntentsArray.length)
                    },
                    error: function (xhr, status) {

                        alert("error GetMineMissionsJson");
                    },
                    complete: function () {
                        $scope.LoadComplete($('#searchIndicator'))
                    }
                })
                //GetMineIntentsJson(scope, type, indicator)

            },
            error: function (xhr, status) {
                alert("Error GetMineIntentsView");
            },
            complete: function () {
               // indicator.addClass('hidden');
               // indicator.removeClass('EndlessSpin');
            }
        })
    }


    

    $scope.pushModelsOrigin = function(item){
      $scope.ModelsOrigin.push(item)  
      $scope.$apply();
    }
    $scope.pushModelsProgress = function(item){
      $scope.ModelsProgress.push(item)  
      $scope.$apply();
    }
    $scope.Categories = categories;
   // $scope.Types=types;
    $scope.Months = months;
    $scope.Years = years;
    $scope.statusCreating;  
    $scope.MissionStage = MissionStage;
    $scope.InterplayStage=InterplayStage;
    
    $scope.MissionTypeFilter=types.quicklist;
    
    $scope.currentSuggestType;
    $scope.InterplayStage=InterplayStage;
    $scope.PeopleGroup=PeopleGroup;
    $scope.creatingTypeMission=null;
    $scope.currEditioningScope; //scope который редактируем (все свойства из MissionController)
    $scope.PageItemMission;
    $scope.types = types;
    $scope.typesArr = typesArr;
    
    $scope.CleanMissionEmptyTemplate = function (index) {
        // alert($scope.PureMissionEmptyTemplates[index - 1].Name)
        var clone = JSON.parse(angular.toJson($scope.PureMissionEmptyTemplates[index - 1]));
       
        $scope.MissionEmptyTemplates[index - 1] = clone;
       // $scope.$apply();
    }

    $scope.FillMissionsRandomExample = function (item) {
        $scope.MissionsRandomExample.push(item);
    }

    $scope.FillMyIntentsArray = function (item) {
        
        $scope.MyIntentsArray.push(item);
        
    }

    $scope.RemoveFromMyIntentsArrayById = function (removedIntentId) {

        
        $scope.fillingArray.forEach(function (item, i, arr) {
            if (item.Id == removedIntentId) { arr.splice(i, 1);}
        })
        
    }

    $scope.ClearMyIntentsArray = function () {

        $scope.MyIntentsArray.length=0;

    }
    

    $scope.ClearMissionsRandomExample = function () {
        $scope.MissionsRandomExample.length = 0;
    }
   /* $scope.randomExample = function(){        

        $scope.ModelsExample.length=0;
        
        var arr = [];
    $scope.$apply(); 
        
    var count=0;
    var ql=0;
    var rd=0;
    var rg=0;
    var ch=0;
        
         var rand1 ;
         var rand2 ;
          var rand3 ;
           var rand4 ;
        
    while (count!=4)
    {
        if (ql==0){ rand1 = Math.floor(Math.random()*(modelsProgress.length - 1) + 0);}
        if (rd==0){ rand2 = Math.floor(Math.random()*(modelsProgress.length - 1) + 0);}
        if (rg==0){ rand3 = Math.floor(Math.random()*(modelsProgress.length - 1) + 0);}
        if (ch==0){ rand4 = Math.floor(Math.random()*(modelsProgress.length - 1) + 0);}
        
        
        
        
        if (ql==0 && modelsProgress[rand1].originMission.type ==types.quicklist) {ql=1; arr.push(modelsProgress[rand1])}
        if (rd==0 && modelsProgress[rand2].originMission.type ==types.challenge) {ch=1; arr.push(modelsProgress[rand2])}
        if (rg==0 && modelsProgress[rand3].originMission.type ==types.regular) {rd=1; arr.push(modelsProgress[rand3])}
        if (ch==0 && modelsProgress[rand4].originMission.type ==types.remind) {rg=1; arr.push(modelsProgress[rand4])}
        
        count=ql+ch+rd+rg;
alert(count)
  
}
 

        
       $scope.ModelsExample.concat(arr);
        
       $scope.$apply(); 
    }*/
    
    $scope.getEmptyTemplates = function () {
        
        
        $.ajax({
            url: '/Mission/GetEmptyTemplates',
            type: "GET",
            contentType: false,
            dataType: 'json',
            //data: JSON.stringify({ newMission: newMission, newSteps: tasks, uniqueCategories: categories }),
            success: function (json) {
               // $(element).removeAttr('disabled');
                //indicator.addClass('hidden');
                //indicator.removeClass('EndlessSpin');
                //json - это массив объектов Mission ( по одному от каждого типа)
                var missionEmptyTemplates = JSON.parse(json);
                //выводим 
                //очищаем массив

                
                $scope.MissionEmptyTemplates.length = 0;
                $scope.PureMissionEmptyTemplates.length = 0;

                missionEmptyTemplates.forEach(function (item, i, arr) {
                    var clone = JSON.parse(angular.toJson(item));
                   // var clone2 = makeClone(item, template);
                    
                    $scope.MissionEmptyTemplates.push(item);
                    $scope.PureMissionEmptyTemplates.push(clone);
                    
                })
                
                
                $scope.$apply()
                $scope.LoadComplete();
                //alert($scope.MissionEmptyTemplates.length)
            },
            error: function (response) {
                alert("error")
                   // $(element).removeAttr('disabled');
                //indicator.addClass('hidden');
                //indicator.removeClass('EndlessSpin');
           }//,
            //done {}
        })
    }
    
    
       //Всплывающие PopUps
    $scope.tits2 = function (e) {
       
        $(e.target).popover('toggle')
        e.preventDefault();
    }
    
    
    
    
    
    
    
    
        
    $scope.openCollapsed=function(isCollapse, type){
        
       // alert("op")
       if (isCollapse==false){return false}
        
      setTimeout(function(){ $scope.$broadcast('EventOpenMission', {type: type});},200)
        /*
        $scope.$on('EventOpenMissionComplete', function (e) {
               clearInterval(timer);
            
            //Добавить очистку события off
            })
        
        //Нужно слать, пока не прорендериться view
     // timer= setInterval(function(){
            
          //  $scope.$broadcast('EventOpenMission', {type: type});
            
       // }, 50)
         
           timer= setTimeout(function(){
            
            $scope.$broadcast('EventOpenMission', {type: type});
            
        }, 350)
        */
    }
      
    $scope.SetCurrEditioningScope = function (value) {
        $scope.currEditioningScope = value;
        $scope.$apply();
    }
        
    $scope.changeMissionTypeFilter = function (type) {
       $scope.MissionTypeFilter = type;
       $scope.$apply();
   }

    
    
    
    
    
    
    //Переход в конкретное намерение на редактирование
    $scope.setItemMissionForView = function (NeedCollapse, id, arr, typeAbr) {
        var index = 0;
        var timer;
        
        if (id!=undefined){ //Ищем по ID
        //Ищем необходимый Mission В массиве
        arr.forEach(function (item, i, arr) {
            if (item.originMissionId == id) {
                index = i;
            }
        })
        }
        
        
        if (typeAbr!=undefined) //Ищем по типу
            {
             arr.forEach(function (item, i, arr) {
            if (item.originMission.type.abr == typeAbr) {
                index = i;
                }
                })      
            }
        
        
       $scope.$on('EventSetItemMissionComplete', function (e) {
               clearInterval(timer) 
               
               //Добавить очистку события off
            })
      
        // послылка сообщения пока не будет отрендерено view
       timer= setInterval(function() {
            $scope.$broadcast('EventSetItemMission', {
                mission: arr[index],
                NeedCollapse: NeedCollapse
            });
        }, 10)
    }
    
    
    
    
   //Маршрутизация - перед сменой маршрута
    $scope.$on("$routeChangeStart", function (event, next, current) { 
    //alert(next.$$route)
        
        if (next.$$route==undefined){event.preventDefault();} //сли маршрут не задан явно, то ничего не делаем!
        
    
    })
    
    
    
    //Маршрутизация - после смены маршрута
    $scope.$on("$routeChangeSuccess", function (event, next, current) {
      
        
        //Object { params: Object, pathParams: Object, $$route: Object, loadedTemplateUrl: "Creating Mission/Creating Mission.html", locals: Object }
        if ((next.loadedTemplateUrl=='Creating Mission/Creating Mission.html' && $routeParams["currentTypeCreate"]==undefined) || ($scope.MissionTypeFilter==undefined)){
            
           var currentTypeCreate= $routeParams["currentTypeCreate"];
            
            if (currentTypeCreate!=undefined)
                {
            $scope.MissionTypeFilter=types[currentTypeCreate];
            $scope.openCollapsed(true, types[currentTypeCreate]);                               

                }
            else{
            $scope.MissionTypeFilter=types.quicklist;
            $scope.openCollapsed(true, types.quicklist);                               
                
            }
        }
            
            
            
        var missionTypeFilterAbr = $routeParams["missionTypeFilterAbr"]
        var currentTypeCreate = $routeParams["currentTypeCreate"]
        var missionId = $routeParams["missionId"]
            //Если открыли страницу Моих Mission
            //Если есть параметр, то вызываем метод
        if (missionTypeFilterAbr != undefined) {
            $scope.changeMissionTypeFilter(types[missionTypeFilterAbr])
        }
        //Если открыли страницу создания/редактирования
        if (currentTypeCreate != undefined) {
             $scope.openCollapsed(true, types[currentTypeCreate]);           
            
        }
        //Если есть параметр, то вызываем метод
        if (missionId != undefined) {
            $scope.setItemMissionForView(true, parseInt(missionId), $scope.ModelsProgress)
        }
    })    
       //Срабатывает перед событием routeChangeSuccess
   /*    $scope.$on('$locationChangeStart', function(event, next, current) {
     
       });*/

    $scope.SetStatusCreating = function(status){
       $scope.statusCreating=status;  
    }
  
    $scope.sufficsCtrl = function(text, count){
    var LastDigit = count % 10;
    var Last2Digits = count % 100;
   /* if (text=="категория"){
        if (LastDigit ==1 && Last2Digits!=11){ return "категория"}
              
              
        if (LastDigit==0||LastDigit==5||LastDigit==6||LastDigit==7||LastDigit==8||LastDigit==9 || Last2Digits==10|| Last2Digits==11|| Last2Digits==12 || Last2Digits==13 || Last2Digits==14 || Last2Digits==15 || Last2Digits==16 || Last2Digits==17 || Last2Digits==18 || Last2Digits==19 || Last2Digits==20){return "категорий"}
           
        if (LastDigit ==2 || LastDigit ==3 || LastDigit ==4){return "категории"}
    }*/
    
    if (text=="разы"){
        if (LastDigit ==1 && Last2Digits!=11){ return "раз"}
              
              
        if (LastDigit==0||LastDigit==5||LastDigit==6||LastDigit==7||LastDigit==8||LastDigit==9 || Last2Digits==10|| Last2Digits==11|| Last2Digits==12 || Last2Digits==13 || Last2Digits==14 || Last2Digits==15 || Last2Digits==16 || Last2Digits==17 || Last2Digits==18 || Last2Digits==19 || Last2Digits==20){return "раз"}
           
        if (LastDigit ==2 || LastDigit ==3 || LastDigit ==4){return "раза"}
    }
        
      
      
    /*if (text=="день"){
    if (LastDigit ==1 && Last2Digits!=11){ return "день"}
          
    if (LastDigit==0||LastDigit==5||LastDigit==6||LastDigit==7||LastDigit==8||LastDigit==9 || Last2Digits==10|| Last2Digits==11|| Last2Digits==12 || Last2Digits==13 || Last2Digits==14 || Last2Digits==15 || Last2Digits==16 || Last2Digits==17 || Last2Digits==18 || Last2Digits==19 || Last2Digits==20){return "дней"}
          
          
     if (LastDigit ==2 || LastDigit ==3 || LastDigit ==4){return "дня"}
      }*/
    
     /*if (text=="неделя"){
    if (LastDigit ==1 && Last2Digits!=11){ return "неделя"}
          
    if (LastDigit==0||LastDigit==5||LastDigit==6||LastDigit==7||LastDigit==8||LastDigit==9 || Last2Digits==10|| Last2Digits==11|| Last2Digits==12 || Last2Digits==13 || Last2Digits==14 || Last2Digits==15 || Last2Digits==16 || Last2Digits==17 || Last2Digits==18 || Last2Digits==19 || Last2Digits==20){return "недель"}
          
          
     if (LastDigit ==2 || LastDigit ==3 || LastDigit ==4){return "недели"}
      }*/

      

  }
  
      
})  
      





