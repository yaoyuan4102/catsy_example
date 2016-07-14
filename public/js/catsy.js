/**
 * Created by Taylor on 2016/7/11.
 */
var app = angular.module('CatsyApp', []);
app.controller('CatsyController', function($scope, $http) {

    $http.get("category.json")
        .success(function(response) {
            $scope.categories = response;
            console.log($scope.categories);
        });


    $http.get("catalog-json.json")
        .success(function(response) {
            $scope.items = response;
            $scope.item_num = response.length;
            //console.log($scope.items[0].lists[0].rows[0]);
        });

    //$scope.choose = function(cate) {
    //    console.log(cate);
    //}

    $scope.layout = function(num) {
        if(num == 1){
            $(".items").attr("class", "items col-md-12 col-sm-12 col-xs-12");
        }else if(num == 2){
            $(".items").attr("class", "items col-md-6 col-sm-6 col-xs-6");
        }else if(num == 4){
            $(".items").attr("class", "items col-md-3 col-sm-3 col-xs-3");
        }
    }

    $scope.kobj = {};
    $scope.$watch('kobj.name',function(newValue,oldValue,scope){
        if(newValue !== oldValue && newValue.length >2){
            var name = newValue.toLowerCase();
            var tempItems = [];
            for(var i=0;i<$scope.items.length;i++){
                console.log($scope.items[i]);
                var itemName = $scope.items[i].lists[0].rows[0].values[0];
                itemName = itemName.toLowerCase();
                var temp = itemName.search(name);
                console.log(temp);
                if(temp+1){
                    var tempTour = $scope.items[i];
                    tempItems.push(tempTour);
                }
            }
            $scope.items = tempItems;
            $scope.item_num = $scope.items.length;
            console.log(tempItems);
            //$scope.search($scope.kobj);
        }else{
            $http.get("catalog-json.json")
                .success(function(response) {
                    $scope.items = response;
                    $scope.item_num = response.length;
                    //console.log($scope.items[0].lists[0].rows[0]);
                });
        }
    });
});
