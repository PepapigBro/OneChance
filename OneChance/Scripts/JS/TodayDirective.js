var onechanceApp = angular.module("onechanceApp");


onechanceApp.directive('showBtnsControlForTask', function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            
            var context = $(element).closest("a");
          //  alert("show1")
            
                var btnsConfirm = $(".BtnsDoneConfirm", context);
                btnsConfirm.toggleClass("ShowBtn");
              //  alert("show2")
               // if ((context.hasClass("ItsForget") == false) & (context.hasClass("ItsDone") == false)) {
               //   }
                
            /* Поле ввода реального количества объема*/
                var input = $(".InputRealVolume", context);
            //    alert("show3")
           // input.selectText(); //Самописная функция
           // input.focus();

           // input.focusout(function () {
           //     if (input.text() == "") { input.text("35") }
           // })

        })
    }
})

onechanceApp.directive('closeBtnsControlForTask', function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {

            var context = $(element).closest("a");
            var btnsConfirm = $(".BtnsDoneConfirm", context);
            btnsConfirm.toggleClass("ShowBtn");


        })
    }
})


function wellDoneTask(context) {
    
    var btnsConfirm = $(".BtnsDoneConfirm", context);
    var ContentOfTask = $(".ContentOfTask", context);
    var taskName = $(".ItemTaskName span", context);

    btnsConfirm.toggleClass("ShowBtn");

 //   taskName.addClass("StrikeAble");
    //Если задание полностью выполнено
   // context.addClass("ItsDone");
}

function cancelTask(context) {
    
    
    var ContentOfTask = $(".ContentOfTask", context);
    var taskName = $(".ItemTaskName span", context);

    btnsConfirm.toggleClass("ShowBtn");
   // context.addClass("ItsForget");
    taskName.addClass("ItsForget");
}


onechanceApp.directive('completeTask', function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            
            var context = $(element).closest("a");
            var btnsConfirm = $(".BtnsDoneConfirm", context);
            var ContentOfTask = $(".ContentOfTask", context);

            btnsConfirm.toggleClass("ShowBtn");
            var result = attrs['completeTask']
            
           // alert(result)

            var inputVolume = $('.InputRealVolume', context);
            
            $.ajax({
                url: '/Intent/CreateTask',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ intent: scope.stepOfMission.Mission.Intent, stepOfMission: { Id: scope.stepOfMission.Id, MissionId: scope.stepOfMission.MissionId, TaskOfIntent: null, Count: scope.stepOfMission.Count, Type: scope.stepOfMission.Mission.Type }, value: inputVolume.val(), result: result }),
                success: function (json) {//получаем созданный или измененный taskOfIntent
                    var taskOfIntent = JSON.parse(json);                    
                    
                    scope.stepOfMission.TaskOfIntent = taskOfIntent;

                    if (scope.stepOfMission.TaskOfIntent.Result == Results.PartialDone || scope.stepOfMission.TaskOfIntent.Result == Results.Done) {
                        var taskName = $(".ItemTaskName span", context);
                        taskName.addClass("StrikeAble");
                        ContentOfTask.addClass("ItsDone");

                        if (scope.stepOfMission.TaskOfIntent.Result == Results.PartialDone) {
                            setTimeout(function () { taskName.removeClass("StrikeAble"); ContentOfTask.removeClass("ItsDone"); }, 2000)
                        }
                    }
                    scope.$apply();
                },
                error: function (response) { alert("error Create Task Of Intent AAA") },
                complete: function () {}
            })

        })
    }
})





//onlyCurrentType: currentPageType
onechanceApp.filter('StepOfMissionFilter', function () {
    return function (items, typeCriteria, typeOfTaskOfIntent) {
    
        var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
     //var t = typeOfTask & item.TaskOfIntent.Result;    
     //alert(item.TaskOfIntent.Result + "-----" + typeOfTask + " ------ " + t );
      //alert(item.TaskOfIntent.Result & typeOfTask);
      if ((item.Name != "" && item.Name != undefined && item.Name != null)) // && ((item.TaskOfIntent.Result & typeOfTaskOfIntent) > 0)
      {
         
         // alert(item.TaskOfIntent.Result & typeOfTask);
        filtered.push(item);
      }
    }
    
    return filtered;
  };
});


