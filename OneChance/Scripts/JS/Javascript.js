$(document).ready(function () {
    
    //Инициализация всплывающей панели для
    //элементов веб-страницы, имеющих атрибут
    //data-toggle="popover"
  
    $(window).scrollTop(0);
  //  set_random_examples_mission();
    
    $('body').on('click', function (event) {

        //Управление Popover`s
        var context = $(event.target).closest('a'); // текущий popover
        var attrVal = context.attr['aria-describedby'];
        $('[init-popover]').each(function (i, elem) {
            if ($(elem).attr('aria-describedby') != undefined) { $(elem).popover('hide') }
        });
        //Управление Popover`s

    })
  

    
   elementMenu = document.getElementById("LeftMenu");
   notification = document.getElementById("Notification");
 //  elementBreadCrumbs = document.getElementById("HeaderMenu");    
 
});





 

  //Оставляем меню слева и открытый Mission при прокрутке страницы вверх
    var IsFixScroll = false;
    var fixedScrollValue;
    var elementMenu;
    var notification;    
    
    var window = $(window);

    var lastScrollTop = 0;
    var ScrollIsBusy = false;
    var IsListEnd = false;


    window.onscroll = function () {


        var a = notification.getBoundingClientRect();
        var b = $(window).scrollTop();
        var elementBreadCrumbs = document.getElementById("HeaderMenu");    
        var taskContent = $(".scrollList");
        if (a.top < 1 && IsFixScroll == false) {
        
        elementMenu.style.position = 'fixed'; 
        notification.style.position = 'fixed'; 
         notification.style.top = "0px";
        elementMenu.style.top = "0px";
            
            
            
            
            
          taskContent.css("margin-top", "40px") //Для плавного входа сдвигаем по достижении
            
            elementBreadCrumbs.style.zIndex = "10";
            elementBreadCrumbs.style.position = 'fixed'; 
            elementBreadCrumbs.style.top = "0px";
           
            fixedScrollValue = b; IsFixScroll = true;
            
        }
        
        if (b < fixedScrollValue) { 
            
            
            elementMenu.style.position = 'relative';
                                   elementBreadCrumbs.style.position = 'relative'; 
                                   notification.style.position = 'relative'; 
                                   elementMenu.style.top = "0px";
                                   notification.style.top = "0px"
                                   taskContent.css("margin-top", "0px")
                                   IsFixScroll = false; }

    }

    


var timerId;




//Выделение введенного ранее времении при получении фокуса
$("body").on("click", "tr.Time input", function(){
    
  var input=$(this);    
  var context=input.closest("td");
  var input1=$("input.hours", context);
  var input2=$("input.minutes", context);   

input.select();   
    
  
input1.addClass("InputWithText");input2.addClass("InputWithText");
    
    //Отключаем проверку на пустоту
   clearInterval(timerId); 
    //Включается проверка каждые 500мс
    timerId = setInterval(function(){
        if (((input.val()>23) && input.hasClass("hours"))||
            ((input.val()>59) && input.hasClass("minutes")))
        
        {input.addClass('InputWarning');}  
        else {input.removeClass('InputWarning');}

    }, 500);
})



//Исчезновение фосуса с input времени
$("body").on("focusout", "tr.Time input", function(){
    
  var input=$(this);
  var inputText=input.val(); 
  var context=input.closest("td");
  var input1=$("input.hours", context);
  var input2=$("input.minutes", context); 

 //Добавление нолика, если пользователь написать 6 вместо 06
if ((inputText<10)){input.val("0"+inputText/1);}              
  //Делаем полупрозрачным Input, если отсутствует значение и по умолчанию==00
 if (((input1.val()=="")&&(input2.val()==""))||((input1.val()=="00")&&(input2.val()=="00")))
      {input1.removeClass("InputWithText");input2.removeClass("InputWithText");
      input1.val("");input2.val("");
      }
 
  
  clearInterval(timerId);              

    //Если через 300мс не произошло перехода на input, То включаем проверку на 00:00 или 00:-- или --:00
  timerId= setTimeout(function(){
      if (((input1.val()=="00")&&(input2.val()==""))||((input1.val()=="")&&(input2.val()=="00")))
      {input1.removeClass("InputWithText");input2.removeClass("InputWithText");
      input1.val("");input2.val("");
      }     
      else{
          //Если одно из поле непустое, а другое пустое, то оно заполняется нулями
          if ((input1.val()=="")&&(input2.val()>0)){input1.val("00");}
          if ((input2.val()=="")&&(input1.val()>0)){input2.val("00");} 
          
      }
      
      
    }, 300);    
  
})


//Выделение введенного ранее времении при получении фокуса
$("body").on("mousedown", "tr.Task input", function(e){
    
var input=this;    
    
    if (input.selectionStart==input.selectionEnd){input.select(); e.preventDefault(); }
    else{
        
        input.value +=' '; input.value = input.value.slice(0, -1);e.preventDefault();
    }
    

})



//Разрешить ввод только цифр в расписании Regular Week
   $("tr.Task input").keydown(function (e) {
       
 if ($(this).hasClass("NewTaskVolume")||$(this).hasClass("NewTaskRepeat")) {     
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

  
 }
    });




//При наведении на ScrollBox появляются стрелки




//------При наведении на ScrollBox появляются стрелки





//Событие при выборе какого-либо пункта в выпадающем списке
/*$(".dropdown-menu a").click(function(){    
    
    var ClickedItem=$(this);
    var HeaderItem=ClickedItem.parents(".dropdown").find('a:first');
    
    var context=ClickedItem.closest("div");
    var ulContext = ClickedItem.closest("ul");
    
    //Проверяем, нужно ли менять надпись на выбранную
    if (context.hasClass("NoChangeHeadLable")==false){
    
        HeaderItem.text(ClickedItem.text());
    
        
        var liElements = $('li', ulContext);
        liElements.removeClass('displayNone');
        
        var CLickedliElement = ClickedItem.closest('li');
        CLickedliElement.addClass('displayNone');
    
    }

   
});
*/
//----Событие при выборе какого-либо пункта в выпадающем списке










//Вызов модального окна Календаря



//Вызов модального окна Списка пользователей
$("body").on("click", ".Users", function(){
   var item = $(this);
    context = item.closest("a");
    var window = $('#ModalUsers');        
        $(".modal-body", window).html('Список пользователей');
   $('#ModalUsers').modal({show:true});   
})







//Добавление новой задачи через input
$("body").on("keyup", "#NewMission", function(event){
    
    if(event.keyCode == 13){
   var input=$(this);
   
    var notification = $("#NotificationText");
        notification.text("Задача добавлена в Список 'Спонтанный'");
  //input.val()
    }
})





//Развертывание Mission
/*$("body").on("show.bs.collapse", ".collapse", function(){
    
    var item=$(this);
    var id = item.attr("id");
    var listGroupItem = $('a.list-group-item[data-target*="'+id+'"]');
    
listGroupItem.addClass("Opened");
   
})*/

//Свертывание Mission
/*$("body").on("hide.bs.collapse", ".collapse", function(){
    
    var item=$(this);
    var id = item.attr("id");
    var listGroupItem = $('a.list-group-item[data-target*="'+id+'"]');
    
listGroupItem.removeClass("Opened");
   
})*/


//Функция для выделения текста в ContentEditable
jQuery.fn.selectText = function() {
  var range, selection;
  return this.each(function() {
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(this);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
};


