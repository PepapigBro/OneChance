var onechanceApp = angular.module("onechanceApp");

//Рекурсивная функция получения сложного свойства объекта, например Obj.Category.Name,  когда есть Obj и строковый массив keys="Category, Name"
function valueFromKeys(obj, keys, index) {
    
    if (index < keys.length - 1) { var s = obj[keys[index]];  index = index + 1; return valueFromKeys(s, keys, index); }
    else { return obj[keys[index]] }
}


//Создаем массив из уникальных значений
function getUniqueArray(originalArr, displayedProp) {
    var UniqueArr = new Array();
    var IsEnable = false;
    
    
    var keys = displayedProp.split('.');
//    alert(keys[0] +"--"+keys[1])
    for (var i = 0; i < originalArr.length; i++) {
        IsEnable = false;
        for (var j = 0; j < UniqueArr.length; j++) {
            
            var uniqueArrValue = valueFromKeys(UniqueArr[j], keys, 0); //UniqueArr[j][keys[0]][keys[1]]//
            var originalArrValue = valueFromKeys(originalArr[i], keys, 0); //originalArr[i][keys[0]][keys[1]]//

            if (uniqueArrValue == originalArrValue) {
                IsEnable = true; break;
            }
        }
        if (IsEnable == false) {
            UniqueArr.push(originalArr[i]);
        }
    }
    return UniqueArr;
}





//Удаленное нажатие стрелки для прокрутки не к самой последней категории, а к предпоследней
onechanceApp.directive("remoteControl", function () {
    return function (scope, element, attrs) {
        scope.$on("EventRemoteClickScroll", function (e) {
            setTimeout(function () { element.click(); }, 10)
        })
    }
})


//Categories Directive


//Формируем название категорий для Quicklist, Regular and Challenge
onechanceApp.directive("setOriginalArray", function ($parse) {
    return function (scope, element, attrs) {

        //Ждем когда будет первый раз открыт Mission
        scope.$on('EventInitializeCategory', function () {
           
            if (scope.MissionOpened == true) { return false; } //Если уже была открыта и проинициализированна
           // alert("Initialize")
            scope.$on("EventChangeOriginalArray", function (e, data) {

                
                var template = $parse(attrs['setOriginalArray']);
                var originalArray = template(scope);

                var displayedProp = attrs['dispalyedProp'];


                scope.itemsArr = getUniqueArray(originalArray, displayedProp);
                //Передача в контроллер выше (Mission-controlle) массива меню
                scope.setUniqueArrayScrollPanel(scope.itemsArr);
                
            })


            var template = $parse(attrs['setOriginalArray']);
            var originalArray = template(scope);


            var displayedProp = attrs['dispalyedProp'];



            scope.itemsArr = getUniqueArray(originalArray, displayedProp);

            scope.Type = attrs['currenttype'];
            //Передача в контроллер выше (Mission-controlle) массива меню
            scope.setUniqueArrayScrollPanel(scope.itemsArr);

            //Действия при смене активного элемента горизонтального меню
            scope.$watch('currentItem', function (newVal) {

                scope.changeCurrent(scope.itemsArr[newVal], attrs['currenttype']);
                //тут поставить задержку и заработало. А затем убрал
                var divs = $('.DaysList div', $(element));
                var dayslist = $('.DaysList', $(element));
                var summWidth = 0;
                divs.removeClass("SelectedDay");
                divs.addClass("NonSelectedDay");
                divs.eq(scope.currentItem).removeClass("NonSelectedDay");
                divs.eq(scope.currentItem).addClass("SelectedDay");
                for (var i = 0; i < divs.length; i++) {
                    if (i < scope.currentItem) {
                        summWidth = summWidth + divs.eq(i).outerWidth();
                        dayslist.css("margin-left", "-" + summWidth + "px");
                    }
                }
               // scope.$apply();
            })
            //Обеспечение скрола горизонтального меню
            scope.$watch('scrollPosition', function (newVal) {

                var context = $(element);
                var dayslist = $(".DaysList", context).eq(0);
                var days = $(".DaysList div", context);
                var totalWidth = 0;
                for (var i = 0; i < scope.scrollPosition; i++) {
                    totalWidth = totalWidth + days.eq(i).outerWidth();
                }
                dayslist.css("margin-left", "-" + totalWidth + "px");
            })



            /*******Установка суффиксов *********///
            var text = attrs['watchsuffics'];
            var count = scope.itemsArr.length - 1;
            var LastDigit = count % 10;
            var Last2Digits = count % 100;
            var suff;

            if (text == "категория") {
                if (LastDigit == 1 && Last2Digits != 11) {
                    suff = "категория"
                }
                if (LastDigit == 0 || LastDigit == 5 || LastDigit == 6 || LastDigit == 7 || LastDigit == 8 || LastDigit == 9 || Last2Digits == 10 || Last2Digits == 11 || Last2Digits == 12 || Last2Digits == 13 || Last2Digits == 14 || Last2Digits == 15 || Last2Digits == 16 || Last2Digits == 17 || Last2Digits == 18 || Last2Digits == 19 || Last2Digits == 20) {
                    suff = "категорий"
                }
                if (LastDigit == 2 || LastDigit == 3 || LastDigit == 4) {
                    suff = "категории"
                }
            }

            if (text == "день") {
                if (LastDigit == 1 && Last2Digits != 11) {
                    suff = "день"
                }
                if (LastDigit == 0 || LastDigit == 5 || LastDigit == 6 || LastDigit == 7 || LastDigit == 8 || LastDigit == 9 || Last2Digits == 10 || Last2Digits == 11 || Last2Digits == 12 || Last2Digits == 13 || Last2Digits == 14 || Last2Digits == 15 || Last2Digits == 16 || Last2Digits == 17 || Last2Digits == 18 || Last2Digits == 19 || Last2Digits == 20) {
                    suff = "дней"
                }
                if (LastDigit == 2 || LastDigit == 3 || LastDigit == 4) {
                    suff = "дня"
                }
            }
            if (text == "неделя") {
                if (LastDigit == 1 && Last2Digits != 11) {
                    suff = "неделя"
                }
                if (LastDigit == 0 || LastDigit == 5 || LastDigit == 6 || LastDigit == 7 || LastDigit == 8 || LastDigit == 9 || Last2Digits == 10 || Last2Digits == 11 || Last2Digits == 12 || Last2Digits == 13 || Last2Digits == 14 || Last2Digits == 15 || Last2Digits == 16 || Last2Digits == 17 || Last2Digits == 18 || Last2Digits == 19 || Last2Digits == 20) {
                    suff = "недель"
                }
                if (LastDigit == 2 || LastDigit == 3 || LastDigit == 4) {
                    suff = "недели"
                }
            }

            scope.SetSuffics(count + " " + suff)
            /*******Установка суффиксов *********///
            console.log("Categories directive EventInitializeCategory")
            scope.$apply()
        })
    }
})













