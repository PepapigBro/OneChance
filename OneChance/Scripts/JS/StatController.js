var onechanceApp = angular.module("onechanceApp");

onechanceApp.controller("StatController", function($scope){
 //  $scope.Type;
 //  $scope.currentItem=0;

  // $scope.mission;
   
    //$scope.$broadcast("UpdateStatScope", { source: source, data: data });
    $scope.$on('UpdateStatScope', function (event, data) {

        
        $scope[data.source] = data.data;
      //  alert("update1")
        //$scope.mission = $scope.intent.Mission;
        
        $scope.$apply();
       // alert("update2")
    })

}
)


onechanceApp.directive('clTest', function () {
    return function (scope, element, attrs) {

       


       
        //element.on('click', function () {
        //   alert("click")
        //})
    }
})




