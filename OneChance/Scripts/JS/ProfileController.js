var onechanceApp = angular.module("onechanceApp");

onechanceApp.controller("ProfileController", function($scope){
  //  $scope.Type;
    $scope.User = {
        Name: null,
        Surname: null,
        isFemale: null,
        AvatarPath: null,
        Country: null,
        Sity: null,
        PhoneNumber: null,
        Language: null
    }
    
    $scope.$on('SetUserDataEvent', function (event, User) {
        
        $scope.User = User;
        $scope.$apply();

    })


   $scope.SendToServer = function () {
      
       var data = new FormData();
       var files = document.getElementById('upload_avatar').files;
       if (files.length > 0) {
 
          
           data.append("file", files[0]);
           //data.append("UserId", Userid);
 
           $.ajax({
               type: "POST",
               url: '/Profile/UploadImageAvatar',
               contentType: false,
               processData: false,
               data: data,
               success: function (json) {
                   var image = document.getElementById('avatar');
                   var rand =( new Date()).toString();
                  
                   image.setAttribute("src", json + "?" + rand); //путь остается прежним у картинки, поэтому чтобы она обновилась нужно изменить путь
                  
               },
               error: function (xhr, status, p3) {
                   alert("bad");
                  
               }
           });
       } else {
           alert("Браузер не поддерживает загрузку файлов HTML5!");
       }
 
 
   }
    //$scope.fillingArray = [];
   
})

onechanceApp.directive('saveProfileToDb', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {

            $.ajax({
                url: '/Profile/SaveChanges',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data:  JSON.stringify({ user: scope.User }),//JSON.stringify({ newMission: origMission, newSTeps: origMission.StepOfMissions, uniqueCategories: categories }),
                success: function (json) { //Получаем в ответ ID созданной миссии
                    //  var createdMission = JSON.parse(json);
                    //Появляющаяся на пару секунд метка Сохранено
                    var context = $(element).closest('#profile');
                    var LabelAdded = $('.Added', context)

                    LabelAdded.addClass('ShowSometime');
                    setTimeout(function () {
                        LabelAdded.removeClass('ShowSometime')
                    }, 2000)
                },
                error: function (response) {
                  //  alert(response + "Error")
                },
                complete: function () {
                    
                   // $(element).removeAttr('disabled');
                   // indicator.addClass('hidden');
                   // indicator.removeClass('EndlessSpin');
                }
            })

        })
    }
})



onechanceApp.directive('changeAvatar', function () {
    return function (scope, element, attrs) {
        element.on('change', function () {
            // document.getElementById('upload_name').value = this.value;
             scope.SendToServer();
            
        })
    }
})

