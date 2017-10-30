var onechanceApp = angular.module("onechanceApp");



onechanceApp.controller("MissionController", function($scope) {
  
 //   $scope.itemMission;
 //if ($scope.itemMission == undefined) {$scope.itemMission = nullRemindProgress;} //Для календаря
    
     
// $scope.Mission = $scope.itemMission.originMission; // это получили из представления через pageController
 //$scope.items = $scope.itemMission.originMission.items;
 //$scope.weeks = $scope.itemMission.originMission.weeks;
 //$scope.days = $scope.itemMission.originMission.days;

    
    
$scope.months = months;
 $scope.years = years;
 $scope.currentCategory;
 $scope.currentWeek;
 $scope.currentMonth;
 $scope.currentYear;
 $scope.currentDay;
 $scope.countDaysInMonth;
 $scope.isExisting = false;
 $scope.suffics = "";
 $scope.MissionOpened = false;
 $scope.Countdays = 30;
 $scope.SortType = '';
 $scope.suffics="Hohoho";
 $scope.UniqueArrayScrollPanel; //передается по ссылке
 $scope.ExistingItemCategory = null; //Сюда заносится название категории при создании новой задачи, если она уже существует
 $scope.itemsCountAtConcreteCategory = 0;
 
   $scope.UpdateScroll=function(){
       
       $scope.$broadcast("EventChangeOriginalArray", {
                        name: "111"
                    })
   }
    
   $scope.InitializeCategory = function () {
      
       $scope.$broadcast('EventInitializeCategory'); //Послыаем сообщение на формирование категорий и списков
   };
    

  


    $scope.SetSuffics= function(value){
        $scope.suffics=value;
    }
    
    $scope.UpdateStatScope = function (source, data) {        
        $scope.$broadcast("UpdateStatScope", { source: source, data: data });
    };



    //$scope.$on("UpdateStatScope", function (event, data) {
    //    alert("ffff");
    //})
    
    $scope.RepeatsAndCountControl = function (stepOfMission) {
       // alert(scope.mission.StepOfMissions.Count)
        if (stepOfMission.Count != null && stepOfMission.Count != 0) { stepOfMission.Repeats = 1; } else { stepOfMission.Repeats = null; }
    }   
    
    $scope.ChangeSortType = function () {
        if ($scope.SortType == '') {
            $scope.SortType = 'count';
            return;
        }
        if ($scope.SortType == 'count') {
            $scope.SortType = '-count';
            return;
        }
        if ($scope.SortType == '-count') {
            $scope.SortType = '';
            return;
        }
    }
    

    //(Mission.items, 'day', $parent.currentDay.day)
  /*  $scope.getCountElementInCategory = function(arr, prop, name){
        if ($scope.itemMission.originMissionOpened==false){return false}
       
        var count=0;
        arr.forEach(function (item, i, arr) {
            if (item[prop]==name && item.name!=""){count=count+1;}
            if (name=="Все позиции") {count=count+1;}
            
        })
        
        return count;
    }*/
    
    $scope.setUniqueArrayScrollPanel=function(arr){
      $scope.UniqueArrayScrollPanel = arr;   
    }
    


    $scope.ShowSuggestWindow = function () {
        $('#modalSuggest').modal({ show: true });
    }

        
    $scope.sufficsCtrlMonth = function(month){
        if (month==undefined){return false}
        month=month.toLowerCase();
        if (month=="январь"){month="января"}
        if (month=="февраль"){month="февраля"}
        if (month=="март"){month="марта"}
        if (month=="апрель"){month="апреля"}
        if (month=="май"){month="мая"}
        if (month=="июнь"){month="июня"}
        if (month=="июль"){month="июля"}
        if (month=="август"){month="августа"}
        if (month=="сентябрь"){month="сентября"}
        if (month=="октябрь"){month="октября"}
        if (month=="ноябрь"){month="ноября"}
        if (month=="декабрь"){month="декабря"}
        return month;
    }
    
    
    
    
    $scope.SetNewScrollAndCurrent = function (newDate) {
        $scope.$broadcast('EventNewScrollAndCurrent', newDate);
    };
      
                 
    
    $scope.SetMissionOpened=function(val){
        MissionOpened=val;
    }
    
   
                                    
    $scope.SetcountDaysInMonth=function(value){
        $scope.countDaysInMonth = value;    
    }
    
                    
    
 
    $scope.changeCurrent = function(item, type){   
        $scope[type]=item;
        
    }
    

    //$scope.applyMission = function () {
    //    $scope.$apply();
    //    alert("eee");
    //}
    
    //$scope.updateRepeatDay = function () {
    //    var t = $scope.currentYear;
    //    $scope.currentYear = $scope.currentYear+1;
    //    $scope.$apply();
    //    $scope.currentMonth = t;
    //    $scope.$apply();
        
    //}

    $scope.removeRemindItem = function (item, $event)
    {
        
        var currentDate = new Date($scope.currentYear.year, $scope.currentMonth.month - 1, item.DateStart.getDate());
      
        //Убираем выделение дня, если он принадлежит текущему месяцу и году
        //if (
        //    (((item.DateStart.getMonth() + 1) == $scope.currentMonth.month) && (item.DateStart.getFullYear() == $scope.currentYear.year))
        //    ||
        //    (
        //     (item.Repeats == null & item.DateStart >= currentDate & item.DateStart.getDate() == currentDate.getDate()))

        //    )
        //{
            
        var context = $($event.target).closest('.ContentMission');
            var neededDay = $("div[add-remove='" + item.DateStart.getDate() + "']", context);
            var isrepeat = $("div[add-remove='" + item.DateStart.getDate() + "'] .RepeatS", context);
            neededDay.removeClass('Mark');
            isrepeat.removeClass('StaticShow');

        
            
            $scope.mission.StepOfMissions.splice($scope.mission.StepOfMissions.indexOf(item), 1);
            return false;
      //  }
    }

    //функция удаления элемента из модели    
    $scope.removeItem = function (item) {
        if (confirm('Подтвердите удаление "' + item.Name.Text + '"')) {
            // TODO:  Do something here if the answer is "Ok".
            
            //alert(itemIndex+)S
            $scope.mission.StepOfMissions.splice($scope.mission.StepOfMissions.indexOf(item), 1);
            
        }
    }

       //функция добавления элемента в модель
   $scope.addItem = function (item, index) {
       $scope.itemsArr.splice(index, 0, item);
   }
    
    
    
    //функция проверки существования элемента
//!!!!    //Добавить разные проверки для quicklist, challenge, regular
    //$scope.checkExisting = function(nameNewItem, categoryName) {  
       $scope.checkExisting = function (nameNewItem, categoryName) {
           
           var ExistingElement = IsEnabled(nameNewItem, $scope.mission.tasks, categoryName);
           
           if (ExistingElement == null) {
               return false;
           }
           else {
               if ('category' in ExistingElement) {
                   $scope.ExistingItemCategory = ExistingElement.category;
               }
               return true;
           }
       }

    //функция меняет поле isRemind на противоположное
    $scope.ChangeRemindOption = function (item) {
        //alert(item.name);
        item.isRemind = !item.isRemind;
    }
    

    

})