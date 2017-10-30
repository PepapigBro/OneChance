//Запрещаем выделенеи
$("body").on("selectstart", "td", function () {
    return false;
})


var onechanceApp = angular.module("onechanceApp");

//нужно ли менять оглавление у DropDownList
onechanceApp.directive('needChangeDropdownTitle', function () {
    return function (scope, element, attrs) {
        $(element).on('click', function () {
            var ClickedItem = $(element);
            var HeaderItem = ClickedItem.parents(".dropdown").find('a:first');
            var context = ClickedItem.closest("div");
            var ulContext = ClickedItem.closest("ul");
            //Проверяем, нужно ли менять надпись на выбранную
            if (context.hasClass("NoChangeHeadLable") == false) {
                HeaderItem.text(ClickedItem.text());
                var liElements = $('li', ulContext);
                liElements.removeClass('displayNone');
                var CLickedliElement = ClickedItem.closest('li');
                CLickedliElement.addClass('displayNone');
            }
        })
    }
})

//Нужна ли перезагрузка странцицы (при клике на одном и том же элементе меню слева)
onechanceApp.directive('reloadPage', function ($route) {
    return function (scope, element, attrs) {
        $(element).on('click', function () {
            $route.reload();
        })
    }
})


onechanceApp.directive('changeMissionPropFilter', function () {
    return function (scope, element, attrs) {
        $(element).on('click', function () {
            scope.MissionPropFilter = MissionPropFilter[attrs['changeMissionPropFilter']]
            scope.$apply();
        })
    }
})

onechanceApp.directive('selectClick', function () {
    return function (scope, element, attrs) {
        $(element).on('focus', function () {
            var input = $(element);
            input.select();
            input.css('cursor', 'text')
        })

        $(element).on('blur', function () {
            var input = $(element);
            input.select();
            input.css('cursor', 'pointer')
        })
    }})


onechanceApp.directive('changeMissionTypeFilter', function () {
    return function (scope, element, attrs) {
        $(element).on('click', function () {
            scope.MissionTypeFilter = types[attrs['changeMissionTypeFilter']];
            scope.$apply();
        })
    }
})


onechanceApp.directive('changePageSuggestType', function () {
    return function (scope, element, attrs) {
        $(element).on('click', function () {
            scope.currentSuggestType = attrs['changePageSuggestType'];
            scope.$apply();
        })
    }
})



//Начальная настройка Popovers
/*onechanceApp.directive('initPopover', function () {
    return function (scope, element, attrs) {
        element.on('mouseover', function () {
            //Инициализируем Popover
            $(element).popover({
                placement: 'left'
                , container: 'body'
                , tabindex: "0"
                , trigger: "focus"
                , html: true
                , content: function () {
                    var content = $(attrs['initPopover']);
                    var textarea = $('.textInside', content); //вставляем текст
                    textarea.text(attrs['textInside']);
                    return $(content).children(".popover-body").html();
                }
                , title: function () {
                    var title = $(attrs['initPopover']);
                    return $(title).children(".popover-heading").html();
                }
            })
            $(element).popover('show')
        })
        element.on('mouseout', function () {
            $(element).popover('hide')
        })
    }
})*/


//настройка управления Popover через span внутри
onechanceApp.directive("popoverWithSpan", function ($compile) {
    return function (scope, element, attrs) {
        var timerPopover;



           function ShowPopover(action, delay){
            
               var context = $(element).closest('a');
              
            //alert(context.attr('init-popover'))
            //Инициализируем Popover
            context.popover({ 
                container: context, //Элемент, внутри которого будет появляться popover
                tabindex: "0", 
                trigger: "manual", 
                html: true,
                content: function () {
                    var content = $(context.attr('init-popover'));
                    var textarea = $('.textInside', content); //вставляем текст

                    textarea.text(context.attr('text-inside'));

                    var bodyhtml = $(content).children(".popover-body").html();
                    
                    
                    return bodyhtml;
                }
                , title: function () {
                    var title = $(context.attr('init-popover'));
                   
                    return $(title).children(".popover-heading").html();
                }
            })
           
            
            timerPopover = setTimeout(function () {
                context.popover(action)
                $compile(context)(scope);
                //scope.$apply();
                
            }, delay)
            
        }
        
        
        if (attrs['popoverWithSpan']=='hover'){        
        element.on('mouseover', function(){                    
            ShowPopover('show', 500);
        })
        
        element.on('mouseout ', function(){

            clearTimeout(timerPopover);
            var context = $(element).closest('a');            
            context.popover('hide')
        })

        
}
        element.on('click', function(){
           var context = $(element).closest('a'); 
            //открываем только, если закрыт (иначе будет мерцание - закроется, а потом тут же откроется)
           if (context.attr('aria-describedby') == undefined) { ShowPopover('show', 0); }
           
            //alert("sss")
            
        })
        
    }})




//Директива управляющая модальным окном создания категории/дня/недели 
onechanceApp.directive('modalType', function () {
    return function (scope, element, attrs) {
        $(element).on('hidden.bs.modal', function () {
            scope.$broadcast('EventClosedModal');
        })
        scope.$on('OpenModal', function (e, params) {
            var modalaction = attrs['modalAction']; //напр delete             
            if (modalaction != params.action) {
                return false
            } //если окно не того типа, то ничего не делаем
            scope.SetCurrEditioningScope(params.currEditioningScope);
            var context = $(element).closest('#MainContent');
            var selector = "div[modal-type=" + params.windowName + "]" + "[modal-action=" + params.action + "]";
            var window = $(selector, context);
            window.modal({
                show: true
            });
            setTimeout(function () {
                $("input", window).focus();
            }, 500); // фокус нужно включать через интервал, т.к требуется время на   
        });
    }
})


//При нажатии кнопки submit  в диалоговом окне создания новой категории Быстрого списка
onechanceApp.directive("makeCreateCategory", function () {
    return function (scope, element, attrs) {
        element.on('submit', function (e) {
            
            var context = $(element).closest('.modal-body');
            var LabelAdded = $('.Added', context)
            var LabelAlreadyExist = $('.AlreadyExist', context)
            var input = element.children('input');
            var name = input.val();
            name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
            if (name == "") {
                return false;
            } //Дописать проверку
            // var data = {name:name, type: 'quicklist'}
            //Очищаем input
            input.val("");
            var IsEnable = false;
            //Получили индекс последнего элемента в поле скролла
            var index = scope.currEditioningScope.UniqueArrayScrollPanel.length;
            //Проверка существует ли уже такая категория в массиве уникальных категорий
            scope.currEditioningScope.UniqueArrayScrollPanel.forEach(function (item, i, arr) {
                    if ((IsEnable == false) && (item.Category.Name == name)) {
                        IsEnable = true;
                        index = i
                    }
                })
                //Создаем новый элемент
                        var newStepOfMission = { Category: { Name: name }, CategoryName: name,  Name: "" }

            if (IsEnable == false) {
                //Добавляем новый элемент в текущий scope, если такой категории не существует уже
                scope.currEditioningScope.mission.StepOfMissions.push(newStepOfMission);
                //Посылаем сообщение на обновление горизонтального меню
                
                scope.currEditioningScope.UpdateScroll();
                
                
                    //scope.currEditioningScope.UniqueArrayScrollPanel.splice(index, 0, newElement);
                LabelAdded.addClass('ShowSometime')
                setTimeout(function () {
                    LabelAdded.removeClass('ShowSometime')
                }, 2000)
            }
            else {
                //.Show2s.ShowSometime
                LabelAlreadyExist.addClass('ShowSometime')
                setTimeout(function () {
                    LabelAlreadyExist.removeClass('ShowSometime')
                }, 2000)
            }
            //Прокручиваем до него Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: index
            });
            //Удаленно нажимаем кнопку прокрутки категорий на одну назад
            scope.currEditioningScope.$broadcast('EventRemoteClickScroll');
            e.preventDefault();
            setTimeout(function () {
                input.focus();
            }, 500); // фокус нужно включать через интервал, т.к требуется время на   
        })
    }
})


//При нажатии кнопки добавления происходит проверка и добавление/копирование


//Возможность Submit формы со сторонней кнопки
onechanceApp.directive("canSubmitForm", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            var id = attrs['canSubmitForm'];
            var form = $(id);
            form.submit();
        })
    }
})


//При нажатии кнопки добавления происходит проверка и добавление/копирование
onechanceApp.directive("makeCreateDay", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            var countday = attrs['countday'];


            if (countday == undefined) {
                countday = 1
                
            }
            var countElements = parseInt(countday) //Количесвто добавляемых недель
            var index = 0; //то, что отображается пользователю, место под которым будет создан элемент
            var place = attrs['makeCreateDay'];
            var realIndex = 0;
            switch (place) {
            case "After":
                index = parseInt(scope.currEditioningScope.currentDay.Category.Name) + 1;
                
                break
                case "First":
                    index = 1;
                    break
                case "Last":
                    index = scope.currEditioningScope.UniqueArrayScrollPanel.length + 1;
                    realIndex = scope.currEditioningScope.mission.StepOfMissions.length;
                    break
            }

           
            var countSameDay = 1; //Сколько элементов содержит копируемый день     
            
            var template = {
                Category: { Name: index },
                CategoryName: index
                    , Name: { Text: null }
                    , Count: ""
                    , Units: ""
                    , Repeats: ""
            } //шаблон по которому будет происходить клонирование объекта в функции makeclone     
            var newElementArray = Array();
            if (attrs['countday'] != undefined) { //если есть атрибут, то клонируем
                //Считаем сколько элементов содержит копируемый день
                countSameDay = 0;
                var newElement;
                for (var k = 0; k < countElements; k++) {
                    for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                        if (scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentDay.Category.Name) {
                            newElement = JSON.parse(angular.toJson(scope.currEditioningScope.mission.StepOfMissions[i]));
                            //newElement = makeClone(scope.currEditioningScope.mission.StepOfMissions[i], template);
                            newElement.Category.Name = index + countSameDay;
                            newElementArray.push(newElement);
                        }
                    }
                    countSameDay = countSameDay + 1;
                }
            }
            else { //иначе создаем добавляем в массив пустой шаблон
                
                newElementArray.push(template);
                
            }
            //Сдвигаем существующие элементы в массиве, чтобы освободить место
            
            for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                if (parseInt(scope.currEditioningScope.mission.StepOfMissions[i].Category.Name) >= index) {
                    scope.currEditioningScope.mission.StepOfMissions[i].Category.Name = parseInt(scope.currEditioningScope.mission.StepOfMissions[i].Category.Name) + countSameDay;
                }
                else {
                    realIndex = i + 1;
                }
            }
            //Добавляем новые элементы в массив
            
            for (var i = 0; i < newElementArray.length; i++) {
                
                scope.currEditioningScope.mission.StepOfMissions.splice(realIndex + i, 0, newElementArray[i]);
                //   scope.currEditioningScope.UniqueArrayScrollPanel.splice(index-1+i, 0, newElementArray[i]);
                console.log(scope.currEditioningScope.mission.StepOfMissions)
            }


            
            //Посылаем сообщение на обновление горизонтального меню
            scope.currEditioningScope.$broadcast("EventChangeOriginalArray", {
                name: "111"
            })
            //Прокручиваем до него Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: index
            });
            //Удаленно нажимаем кнопку прокрутки категорий на одну назад
            //   scope.currEditioningScope.$broadcast('EventRemoteClickScroll');
            //Прокручиваем до него Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: index - 1
            });
            var context = $(element).closest('.modal-body');
            var LabelAdded = $('.Added', context)
            LabelAdded.addClass('ShowSometime')
            setTimeout(function () {
                LabelAdded.removeClass('ShowSometime')
            }, 2000)
        })
    }
})


onechanceApp.directive("makeCreateWeek", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            var countweek = attrs['countweek'];


            if (countweek == undefined) {
                countweek = 1

            }
            var countElements = parseInt(countweek) //Количесвто добавляемых недель
            var index = 0; //то, что отображается пользователю, место под которым будет создан элемент
            var place = attrs['makeCreateWeek'];
            var realIndex = 0;
            switch (place) {
                case "After":
                    index = parseInt(scope.currEditioningScope.currentWeek.Category.Name) + 1;

                    break
                case "First":
                    index = 1;
                    break
                case "Last":
                    index = scope.currEditioningScope.UniqueArrayScrollPanel.length + 1;
                    realIndex = scope.currEditioningScope.mission.StepOfMissions.length;
                    break
            }


            var countSameDay = 1; //Сколько элементов содержит копируемый день     

            var template = {
                Category: { Name: index },
                CategoryName: index
                    , Name: { Text: "" }
                    , Count: ""
                    , Units: ""
                    , Repeats: ""
            } //шаблон по которому будет происходить клонирование объекта в функции makeclone     
            var newElementArray = [];
            
            if (attrs['countweek'] != undefined) { //если есть атрибут, то клонируем
                //Считаем сколько элементов содержит копируемый день
                //alert(attrs['countweek'])
                countSameDay = 0;
                var newElement;
                for (var k = 0; k < countElements; k++) {
                    for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                        if (scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentWeek.Category.Name) {
                            newElement = JSON.parse(angular.toJson(scope.currEditioningScope.mission.StepOfMissions[i]));
                            //newElement = makeClone(scope.currEditioningScope.mission.StepOfMissions[i], template);
                            newElement.Category.Name = index + countSameDay;
                            newElementArray.push(newElement);
                        }
                    }
                    countSameDay = countSameDay + 1;
                }
            }
            else { //иначе создаем добавляем в массив пустой шаблон
               
                 for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                        if (scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentWeek.Category.Name) {
                            newElement = JSON.parse(angular.toJson(scope.currEditioningScope.mission.StepOfMissions[i]));
                            
                            //newElement = makeClone(scope.currEditioningScope.mission.StepOfMissions[i], template);
                            newElement.Category.Name = index;
                            newElement.CategoryName = newElement.Category.Name;
                            newElement.Count = "";
                            newElement.Repeats = "";
                            
                            newElementArray.push(newElement);
                        }
                    }
                   // countSameDay = countSameDay + 1;



               // newElementArray.push(template);

            }
            //Сдвигаем существующие элементы в массиве, чтобы освободить место

            for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                if (parseInt(scope.currEditioningScope.mission.StepOfMissions[i].Category.Name) >= index) {
                    scope.currEditioningScope.mission.StepOfMissions[i].Category.Name = parseInt(scope.currEditioningScope.mission.StepOfMissions[i].Category.Name) + countSameDay;
                }
                else {
                    realIndex = i + 1;
                }
            }
            //Добавляем новые элементы в массив

            for (var i = 0; i < newElementArray.length; i++) {

                scope.currEditioningScope.mission.StepOfMissions.splice(realIndex + i, 0, newElementArray[i]);
                //   scope.currEditioningScope.UniqueArrayScrollPanel.splice(index-1+i, 0, newElementArray[i]);
               // console.log(scope.currEditioningScope.mission.StepOfMissions)
            }

           // scope.currEditioningScope.mission.StepOfMissions.forEach(function (item, i, arr) {
           //     console.log(item.Category.Name + "--" + item.Name.Text + "--" + item.Repeats+"--"+item.Count)
           //
           // })
            

            //Посылаем сообщение на обновление горизонтального меню
            scope.currEditioningScope.$broadcast("EventChangeOriginalArray", {
                name: "111"
            })
            //Прокручиваем до него Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: index
            });
            //Удаленно нажимаем кнопку прокрутки категорий на одну назад
            //   scope.currEditioningScope.$broadcast('EventRemoteClickScroll');
            //Прокручиваем до него Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: index - 1
            });
            var context = $(element).closest('.modal-body');
            var LabelAdded = $('.Added', context)
            LabelAdded.addClass('ShowSometime')
            setTimeout(function () {
                LabelAdded.removeClass('ShowSometime')
            }, 2000)
        })
    }
})



onechanceApp.directive("changeIntentVisiblefor", function () {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
         

            var state = attrs['changeIntentVisiblefor']

            var context = $(element).closest('.ItemMission');
            var indicator = $('.indicator', context);
            indicator.removeClass('hidden');
            indicator.addClass('EndlessSpin');


            //Отправляем Миссии (те, что могут добавлять другие пользователи)
            $.ajax({
                url: '/Intent/ChangeVisibleFor',
                type: "POST",
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ intent: { Id: scope.intent.Id, UserId: scope.intent.UserId, VisibleFor: ObserversGroup[state].value } }),
                success: function (json) { //Получаем в ответ ID созданной миссии
                    
                    scope.intent.VisibleFor = parseInt(json);
                    
                    scope.$apply();

                },
                error: function (response) {
                    alert("error changeIntentVisiblefor")
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








onechanceApp.directive("getCreateMissionView", function ($compile, $timeout) {
    return function (scope, element, attrs) {
        element.on('click', function (event) {

            scope.ShowIndicator($(element));
                    

            type = attrs['getCreateMissionView']
            scope.MissionTypeFilter = typesArr[type];
            //Запрашиваем View для отображения моих миссий
            $.ajax({
                url: '/Mission/Create',
                contentType: 'application/html; charset=utf-8',
                type: "GET",
                dataType: 'html',
                data: { type: type },

                success: function (response) {
                    $('#Temp').html(response)
                    //scope.ShowIndicator($(element));
                    var s = $('#Temp');
                    $compile(s)(scope);
                    
                    scope.$apply();
                    //scope.MissionTypeFilter = types[attrs['changeMissionTypeFilter']];
                    
                    
                    //Запрашиваем мои миссии
                    scope.getEmptyTemplates();
                    //***Запрашиваем View
                    
                    //scope.$apply();
                },
                error: function (xhr, status) {
                    alert("Error getCreateMissionView");
                },
                complete: function () {
                    
                    
                }

            })
            //***Запрашиваем View
            
        })}
})

//Search(int skipCount, byte type)

//Бесконечный скролл
onechanceApp.directive("getDataAfterScroll", function ($window) {
    return function (scope, element, attrs) {
        
       
        angular.element($window).bind("scroll", function (e) {

            e.preventDefault();
            
           // alert(IsListEnd + "---" + ScrollIsBusy)
           // console.log(IsListEnd + "--" + ScrollIsBusy);
           // console.log(IsListEnd + "---" + ScrollIsBusy + "---" )
            if ((IsListEnd == true) || (ScrollIsBusy == true)) { return false; }
            
            var top = window.pageYOffset || document.documentElement.scrollTop;
            if (lastScrollTop > top) { lastScrollTop = top; return false; }
            lastScrollTop = top;
            
            var scrollList = $('.scrollList', $(element));

            //1 - уровень прокрутки, 2- высота видимой области окна, 3 - относительное расположение элемента, 4 - абсолютное расположение элемента
            var a = top + $(window).height();
            var b = $(element).offset().top + scrollList.height();//$(element).height();

           // console.log(a+"---"+b-30);
            
            if ((a >= (b-30)) && (scrollList.height() > 0)) {
                ScrollIsBusy = true;
               
               
                //  var fillingArray = scope[attrs['fillingArray']];

                //var language = $window.navigator.userLanguages[0] || $window.navigator.languages[0];
                //alert(language);
               
                //alert(scope.AddedParams.length)
               // alert(scope.TypeOfItems)
               // var type = types.quicklist.index;
                // alert("url" + attrs['url'] + "---" + "type-collection" + attrs['typeCollection'])
                $.ajax({
                    url: attrs['getDataAfterScroll'],
                    contentType: false,
                    type: "GET",
                    dataType: 'json',
                    data: { type: scope.TypeOfItems, skipCount: scope.fillingArray.length + 1, AddedParams: scope.AddedParams },
                    success: function (json) {//Получаем сериализованный список намерений пользователя
                        
                        var ScrollIntentCollection = JSON.parse(json);
                        var collection = ScrollIntentCollection[attrs['typeCollection']];
                       
                        var takeCount = ScrollIntentCollection.takeCount;
                        if (collection.length < takeCount) { IsListEnd = true; }
                      //  alert(takeCount + "---" + collection.length)
                        collection.forEach(function (item, i, arr) {

                            //Нулевые не добавляем, т.к возникает дальше исключение
                            if (item != null && item != undefined) {
                                var alreadyInCollection = false;
                                var existingArray = scope.fillingArray;
                                existingArray.forEach(function (existingIntent, i, arr) {
                                    if (existingIntent.Id == item.Id) { alreadyInCollection = true; }
                                })
                                if (alreadyInCollection == false) { scope.PushfillingArray(item); }

                            }
                        })

                       //if (collection.length < takeCount) { IsListEnd = true; }
                    },
                    error: function (xhr, status) {

                        alert("error Update scroll");
                    },
                    complete: function () {
                        setTimeout(function () {
                            scope.updatePageScope();
                            ScrollIsBusy = false;   // scope.$broadcast("applyFillingArray", { array: arr })

                        }, 100)
                        // indicator.addClass('hidden');
                        //  indicator.removeClass('EndlessSpin');
                    }
                })

            } else {

            }
            
        });


      
    }})


onechanceApp.directive("getMineIntentsView", function ($compile) {
        return function (scope, element, attrs) {
            element.on('click', function (event) {

                $(window).scrollTop(0);
                lastScrollTop = 0;
                ScrollIsBusy = false;
                IsListEnd = false;
                

                scope.ClearfillingArray();

                scope.ShowIndicator($(element));
                
                scope.UrlForScrollGetData = "/Intent/GetMineIntentsJson";
                scope.UrlForScrollTypeData = "intents";

                scope.AddedParams = null;
                type = attrs['getMineIntentsView']
               // scope.dataAjaxFillingArray = { type: type, skipCount: scope.fillingArray.length + 1 }
                //Запрашиваем View для отображения моих миссий
                
                $.ajax({
                    url: '/Intent/Mine',
                    contentType: 'application/html; charset=utf-8',
                    type: "GET",
                    dataType: 'html',
                    data: { type: type },

                    success: function (response) {
                        $('#Temp').html(response)
                        var s = $('#Temp');
                        $compile(s)(scope);
                        
                        
                        //Запрашиваем данные моих Intent
                        scope.GetMineMissionData(type, 0);
                    
                       
                    },
                    error: function (xhr, status) {
                        alert("Error GetMineIntentsView");
                    },
                    complete: function () {
                        indicator.addClass('hidden');
                        indicator.removeClass('EndlessSpin');
                       
                    }
                })
                //***Запрашиваем View

            

               


            })
        }})






onechanceApp.directive("getReviewView", function ($compile) {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            $(window).scrollTop(0);
            lastScrollTop = 0;
            //scope.ClearfillingArray();

            //Запрашиваем View для отображения моих миссий
            $.ajax({
                url: '/Intent/GetViewForOneIntent',
                contentType: 'application/html; charset=utf-8',
                type: "GET",
                dataType: 'html',
                data: {},

                success: function (response) {

                    //Запрашиваем данные миссий
                    $.ajax({
                        url: '/Intent/GetDataForOneIntent',
                        contentType: false,
                        type: "GET",
                        dataType: 'json',
                        data: { missionId: scope.stepOfMission.MissionId, intent: scope.stepOfMission.Mission.Intent },//scope.fillingArray.length+1 },// { skipCount: 0, needCreatingTask: needCreatingTask }, //scope.MyIntentsArray.length
                        success: function (json) {//Получаем сериализованный список намерений пользователя
                            scope.mission = JSON.parse(json);
                           
                            $('#Temp').html(response)
                            var s = $('#Temp');
                            $compile(s)(scope);
                           
                            scope.updatePageScope();
                           
                            
                        },
                        error: function (xhr, status) {
                            alert("error Get data for on intent");
                        },
                        complete: function () {
                            indicator.addClass('hidden');
                            indicator.removeClass('EndlessSpin');

                        }
                    })

                    

                    
                },
                error: function (xhr, status) {
                    alert("Error Get View for One Intent");
                },
                complete: function () {

                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })
            //***Запрашиваем View





        })
        }
})



onechanceApp.directive("getViewForEditMission", function ($compile) {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            $(window).scrollTop(0);
            lastScrollTop = 0;
            // scope.ClearfillingArray();
            var missionId = attrs['getViewForEditMission']
            //Запрашиваем View для отображения моих миссий
            $.ajax({
                url: '/Mission/GetViewForEditMission',
                contentType: 'application/html; charset=utf-8',
                type: "GET",
                dataType: 'html',
                data: {},

                success: function (response) {
                    
                    //Запрашиваем данные миссий
                    $.ajax({
                        url: '/Mission/GetDataForEditMission',
                        contentType: false,
                        type: "GET",
                        dataType: 'json',
                        data: { missionId: missionId },//scope.fillingArray.length+1 },// { skipCount: 0, needCreatingTask: needCreatingTask }, //scope.MyIntentsArray.length
                        success: function (json) {//Получаем сериализованный список намерений пользователя
                            scope.mission = JSON.parse(json);

                            $('#Temp').html(response)
                            var s = $('#Temp');
                            $compile(s)(scope);

                            scope.updatePageScope();

                        },
                        error: function (xhr, status) {
                            alert("error Get data for on intent");
                        },
                        complete: function () {
                            indicator.addClass('hidden');
                            indicator.removeClass('EndlessSpin');

                        }
                    })




                },
                error: function (xhr, status) {
                    alert("Error Get View for One Intent");
                },
                complete: function () {

                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })
            //***Запрашиваем View





        })
    }
})






onechanceApp.directive("getTodayView", function ($compile) {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
          $(window).scrollTop(0);
          lastScrollTop = 0;
          ScrollIsBusy = false;
          IsListEnd = false;
          
            //Закрываем модально окно
          $('#modalCalendar').modal('hide');


          scope.SetUrlForScrollGetData("/Today/GetMineStepOfMissions");
          scope.SetUrlForScrollTypeData("stepOfMissions");

          var typeOfStatus = attrs['typeOfStatus'];
          scope.SetTypeOfItems(typeOfStatus);
          scope.ClearfillingArray(); 
          scope.ClearAddedParams();

          

            var nameOfDate = attrs['getTodayView']
            var dates = new Array();

            switch (nameOfDate) {
                case "todayDate":
                    var date = new Date();
                    dates.push(date.toISOString());                    
                    break;

                case "tomorrowDate":
                    var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                    dates.push(date.toISOString());
                    break;

                case "arrayOfDays":                    
                    scope.mission.StepOfMissions.forEach(function (item, i, arr) {
                        var date = new Date(item.DateStart.getTime() + 24 * 60 * 60 * 1000);//прибаляем 1 день, т.к календарь считает с единица
                        dates.push(date.toISOString())
                    })
                    break;

            }

            scope.ShowIndicator($(element));

           // scope.AddedParams = null;//new Array();
            scope.SetAddedParams(dates); //scope.datesRange

            
           // alert("eee");
            jQuery.ajaxSettings.traditional = true //без этого к массиву добавляются прямоугольные скобки и потом в контроллее mvc массив не преобразуется нормально в list
            //Запрашиваем View для отображения моих миссий
            $.ajax({
                url: '/Today/GetTodayView',
                contentType: 'application/html; charset=utf-8',
                type: "GET",
                dataType: 'html',
                data: { },

                success: function (response) {
                    $('#Temp').html(response)
                    var s = $('#Temp');
                    $compile(s)(scope);

                    //Запрашиваем данные миссий
                  //  var cicleCount=Math.ceil(scope.AddedParams.length / 20);

                    //alert("cicle" + cicleCount)
                    var typeOfStatus = attrs['typeOfStatus'];
                        $.ajax({
                        url: '/Today/GetMineStepOfMissions',
                        contentType: false,
                        type: "GET",
                        dataType: 'json',
                        data: { type: typeOfStatus, skipCount: 0, AddedParams: scope.AddedParams },//scope.fillingArray.length+1 },// { skipCount: 0, needCreatingTask: needCreatingTask }, //scope.MyIntentsArray.length
                            success: function (json) {//Получаем сериализованный список намерений пользователя
                                var scrollCollection = JSON.parse(json);                                
                                var takeCount = scrollCollection.takeCount;
                                scrollCollection.stepOfMissions.forEach(function (item, i, arr) {
                                    //Нулевые не добавляем, т.к возникает дальше исключение
                                    if (item != null && item != undefined && item.Name!=null && item.Name!=undefined) {
                                        scope.PushfillingArray(item);
                                    }
                                })
                               // alert(scope.fillingArray.length)
                                //  alert(scrollCollection.stepOfMissions.length + "---" + takeCount)
                                //alert(scrollCollection.stepOfMissions.length + "---" + takeCount)
                                if (scrollCollection.stepOfMissions.length < takeCount) { IsListEnd = true; }
                                //scope.updatePageScope();
                                //alert("update")
                                scope.updatePageScope();
                            },
                            error: function (xhr, status) {
                                alert("error Ahha");
                            },
                            complete: function () {
                                scope.LoadComplete();
                                
                            }
                        })
                        
                },
                error: function (xhr, status) {
                    alert("Error Get TOday View");
                },
                complete: function () {

                    indicator.addClass('hidden');
                    indicator.removeClass('EndlessSpin');
                }
            })
            //***Запрашиваем View






        })
    }
})

onechanceApp.directive("getSomeDaysView", function ($compile) {
    return function (scope, element, attrs) {
        element.on('click', function (event) {
            $(window).scrollTop(0);
            lastScrollTop = 0;
            ScrollIsBusy = false;
            IsListEnd = false;

            //Закрываем модально окно
            $('#modalCalendar').modal('hide');


            scope.SetUrlForScrollGetData("/Today/GetMineStepOfMissionsGroups");
            scope.SetUrlForScrollTypeData("missions");

            var typeOfStatus = attrs['typeOfStatus']; //например, активные + выполненные +отклоненные
            scope.SetTypeOfItems(typeOfStatus);
            scope.ClearfillingArray();
            scope.ClearAddedParams();



            var dates = new Array();

            scope.mission.StepOfMissions.forEach(function (item, i, arr) {//в календаре используется миссия - Remind, а stepOfMission - это выбранные даты
                var date = new Date(item.DateStart.getTime() + 24 * 60 * 60 * 1000);//прибаляем 1 день, т.к календарь считает с единица
                dates.push(date.toISOString())
            })

            

            scope.SetAddedParams(dates); //scope.datesRange

            scope.SetBreadCrumbsParams({ datesCount: dates.length })

            // alert("eee");
            jQuery.ajaxSettings.traditional = true //без этого к массиву добавляются прямоугольные скобки и потом в контроллее mvc массив не преобразуется нормально в list
            //Запрашиваем View для отображения моих миссий
            $.ajax({
                url: '/Today/getSomeDaysView',
                contentType: 'application/html; charset=utf-8',
                type: "GET",
                dataType: 'html',
                data: {},

                success: function (response) {
                    $('#Temp').html(response)
                    var s = $('#Temp');
                    $compile(s)(scope);
                    scope.ShowIndicator(null, $('#someDaysIndicator'))
                    //Запрашиваем данные миссий
                 
                    $.ajax({
                        url: '/Today/GetMineStepOfMissionsGroups',
                        contentType: false,
                        type: "GET",
                        dataType: 'json',
                        data: { type: typeOfStatus, skipCount: 0, AddedParams: scope.AddedParams },//scope.fillingArray.length+1 },// { skipCount: 0, needCreatingTask: needCreatingTask }, //scope.MyIntentsArray.length
                        success: function (json) {//Получаем сериализованный список намерений пользователя
                            var scrollCollection = JSON.parse(json);
                            var takeCount = scrollCollection.takeCount;
                            
                            scrollCollection.missions.forEach(function (item, i, arr) {
                                //Нулевые не добавляем, т.к возникает дальше исключение
                               // if (item != null && item != undefined && item.Name != null && item.Name != undefined) {
                                    scope.PushfillingArray(item);
                                //}
                            })
                           
                            if (scrollCollection.missions.length < takeCount) { IsListEnd = true; }
                          //  alert(scope.fillingArray.length)
                            scope.updatePageScope();
                            
                        },
                        error: function (xhr, status) {
                            alert("error Ahha");
                        },
                        complete: function () {
                            scope.LoadComplete($('#someDaysIndicator'));

                        }
                            
                       
                    })

                },
                error: function (xhr, status) {
                    alert("Error Get TOday View");
                },
                complete: function () {

                }
            })
            //***Запрашиваем View






        })
    }
})

//Удаление категории в QuickList, Challenge and Regular
onechanceApp.directive("makeDelete", function () {
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            
            // alert(scope.currEditioningScope.currentItem.category)
         for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
             if (
                 (scope.currEditioningScope.currentCategory != undefined && scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentCategory.Category.Name)
                 || (scope.currEditioningScope.currentDay != undefined && scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentDay.Category.Name)
                 || (scope.currEditioningScope.currentWeek != undefined && scope.currEditioningScope.mission.StepOfMissions[i].Category.Name == scope.currEditioningScope.currentWeek.Category.Name))
             {
                    /// alert(scope.currEditioningScope.itemMission.originMission.items[i].name)
                    scope.currEditioningScope.mission.StepOfMissions.splice(i, 1)
                    i--;
              }
         }


            if (scope.currEditioningScope.currentDay != undefined) {
                for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                    if (scope.currEditioningScope.mission.StepOfMissions[i].Category.Name > scope.currEditioningScope.currentDay.Category.Name) {
                        scope.currEditioningScope.mission.StepOfMissions[i].Category.Name = scope.currEditioningScope.mission.StepOfMissions[i].Category.Name - 1;
                    }
                }
            }
            if (scope.currEditioningScope.currentWeek != undefined) {
                for (var i = 0; i < scope.currEditioningScope.mission.StepOfMissions.length; i++) {
                    if (scope.currEditioningScope.mission.StepOfMissions[i].Category.Name > scope.currEditioningScope.currentWeek.Category.Name) {
                        scope.currEditioningScope.mission.StepOfMissions[i].Category.Name = scope.currEditioningScope.mission.StepOfMissions[i].Category.Name - 1;
                    }
                }
            }
            //Посылаем сообщение на обновление горизонтального меню
            
            /*scope.currEditioningScope.$broadcast("EventChangeOriginalArray", {
                    name: "111"
                })
            */
            scope.$apply();
                scope.currEditioningScope.UpdateScroll();
            
                //Прокручиваем Горизонтальное меню
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: -1
            });
            scope.currEditioningScope.SetNewScrollAndCurrent({
                number: 0
            });
        })
    }
})


//Удрежание выделенного элемента меню слева
onechanceApp.directive('keepSelectedMenuItem', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            var context = $('#LeftMenu');
            var allMenuItems = $('.list-item', context);
            allMenuItems.removeClass('SelectedLeftMenu');
            var keepingMenuItemId = attrs['keepSelectedMenuItem'];
            if (keepingMenuItemId != undefined) {
                var item = $(keepingMenuItemId);
                item.addClass('SelectedLeftMenu');
            }
        })
    }
})


//Для раздела создания новых Mission
onechanceApp.directive('selectBtn', function () { //При нажатии на кнопку у нее появляется подчеркивание
    return function (scope, element, attrs) {
        element.on('click', function (e) {
            var context = $(element).closest('a')
            var btnsGroup = $('button', context);
            btnsGroup.removeClass("UnderLine");
            $(element).addClass("UnderLine")
        })
    }
})

