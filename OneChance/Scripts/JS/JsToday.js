
//










//Разрешить ввод только цифр в Поле ввода реального количества объема
   $("div.InputRealVolume").keydown(function (e) {
       var input=$(this);
       
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

       //Ограничение по количеству символов
        var number = input.text().length;
        if (number>7){return false;}

    });



//Фиксация фона при нажатии
$("body").on("click", "#Tasks .list-group-item", function(){
    
    var allItems = $("#Tasks .list-group-item").removeClass("Opened");
    var item=$(this);
    
item.toggleClass("Opened");
   
})

