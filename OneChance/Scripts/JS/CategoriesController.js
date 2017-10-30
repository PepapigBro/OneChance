var onechanceApp = angular.module("onechanceApp");

onechanceApp.controller("CategoriesController", function($scope, $timeout){
     $scope.Type;
     $scope.currentItem=0;
     $scope.scrollPosition=0;
    
     $scope.itemsArr=[]; //массив уникальных категорий для конкретного Mission
    
     //Подписываемся на событие открытия окна подробностей Mission`а
     //Нужна ли подписка определяется директивой needEventAboutOpened
     $scope.$on('EventNewScrollAndCurrent', function(e, newData){ 
       //  alert("newScroll" + "  "+ $scope.Type)
        // alert($scope.Type)
         // var prevScrollPosition = $scope.scrollPosition;
         
          $timeout(function(){
              
                  if ($scope.Type=="currentYear"){
                     //newData - это формат Date в текущем случае
                      for (var i=0; i<$scope.years.length; i++){
                      if ($scope.years[i].year==newData.getFullYear()){$scope.currentItem=i; break;}
                      }
                      }
                    if ($scope.Type=="currentMonth"){   
                      $scope.currentItem=newData.getMonth();     
                      }
              
                    if ($scope.Type=="currentCategory"){   
                      $scope.currentItem=newData.number;
                      }
              
                    if ($scope.Type=="currentWeek"){                  
                      $scope.currentItem=newData.number;
                      }

                  if ($scope.Type=="currentDay"){   
                      
                      $scope.currentItem=newData.number;
                      }

                $scope.scrollPosition=$scope.currentItem;
              
          }, 0) 
           
    });
            
     //Функция вызывается при нажатии стрелок Назад и Вперед
     $scope.changeScroll = function (iterator, max) {
        if ((iterator == -1) & ($scope.scrollPosition > 0)) {
            $scope.scrollPosition = $scope.scrollPosition + iterator;
        }
        if ((iterator == 1) & ($scope.scrollPosition < max)) {
            $scope.scrollPosition = $scope.scrollPosition + iterator;
        }
    }
  
    
});