var onechanceApp = angular.module("onechanceApp");

onechanceApp.filter('onlySuggested', function () {
    return function (items, currType) {
        // Create a new Array
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (
                (item.PartnerId != "") && ((item.InterplayStage % 2 == 0 && currType == "Received") || (item.InterplayStage % 2 != 0 && currType == "Sent") || (currType == undefined || currType == ""))) {
                filtered.push(item);
            }
        }
        // boom, return the Array after iteration's complete
        return filtered;
    };
});

onechanceApp.directive('changePartnerStatus', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            
           var statusToChange = attrs['changePartnerStatus'];
            var currentStatus = scope.itemMission.InterplayStage;

            if (InterplayStage[statusToChange]==InterplayStage.ImDeleted) {scope.itemMission.PartnerId=""}
            else {scope.itemMission.InterplayStage = InterplayStage[statusToChange];}
            scope.$apply();
            
        })
    }
})



onechanceApp.directive("cantFocus", function () {
    return function (scope, element, attrs) {
        element.on('focus', function (event) {
            
            if ($(element).attr('readonly')=='readonly') { event.stopPropagation(); $(element).blur(); return false; }
        })
    }
})



onechanceApp.directive("switchEdit", function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            
            var context = $(element).closest(attrs['switchEdit'])
            var inputs = $('input', context);
            //alert(inputs.eq(0).attr('readonly'))
            if (inputs.eq(0).attr('readonly') == 'readonly') {

                $(element).removeClass('glyphicon-pencil');
                $(element).addClass('glyphicon-ok');
                $(element).css('opacity', '1')
                inputs.css('border', '1px solid gray');
                inputs.css('cursor', 'text');
                inputs.removeAttr('readonly')
                inputs.eq(0).focus();
                
                //inputs.on('blur', function () {

                //})
            }
            else {
                
                $(element).removeClass('glyphicon-ok');
                 $(element).addClass('glyphicon-pencil');
               // $(element).addClass('glyphicon-transfer');
                
                inputs.css('border', '0px');
                $(element).css('opacity', '0.5')
                inputs.css('cursor', 'pointer');
                inputs.attr('readonly', 'readonly')
            }
            
        })
    }
})

onechanceApp.directive("addMissionToMineIntents", function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {

            var divBlock = $(element).closest('div.outer');
            var index = divBlock.attr('index');
            var context = $(element).closest('.ItemMission');
            var indicator = $('.indicator', context);
            indicator.removeClass('hidden');
            indicator.addClass('EndlessSpin');

            $.ajax({
                url: '/Intent/CreateIntent',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ intent: { MissionId: scope.mission.Id } }),
                success: function (json) { //возвращается миссия

                    //  scope.fillingArray[index] = JSON.parse(json);
                    // scope.mission = JSON.parse(json);
                    scope.UpdateStatScope('mission', JSON.parse(json));
                    scope.ChangefillingArray(scope.mission, JSON.parse(json));
                    //scope.ChangefillingArrayByIndex(index, scope.mission);
                    //  scope.$apply();
                    //scope.UpdateStatScope('mission', JSON.parse(json));
                },
                error: function (response) {
                    alert("error Create Intent")
                    // $(element).removeAttr('disabled');
                    // indicator.addClass('hidden');
                    // indicator.removeClass('EndlessSpin');
                },
                complete: function () {

                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })

        })
    }
})

onechanceApp.directive("removeMissionAtMineIntents", function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {

            //var index = attrs['removeMissionAtMineIntents']

            var isRemoveForever = attrs['removeMissionAtMineIntents']

            var divBlock = $(element).closest('div.outer');
            var index = divBlock.attr('index');

            var context = $(element).closest('.ItemMission');

            var indicator = $('.indicator', context);
            indicator.removeClass('hidden');
            indicator.addClass('EndlessSpin');

            $.ajax({
                url: '/Intent/RemoveIntent',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ mission: scope.mission, isRemoveForever: isRemoveForever }),
                success: function (json) {
                    //var mission = JSON.parse(json);
                    scope.UpdateStatScope('mission', JSON.parse(json));
                     
                    scope.ChangefillingArray(scope.mission, JSON.parse(json));
                  //  if (scope.mission.Intent != null && scope.mission.Intent.State != null) { alert("1"); scope.ChangefillingArrayByIndex(index, scope.mission); }// scope.fillingArray[index] = mission }
                   // else {
                        
                        //scope.fillingArray.splice(scope.fillingArray.indexOf(scope.intent), 1);                      
                  //      scope.RemoveFromfillingArray(scope.mission);
                   // }
                    // scope.$apply();
                },
                error: function (response) {
                    alert("error Create Intent")
                    // $(element).removeAttr('disabled');
                    // indicator.addClass('hidden');
                    // indicator.removeClass('EndlessSpin');
                },
                complete: function () {

                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })

        })
    }
})



onechanceApp.directive("changeIntentState", function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            var state = attrs['changeIntentState']

            var context = $(element).closest('.ItemMission');




            var indicator = $('.indicator', context);
            var divBlock = $(element).closest('div.outer');
            var index = divBlock.attr('index');
            indicator.removeClass('hidden');
            indicator.addClass('EndlessSpin');

           // var HeaderName = $('.Name', context);
           // HeaderName.css('background-color', "green")

            //Отправляем Миссии (те, что могут добавлять другие пользователи)
            $.ajax({
                url: '/Intent/ChangeState',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ intent: { Id: scope.intent.Id, MissionId: scope.intent.MissionId, UserId: scope.intent.UserId, State: States[state] } }),
                success: function (json) { //Получаем в ответ ID созданной миссии
                    // alert(index);
                    //scope.intent = parseInt(json);
                    //  alert(scope.fillingArray.length)




                    
                    // alert("sss")
                    scope.UpdateStatScope('intent', JSON.parse(json));
                    scope.UpdateStatScope('mission', scope.intent.Mission);
                   // scope.$apply();
                    // var HeaderName = $('.Name', context);
                   // HeaderName.css('background-color', "green")
                    scope.ChangefillingArray(scope.intent, JSON.parse(json));
                    //scope.$apply();
                    

                    // scope.$apply();

                    //scope.mission.StatOfMission.$apply();
                    //scope.$apply();


                    // var classM = missionDetails.attr('class');

                    //  
                    //   alert(scope.fillingArray.length)

                    // missionDetails.attr('class', classM)

                    //scope.$broadcast('EventInitializeCategory'); //Послыаем сообщение на формирование категорий и списков
                    //setTimeout(function(){
                    // var context = $(element).closest('.ItemMission');
                    // HeaderName.click();
                    //    HeaderName.click();
                    //}, 1000)
                    // missionDetails.collapse('show');
                    // listItemHeader.addClass('OpenedMission')
                    // HeaderName.addClass('OpenedMission')


                    //listItemHeader.addClass('OpenedMission')
                    //HeaderName.addClass('OpenedMission')


                },
                error: function (response) {
                    alert("error changeIntentState")
                },
                complete: function () {
                    // $(element).removeAttr('disabled');
                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })


        })
    }
})

onechanceApp.filter('TypeFilter', function () {
    //items - это массив состоящий из missionProgress
    return function (missions, missionTypeFilter) {
        var filtered = [];
        
        for (var i = 0; i < missions.length; i++) {
           // alert(missions[i].Type + "---" + missionTypeFilter.index)
            if (missions[i].Type == missionTypeFilter.index) { filtered.push(missions[i]); }

        }

        return filtered;
    }
})

onechanceApp.filter('MissionFilter', function () {
    //items - это массив состоящий из missionProgress
    return function (intents, missionTypeFilter, missionPropFilter) {
    var filtered = [];
   // alert("fff")
    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];      
       // alert(intent.Mission.Type + "---" + missionTypeFilter.name)
      //alert(missionTypeFilter.index + "---" + types.all.index + "---" + intent.Mission.Type )
      
      //MissionProps = { Active: 1, Done: 2, Added: 4, Paused: 8, Deleted: 16, Private: 32, Public: 64, Created: 128 };


      if (
          ((intent.Mission.Type == missionTypeFilter.index) || missionTypeFilter == undefined || missionTypeFilter.index == types.all.index)
         


          )
          //&& (missionPropFilter1==undefined || 
          //    (missionPropFilter1==MissionPropFilter.onlyIsDone && item.stage==MissionStage.Done)||
          //    (missionPropFilter1==MissionPropFilter.onlyIsPublic && item.IsPublicFor.value>1)||
          //    (missionPropFilter1==MissionPropFilter.onlyIsEntrusted && item.PartnerId!="" && item.stage==MissionStage.Active)||
          //    (missionPropFilter1==MissionPropFilter.onlyIsActive && item.stage==MissionStage.Active)||
          //    (missionPropFilter1==MissionPropFilter.onlyIsDeactive && item.stage==MissionStage.Paused)||
          //    (missionPropFilter1==MissionPropFilter.onlyIsDeleted && item.stage==MissionStage.Deleted)||
          //    
          //    (missionPropFilter1==MissionPropFilter.onlyIsAdded && (item.stage==MissionStage.Added || (item.InterplayStage==InterplayStage.ImAccepted && item.stage==MissionStage.Pending)))             
          //  
          //   )
         
         
          {
        filtered.push(intent);
      }
    }
    return filtered;
  };
});

 //ng-if="(item.category==$parent.currentCategory.category||currentCategory.category=='Все позиции') && $index>0 && item.name!=''" 

onechanceApp.filter('TaskFilterCategory', function () {
    //items - это массив состоящий из missionProgress
    return function (items, currentCategory, scope) {
    var filtered = [];
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        //item in mission.StepOfMissions
        //if (item.Name != null) {
        //    alert(item.Category.Name + "--" + item.Name.Text)
        //}
        //else { alert(item.Category.Name + "--" + item.Name) }
       // alert(currentCategory.Category.Name)
      var NameIsEmpty = true;
     
      if (item.Name != null) { if (item.Name.Text != "" && item.Name.Text != undefined) { NameIsEmpty = false; }}
      if (NameIsEmpty==false && i > 0 && (item.Category.Name == currentCategory.Category.Name || currentCategory.Category.Name == 'Все позиции'))
          {filtered.push(item); }
    }
    if (currentCategory.Category.Name=='Все позиции' && filtered.length==0) {scope.itemsCountAtConcreteCategory=-1}
        else {scope.itemsCountAtConcreteCategory = filtered.length;}
    return filtered;
  };
});


//" ng-if="item.day==currentDay.day && item.name!=''"

onechanceApp.filter('TaskFilterDay', function () {
    //items - это массив состоящий из missionProgress
    return function (items, currentDay, scope) {
    var filtered = [];
   
    for (var i = 0; i < items.length; i++) {
      var item = items[i];      
        
        if (item.Name!=undefined && item.day==currentDay.day)
          {filtered.push(item); }
    }
        
    scope.itemsCountAtConcreteCategory = filtered.length;
    return filtered;
  };
});



onechanceApp.directive('linkModal', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            //Посылаем сообщение на открытие модального окна, указываем какой тип модального окна открывать, передаем текущий scope           
            scope.$emit('OpenModal', {                
                windowName: attrs['linkModal'], //окно какой категории - регулярные, быстр список и пр
                currEditioningScope: scope,
                action: attrs['actionModal'] //окно какого типа - редактирование, создание и пр
            });
            
        })
    }
})

onechanceApp.directive('showStats', function () {
    return function (scope, element, attrs) {
        var canvas = element[0];
        //document.getElementsByClassName("example")[0];
        if (canvas.getContext) {
            // drawing code here
            var ctx = canvas.getContext('2d');
            var x = 0;
            while (x < canvas.width) {
                ctx.beginPath();
                ctx.strokeStyle = get_random_color();
                ctx.moveTo(x, 0) // перемещает "курсор" в позицию x, y и делает её текущей
                ctx.lineTo(x, canvas.height - 9)
                    //alert(get_random_color())
                ctx.stroke()
                x = x + 2;
            }
        }
        else {
            // canvas-unsupported code here
            alert("false")
        }
    }
})

onechanceApp.directive('scrollWhenClick', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            var index = 0;
            scope.UniqueArrayScrollPanel.forEach(function (item, i, arr) {
                
                    if (item.Category.Name == attrs['scrollWhenClick']) {
                        index = i
                    }
                })
                //Прокручиваем до него Горизонтальное меню
            scope.SetNewScrollAndCurrent({
                number: index
            });
        })
    }
})


onechanceApp.directive("saveToDbFromAjax", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            
            $(element).attr('disabled', 'disabled')
            var context = $(element).closest('.ItemMission');

            var indicator = $('.indicator', $(element));

            var timer = setTimeout(function () {
                indicator.removeClass('hidden');
                indicator.addClass('EndlessSpin');
            }, 1000)
            

            var origMission = scope.mission;
           // var tasks = [];
            var urlController;
           // var propSelect;
            var categories = [];

            if (typesArr[origMission.Type].abr == "quicklist") { urlController = '/Mission/CreateMissionQuicklist' }
            if (typesArr[origMission.Type].abr == "challenge") {urlController = '/Mission/CreateMissionChallenge' }
            if (typesArr[origMission.Type].abr == "regular") {urlController = '/Mission/CreateMissionRegular' }
            if (typesArr[origMission.Type].abr == "remind") { urlController = '/Mission/CreateMissionRemind' }

           
            
            //Создаем список уникальных имен категорий из объектов      
            //Проверяем - нужно ли добавлять категории. Если они обозначены как Category, то нужно. Если нет (например это название месяца)
            if (scope.UniqueArrayScrollPanel[0].Category != undefined) {
                scope.UniqueArrayScrollPanel.forEach(function (item, i, arr) {
                    //  alert(item.Category.Name);
                    categories.push(item.Category.Name)

                })
            }
            

            //Добавляем имя категории в отдельное поле для удобства дальнейшей обработки           
            origMission.StepOfMissions.forEach(function (item, i, arr) {
               // console.log(item)
                if (('CategoryName' in item) && (item.Category!=null)) {
                    item.CategoryName = item.Category.Name;
                }
                })
            
          //  origMission.StepOfMissions.forEach(function (item, i, arr) {
          //      alert(item.Repeats)
          //  })

            //Создаем ннамерения для создавшего пользователя (добавляем ему миссию)
            
            //Отправляем Миссии (те, что могут добавлять другие пользователи)
            $.ajax({
                url: urlController,
                type: "POST",
                contentType: 'application/json',
                dataType: "json",                    
                data: JSON.stringify({ newMission: origMission, newSTeps: origMission.StepOfMissions, uniqueCategories: categories }),
                    success: function (json) { //Получаем в ответ ID созданной миссии
                        var createdMission = JSON.parse(json);
                        
                        origMission.Id = createdMission.Id;
                        
                        
                        //Отправляем Интенты для создавшего пользователя (те, что придалежат конкретному пользователю и хранят его прогресс)
                        $.ajax({
                            url: '/Intent/CreateIntent',
                            type: "POST",
                            contentType: 'application/json',
                            dataType: "json",
                            data: JSON.stringify({ intent: { MissionId: origMission.Id } }),
                            success: function (json) {
                                
                                clearTimeout(timer);
                                var createdIntent = JSON.parse(json);
                               
                                createdIntent.Mission = createdMission;
                               
                                scope.FillMyIntentsArray(createdIntent);
                                
                                //Появляющаяся на пару секунд метка Сохранено
                                var LabelAdded = $('.Added', context )
                                
                                LabelAdded.addClass('ShowSometime');
                                setTimeout(function () {
                                    LabelAdded.removeClass('ShowSometime')
                                }, 2000)
                                
                             
                            },
                            error: function (response) {
                                alert("error Create Intent")
                                // $(element).removeAttr('disabled');
                                // indicator.addClass('hidden');
                                // indicator.removeClass('EndlessSpin');
                            },
                            complete: function () {
                                $(element).removeAttr('disabled');
                                indicator.addClass('hidden');
                                indicator.removeClass('EndlessSpin');
                            }
                        })
                    },
                    error: function (response) {
                        alert(response+ "Error")
                    },
                    complete: function () {
                        $(element).removeAttr('disabled');
                        indicator.addClass('hidden');
                        indicator.removeClass('EndlessSpin');
                    }
                })
                
            
            
        })
    }
})


onechanceApp.directive("refreshExamples", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {

            var indicator = $('.indicator', $(element));
            
            indicator.addClass('EndlessSpin');

            $.ajax({
                url: '/Mission/GetExamples',
                type: "GET",
                contentType: false,
                dataType: 'json',

                success: function (json) {
                    var missionsArray = JSON.parse(json);
                    scope.ClearMissionsRandomExample();

                    missionsArray.forEach(function (item, i, arr) {
                        //Нулевые не добавляем, т.к возникает дальше исключение
                        if (item != null && item != undefined) {
                            scope.FillMissionsRandomExample(item);
                        }
                    })

                    scope.$apply()
                },
                error: function (response) {
                    alert("error refreshExamples")
                },
                complete: function () {
                
            
                    indicator.removeClass('EndlessSpin');
                }
            })



        })
     }

})




//Получение примеров Миссий, находящихся в базе
onechanceApp.directive("getExamples", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            if (scope.MissionsRandomExample.length > 0) { return false; }//Если Примеры уже выведены, то ничего не делаем. Обновляем только по спец кнопке Обновить

           // $(element).attr('disabled', 'disabled')
            scope.ShowIndicator($(element));

            $.ajax({
                url: '/Mission/GetExamples',
                type: "GET",
                contentType: false,
                dataType: 'json',

                success: function (json) {
                    var missionsArray = JSON.parse(json);
                    scope.ClearMissionsRandomExample();

                    missionsArray.forEach(function (item, i, arr) {
                        //Нулевые не добавляем, т.к возникает дальше исключение
                        if (item != null && item != undefined) {
                            scope.FillMissionsRandomExample(item);
                        }
                    })

                    scope.$apply()
                },
                error: function (response) {
                    alert("error getExamples")
                },
                complete: function () {
                    scope.LoadComplete();
                }
            })

        }
        )
    }})

onechanceApp.directive("createNewMission", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            var context = $(element).closest('.ItemMission')
            var LabelMissionCreated = $('.MissionCreated', context);
            var clearCopy = cloneMission(scope.itemMission)
            modelsOrigin.push(clearCopy.originMission)
            modelsProgress.push(clearCopy)
            scope.$apply();
            LabelMissionCreated.addClass('ShowSometime5s') //Показываем надпись на 2 секунды
            setTimeout(function () {
                LabelMissionCreated.removeClass('ShowSometime5s')
            }, 5000)
        })
    }
})

//Очистка шаблона создания
onechanceApp.directive("clearMissionData", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            
            scope.CleanMissionEmptyTemplate(scope.mission.Type)
    
            scope.$apply();
            scope.openCollapsed(true, typesArr[scope.mission.Type]);
            
        })
    }
})

//Добавление элементов в категорию для quicklist и  challenge
onechanceApp.directive("addItem", function () {
    return function (scope, element, attrs) {
        element.on('submit', function () {
            
            var context = $(element).closest(".ItemMission");
            var inputName = $(element).children('input').eq(0);
            var text = inputName.val();
            
            if (text == "") { return false }
            text = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase(); //Делаем заглавной первую букву для красоты
            var categoryName = ""; //Имя категории, номер дня или недели
            if (scope.currentCategory != undefined) {
                categoryName = scope.currentCategory.Category.Name;
            }
            if (scope.currentDay != undefined) {
                categoryName = scope.currentDay.Category.Name;
            }
            if (scope.currentWeek != undefined) {
                categoryName = scope.currentWeek.week;
            }

           

            var ExistingElement = null;// IsEnabled(text, scope.mission.tasks, categoryName);
            
            var newStepOfMission = { Category: { Name: categoryName }, Name: { Text: text }, CategoryName: categoryName, Count: 1, Repeats: 1 }
            scope.mission.StepOfMissions.push(newStepOfMission);
            
            ////Если не существует, заносим его 
            //if (ExistingElement == null) {
                
         //       switch (scope.mission.Type) {
         //       case types.quicklist.index:
         //           ExistingElement = {
         //               id: 0
         //               , name: text
         //               , count: 1
         //               , category: scope.currentCategory.category
         //               , categoryId: 1
         //               , originMissionId: 0
         //           }
         //           break
         //       case types.challenge.index:
         //           ExistingElement = {
         //               day: scope.currentDay.day
         //               , name: text
         //               , value: ""
         //               , units: ""
         //               , repeats: "1"
         //           }
         //           break
         //       }
         //       scope.mission.tasks.push(ExistingElement);
         //   }
            ////Если  существует, увеличиваем количество
            //else {
                
         //       switch (scope.mission.type) {
         //       case types.quicklist:
         //           ExistingElement.count = ExistingElement.count + 1;
         //           break
         //       case types.challenge:
         //           ExistingElement.repeats = parseInt(ExistingElement.repeats) + 1;
         //           break
         //       }
         //   }




            inputName.val("");
            scope.$apply();
        })
    }
})






onechanceApp.directive("canGetOneMission", function () {
    return function (scope, element, attrs) {
        
        
        
        scope.$on('EventSetItemMission', function (e, data) {
            
            //отправляем обратное сообщение о том, что рендеринг завершен
            scope.$emit('EventSetItemMissionComplete')
            //Обновляем вручную переменные
            scope.mission = data.mission;
            scope.$apply();
            //alert(scope.itemMission.originMission.name)
            
            
            scope.openCollapsed(data.NeedCollapse, scope.itemMission.originMission.type);
                
            
           
        })
    }
})



onechanceApp.directive('focusMe', function ($timeout) {
    return {
        scope: { trigger: '=focusMe' },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === true) {
                    //console.log('trigger',value);
                    //$timeout(function() {
                    var input = element[0];
                    input.focus();
                    scope.trigger = false;

                    //input is the input element

                    //element[0].focus(); //sets focus to element
                    var val = input.value; //store the value of the element
                    input.value = ''; //clear the value of the element
                    input.value = val; //set that value back.  
                    
                   
                   // input.on('mousedown', function (e) { e.stopPropagation();})                   //});
                }
            });
        }
    };
});




onechanceApp.directive("fireWhenShow", function () {
    return function (scope, element, attrs) {
        
        
        scope.$on('EventOpenMission', function (e, data) {
            
           //alert(scope.mission.type.abr + "---"+data.type.abr)
            if (scope.mission.Type == data.type.index) {
           
                var collapsedMission = $('.MissionDetails', $(element));

               
                setTimeout(function () {
                    
                        collapsedMission.collapse('show');
                    }, 100) //Открываем с задержкой  
                    
                
                scope.$broadcast('EventInitializeCategory'); //Послыаем сообщение на формирование категорий и списков и календаря
                /*collapsedMission.on("show.bs.collapse", function () {
                    //отправляем обратное сообщение о том, что рендеринг завершен
                    scope.$emit('EventOpenMissionComplete'); 
                    collapsedMission.off("show.bs.collapse")
                })*/
            }
                
            
             
            
        })
        
    }
})

onechanceApp.directive("fireWhenMissionOpened", function () {
    return function (scope, element, attrs) {
        //Вешаем событие на родительский элемент, который будет срабатывать на .MissionDateils
        $(element).on("show.bs.collapse", $('.MissionDetails'), function () {
            if (scope.MissionOpened == false) {
                scope.$broadcast('EventNewScrollAndCurrent', new Date());  //Установка текущей даты
                scope.MissionOpened = true;
                scope.$apply();
            }
        })
        $(element).on("hidden.bs.collapse", $('.MissionDetails'), function () {
            // scope.MissionOpened = false;
        })
    }
})




//onechanceApp.directive("canAutoSets", function () {
//    return function (scope, element, attrs) {
//        $(element).on("shown.bs.modal", function () {
//            
//            // scope.MissionOpened = true;
//            scope.$broadcast('EventNewScrollAndCurrent', new Date()); //Установка текущей даты
//            //  scope.$apply();  
//            $(element).off("shown.bs.modal");
//
//        })
//    }
//})
//Для календаря при открытиии









onechanceApp.directive("setIsrepeat", function ($compile) {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            element.toggleClass('HiddenControl');
            if (element.hasClass('HiddenControl') == false) {
                element.parent('div').addClass('Mark')
            }
        })
    }
}) 

onechanceApp.directive("showDetails", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
           // alert("rrr")
            var context = $(element).closest(".ItemMission");
            var boxClass = attrs['showDetails'];
            var listItemHeader = $('.list-item-mission', context)
            var HeaderName=$('.Name', context);
            
            var box = $("." + boxClass, context);
            if (box.hasClass('in')) {
                box.collapse('hide');
                listItemHeader.removeClass('OpenedMission')
                HeaderName.removeClass('OpenedMission')
            }
            else {
                
                 scope.InitializeCategory(); 
                box.collapse('show');
                
                listItemHeader.addClass('OpenedMission')
                HeaderName.addClass('OpenedMission')
                
            }
            
            
        })
    }
})

//Добавление-удаление дат в Remind
onechanceApp.directive("addRemove", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            
            if (attrs['action'] == "false") { return false } 


            
                //Добавить проверку на сервере (пользователь создатель, не опубликовано)
                var IsClickRepeat = $(e.target).hasClass('Repeat'); // Если кликнули только на значок повторов
                var IsNeedRepeats = IsClickRepeat == true ? null : 0;
                var context = $(e.target).closest('div');
                var RepeatElement = $('.RepeatS', context)
                var IsExist = false;
                var index = -1;
                var ExistingElement = {
                    year: scope.currentYear.year
                    , month: scope.currentMonth.month - 1
                    , day: attrs['addRemove']
                }
                var currentDate = new Date(scope.currentYear.year, scope.currentMonth.month - 1, attrs['addRemove']);



                //проверяем есть ли уже такая дата
                scope.mission.StepOfMissions.forEach(function (item, i, arr) {
                    //if (typeof item.Date === "object") {  }
                    //else { } //В процессе преобразований дата может превратиться в число. Чтобы адекватно все работало, ставим проверку и если нужно, преобразуем строку в объект даты
                    item.DateStart = new Date(item.DateStart)

                    if ((item.DateStart.getDate() == ExistingElement.day) & (item.DateStart.getMonth() == ExistingElement.month) & (item.DateStart.getFullYear() == ExistingElement.year)) {
                        IsExist = true;
                        index = i;
                    }
                    if (item.Repeats == null & item.DateStart < currentDate & item.DateStart.getDate() == currentDate.getDate()) {
                        IsExist = true;
                        index = -1;
                    }
                })



                if (IsExist == false) {


                    scope.mission.StepOfMissions.push({
                        DateStart: new Date(ExistingElement.year, ExistingElement.month, ExistingElement.day)
                        , Repeats: IsNeedRepeats
                        , Name: { Text: ExistingElement.day }


                    });

                    // alert(IsNeedRepeats + "--" + attrs['addRemove'])
                    scope.$apply();
                    element.addClass('Mark');
                    if (IsClickRepeat) {
                        RepeatElement.addClass('StaticShow');
                    }
                }
                else {

                    if (index != -1) //Если пользователь пытается удалить дату, которая циклическая и назначена ранее
                    {
                        if (IsClickRepeat == true) {
                            if (scope.mission.StepOfMissions[index].Repeats == null) { scope.mission.StepOfMissions[index].Repeats = 0; }
                            else { scope.mission.StepOfMissions[index].Repeats = null; }
                            //scope.mission.StepOfMissions[index].Repeats = !scope.mission.StepOfMissions[index].IsRepeat;
                            if (scope.mission.StepOfMissions[index].Repeats == null) {
                                RepeatElement.addClass('StaticShow')
                            }
                            if (scope.mission.StepOfMissions[index].Repeats == 0) {
                                RepeatElement.removeClass('StaticShow')
                            }
                        }
                        else {
                            scope.mission.StepOfMissions.splice(index, 1);
                            element.removeClass('Mark');
                            RepeatElement.removeClass('StaticShow')
                        }
                        scope.$apply();
                    }
                    else {
                        var contextMission = $(element).closest('.MissionDetails');
                        var LabelDateMesage = $('.DateMesage', contextMission);
                        LabelDateMesage.addClass('ShowSometime5s')
                        var timer = setTimeout(function () {
                            LabelDateMesage.removeClass('ShowSometime5s');
                            timer = null
                        }, 5000)
                    }
                }

            
            //if (attrs['remoteRemove'] == 'true') {
            //    var context = $(element).closest('.Day')
            //    var dayOfMonth

            //}

        })




    }
})

//Тут програмно кликаются дни и для каждого уже вызывается addremove
onechanceApp.directive("addRemoveRange", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            var range = attrs['addRemoveRange']
            var context = $(element).closest('.ShDetails');
            var day;
            var selector;
            var isFull = true;
            //--------------Упростить код    
            switch (range) {
            case "month":
                for (var k = 1; k <= scope.Countdays; k++) { //Решаем, что нужно сделать-  добавить или убрать
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    var dayOfWeek = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, k)).getDay();
                    if (!day.hasClass('Mark')) {
                        isFull = false;
                    }
                }
                for (var k = 1; k <= scope.Countdays; k++) {
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    if ((!day.hasClass('Mark') & isFull == false) | (day.hasClass('Mark') & isFull == true)) {
                        day.click();
                    }
                }
                break;
            case "clearMonth":
                for (var k = 1; k <= scope.Countdays; k++) {
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    if (day.hasClass('Mark')) {
                        day.click();
//                        alert("lll")
                    }
                }
                
                break;
            case "holidays":
                for (var k = 1; k <= scope.Countdays; k++) { //Решаем, что нужно сделать-  добавить или убрать
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    var dayOfWeek = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, k)).getDay();
                    if ((dayOfWeek == 0 | dayOfWeek == 6) & (!day.hasClass('Mark'))) {
                        isFull = false;
                    }
                }
                for (var k = 1; k <= scope.Countdays; k++) {
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    var dayOfWeek = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, k)).getDay();
                    if (
                        ((!day.hasClass('Mark') & isFull == false) | (day.hasClass('Mark') & isFull == true)) & (dayOfWeek == 0 | dayOfWeek == 6)) {
                        day.click();
                    }
                }
                break;
            case "weekdays":
                for (var k = 1; k <= scope.Countdays; k++) { //Решаем, что нужно сделать-  добавить или убрать
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    var dayOfWeek = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, k)).getDay();
                    if ((dayOfWeek != 0 & dayOfWeek != 6) & (!day.hasClass('Mark'))) {
                        isFull = false;
                    }
                }
                for (var k = 1; k <= scope.Countdays; k++) {
                    selector = ".DaysOfWeek div[add-remove='" + k + "']";
                    day = $(selector, context);
                    var dayOfWeek = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, k)).getDay();
                    if (
                        ((!day.hasClass('Mark') & isFull == false) | (day.hasClass('Mark') & isFull == true)) & (dayOfWeek != 0 & dayOfWeek != 6)) {
                        day.click();
                    }
                }
                break;
            case "clearAll":
                scope.mission.tasks.length = 0;
                day = $(".DaysOfWeek div", context);
                day.removeClass();
                    
                 scope.$broadcast('EventNewScrollAndCurrent', new Date()); //Установка текущей даты   
                    
                break;
            }
        })
    }
})






/*onechanceApp.directive("keepSelectedItem", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {})
    }
})*/

onechanceApp.directive("repeatDay", function ($compile, $parse) {
    return function (scope, element, attrs) {
        scope.$watchGroup(['currentMonth', 'currentYear'], function (newVal) {
            if (scope.MissionOpened == false && attrs['repeatDay'] != "atOnce") {return false;}
            
           var template = $parse(attrs['repeatDay']);
           var arr =template(scope);
            
            scope.Countdays = 32 - new Date(scope.currentYear.year, scope.currentMonth.month - 1, 32).getDate();
            var skipDays = (new Date(scope.currentYear.year, scope.currentMonth.month - 1, 1)).getDay() - 1;
            if (skipDays == -1) {
                skipDays = 6
            }
            var childs = element.children();
            var firstDiv = childs.eq(childs.length - 1).clone();
            firstDiv.removeClass(); // удаляем все классы
            childs.remove();
            for (var i = 1; i <= skipDays; i++) {
                var newdiv = angular.element("<div></div>")
                newdiv.html("&nbsp;") //нужно добавить содержимое, т.к пустой элемент имеет другие стили
                newdiv.addClass("EmptyDay")
                element.append(newdiv);
            }
            for (var i = 1; i <= scope.Countdays; i++) {
                var currentDate = new Date(scope.currentYear.year, scope.currentMonth.month - 1, i);
                var newdiv = firstDiv.clone();
                var spanD = newdiv.children().eq(0);
                spanD.text(i);
                var spanR = newdiv.children().eq(1);
                newdiv.attr('add-remove', i)
                newdiv.addClass("RRR")
                var strToDate;
               // проверяем есть ли такая дата
                arr.forEach(function (item, j, ar) {
                    item.DateStart = new Date(item.DateStart)
                    
                    if (
                        ((item.DateStart.toDateString() == currentDate.toDateString())) || (item.Repeats == null & item.DateStart <= currentDate & item.DateStart.getDate() == currentDate.getDate())) {

                        newdiv.addClass('Mark');
                        
                        if (item.Repeats == null) { spanR.addClass('StaticShow') }

                    }
                })
                    
                $compile(newdiv)(scope)
                element.append(newdiv)
                   
            }
        })
        
    }
})     

onechanceApp.directive("changeCurrentMonthYear", function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            var newDate = new Date(attrs['changeCurrentMonthYear']);
            scope.SetNewScrollAndCurrent(newDate);
            setTimeout(function () {
                var context = $(element).closest('.Day');
                var selector = "div[add-remove=" + newDate.getDate() + "]";
                var day = $(selector, context);
                day.addClass('Show2s');
                setTimeout(function () {
                    day.removeClass('Show2s');
                }, 1000)
            }, 100);
        })
    }
})
///////////*********///   Remind   ///***********//////////////////

///////////*********    Quicklist       ***********//////////////////
onechanceApp.directive("changeAllreminds", function ($parse) {
    return function (scope, element, attrs) {
        element.on('click', function () {
            
           var template = $parse(attrs['changeArray']);
           var arr =template(scope);
            
            var isremind;
            if (attrs['changeAllreminds'] == '1') {
                isremind = true
            }
            else {
                isremind = false
            };
           arr.forEach(function (task, i, arr) {
                if (task.category == scope.currentCategory.category || scope.currentCategory.category == "Все позиции") {
                    task.isRemind = isremind;
                }
            })
            scope.$apply();
        })
    }
})

///////////*********///    Quicklist       ///***********//////////////////


///////////*********    Regular       ***********//////////////////
//Выделение столбца в расписании Regular Week
$("body").on("mouseover", "tr.DayOfWeekChallenge td", function () {
            var tdClass = $(this).attr("class"); //получили класс
            var tableItem = this.closest("table"); //получили таблицу
            if ((tdClass == "Mn") || (tdClass == "Tu") || (tdClass == "Wn") || (tdClass == "Th") || (tdClass == "Fr") || (tdClass == "St") || (tdClass == "Sn")) {
                var tableItem = this.closest("table"); //получили таблицу
                var Column = $('.' + tdClass, tableItem);
                var Inputs = $("input", Column);
                Column.addClass("HoveredColumn");
                Inputs.addClass("HoveredColumn");
            }
    
 
})
//Отмена выделения столбца в расписании Regular Week
$("body").on("mouseout", "tr.DayOfWeekChallenge td", function(){
  $(".HoveredColumn").removeClass("HoveredColumn");
})

/*$("body").on("click", ".TimeControl", function () {
    var context = $(this).closest(".DetailsBox");
    var control = $(".VisibleCell", context);
    var BoxTime = $(".Time", context);
    var HiddenCell = $(".HiddenCell", context);
    BoxTime.toggle();
    control.toggle();
    HiddenCell.toggle();
})*/

///////////*********    Regular       ***********//////////////////







/*onechanceApp.directive("watchSuffics", function () {
    return function (scope, element, attrs) {
       //Ждем первого открытия Mission
        scope.$on('EventInitializeCategory', function(){
           



            })
           
    
    }})

*/

 


 /*scope.$watch('UniqueArrayScrollPanel', function (newVal){
                      
       })

*/










