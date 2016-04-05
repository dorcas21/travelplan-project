'use strict';

angular.module('myApp.view', ['ngRoute'])

.config(["$httpProvider", function ($httpProvider) {
      $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
      $httpProvider.defaults.xsrfCookieName = "csrftoken";
      $httpProvider.defaults.headers.common = {
          "Content-Type": "application/json",
          "Accept": "application/json, */*"
      };
  }])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/signup/travel', {
        templateUrl: 'view1/vieww1.html',
        controller: 'View1Ctrl'
      })
  .when('/signup/budget/:id', {
        templateUrl: 'view1/budget.html',
        controller: 'View1Ctrl'

  })
  .when('/signup/details/:id',{
        templateUrl: 'view1/details.html',
        controller: 'View1Ctrl'

  })
  .when('/signup/travels',{
        templateUrl: 'view1/travels.html',
        controller: 'View1Ctrl'
  })

  .when('/signup/travels/edit/:id',{
        templateUrl: 'view1/edit_travel.html',
        controller: 'EditTravelCtrl'
  })

  .when('/signup/travels/editbudget/:id',{
        templateUrl: 'view1/editbudget.html',
        controller: 'EditBudgetCtrl'
  })

  .when('/signup/travels/editdetail/:id',{
        templateUrl: 'view1/editdetail.html',
        controller: 'EditDetailCtrl'
  })

  .when('/signup/travels/viewtravel/',{

        templateUrl: 'view1/viewtravels.html',
        controller: 'View1Ctrl'
  })
  .when('/signup/travels/editt/:id', {
        templateUrl: 'view1/viewone.html',
        controller: 'ViewOneCtrl'


  })

  .when('/signup/travels/viewb/:id', {
        templateUrl: 'view1/viewtwo.html',
        controller: 'ViewTwoCtrl'

  })

  .when('/signup/travels/viewc/:id', {
      templateUrl: 'view1/viewthree.html',
      controller: 'ViewThreeCtrl'

  })

  .when('/signup/travels/viewall/:id', {

      templateUrl: 'view1/viewall.html',
      controller: 'ViewAllCtrl'
  })

  .when('/signup/travels/viewalll/:id', {

        templateUrl: 'view1/viewalll.html',
        controller: 'ViewAllCtrl'
  })
  ;

}])

.service("api", ["$http", function ($http) {
  var m = this;

  m.get = function get (url) {
    return $http.get(url);
  };

  m.post = function post (url, data) {
    return $http.post(url, data);
  };

  m.update = function update (url, id, data) {
    var update_url = url + id  + '/';
    return $http.put(update_url, data);
  };

  m.delete = function del (url, id) {
    var delete_url = url + id + '/';
    return $http.delete(delete_url);
  };
}])

.service("dateConverter", function () {
  this.convertDates = function (date_obj) {
    var date = new Date(date_obj);
    var year = String(date.getFullYear());
    var month = String(date.getMonth()+1);
    var day = String(date.getDate());

    return year + "-" + month + "-" + day;
  }
})

.controller('View1Ctrl', ["$scope", "api", "dateConverter", "$location", "$routeParams", function($scope, api, dateConverter, $location, $routeParams) {
 var travel_id = $routeParams.id;
  var url = "http://localhost:8080/api/user/"
  var travel_url = "http://localhost:8080/api/travel/";
  $scope.register = function(){
    api.post(url, $scope.travel).then (function response (data) {

      $location.path('signup/travel')
      console.log("Dta", data);
    }, function error (err) {
      throw err;
    });
  }

  api.get(url).then(function response (users) {
    $scope.users = users.data.results;
  }, function error (err) {
    throw err;
  });

   $scope.openPopup = function() {
    $scope.popup = {};
    $scope.popup.open = true;
  };

  $scope.openPopup1 = function() {
    $scope.popup1 = {};
    $scope.popup1.open = true;
  };



api.get(travel_url).then(function response (travels) {
    $scope.travels = travels.data.results;
  }, function error (err) {
    throw err;
  }); 

  $scope.create = function(){
    $scope.travel.start_date = dateConverter.convertDates($scope.travel.start_date);
      $scope.travel.end_date = dateConverter.convertDates($scope.travel.end_date);
    api.post(travel_url, $scope.travel).then (function response (data){
    

      $location.path('signup/budget/' + data.data.id)
      console.log("ddata", data);
    }, function error (err){
      throw err;
    });
  }

  $scope.delete = function(id, index){
    console.log("Delete", id);
    api.delete(travel_url, id).then (function response (data){

      console.log("dddddddata", data);
      $scope.travels.splice(index, 1);
    }, function error (err){
      throw err;
    });

  }

  $scope.budget = function(){
    url = "http://localhost:8080/api/budget/"
    $scope.travel.travel = travel_id
    console.log($scope.travel.travel)
    api.post(url, $scope.travel).then (function response (data){

    $location.path('/signup/details/' + travel_id)      
  console.log("datahere", data);

    }, function error (err){
      throw err;
    });

  }

  $scope.details = function(){

    url = "http://localhost:8080/api/details/"
    $scope.travel.travel = travel_id
    api.post(url, $scope.travel). then (function response (data){
      
      console.log("itshere", data);
    }, function error (err){
      throw err;
    });

  }

  

}])

.controller('EditTravelCtrl', ["$routeParams", "$scope", "$location", "api", "dateConverter", function ($routeParams, $scope, $location, api, dateConverter) {

    var travel_id = $routeParams.id;

    var travel_url = "http://localhost:8080/api/travel/"
    // "http://localhost:8080/api/travel/2
    api.get(travel_url + travel_id).then(function response(data) {
      console.log(data);
      var travel_data = data.data;
      // model
      $scope.travel = {};
      $scope.travel.travel_name = travel_data.travel_name
      $scope.travel.travel_meeting = travel_data.travel_meeting
      $scope.travel.travel_venue = travel_data.travel_venue
      $scope.travel.start_date = new Date(travel_data.start_date)
      $scope.travel.end_date = new Date(travel_data.end_date)
      $scope.travel.travel_days = travel_data.travel_days

    
    },function (err) {
      console.log(err);
    });

    
    $scope.update = function () {
      $scope.travel.start_date = dateConverter.convertDates($scope.travel.start_date);
      console.log($scope.travel.start_date);
      $scope.travel.end_date = dateConverter.convertDates($scope.travel.end_date);
      api.update(travel_url, travel_id, $scope.travel).then (function response (data){

        $location.path('/signup/travels/editbudget/' + travel_id)
        console.log("dddatahere", data);
      }, function error (err){
        throw err;
      });
  }




  $scope.delete = function(id){
    console.log("Delete", id);
    api.delete(travel_url, id).then (function response (data){

      console.log("dddddddata", data);
    }, function error (err){
      throw err;
    });

  }

  $scope.openPopup = function() {
    $scope.popup = {};
    $scope.popup.open = true;
  };

  $scope.openPopup1 = function() {
    $scope.popup1 = {};
    $scope.popup1.open = true;
  };

}])










.controller('EditBudgetCtrl', ["$routeParams", "$scope", "api", "$location", "dateConverter", function($routeParams, $scope, api, $location, dateConverter) {

  var travel_id = $routeParams.id;
  console.log(travel_id)
  var budget_url = "http://localhost:8080/api/budget/"


  api.get(budget_url + travel_id).then(function response(data) {
      console.log("budgetData", data);
      var budget_data = data.data;
      // model
      $scope.travel = {};
      $scope.travel.budget_line = budget_data.budget_line
      $scope.travel.budget_cost = budget_data.budget_cost
      $scope.travel.additional_cost = budget_data.additional_cost
      $scope.travel.budget = budget_data.budget
      $scope.travel.budget_balance = budget_data.budget_balance

    
    },function (err) {
      console.log("Budget Get Error", err);
    });


  $scope.updatebudget = function () {
      $scope.travel.travel=travel_id;
      console.log('travel_id',$scope.travel.travel)
      console.log('budget data before',$scope.travel)
      api.update(budget_url, travel_id, $scope.travel).then(function response(data){
        $location.path('/signup/travels/editdetail/' + travel_id)
        console.log('budget data after',$scope.travel)
        console.log("Itsawesome", data);
      }, function error (err){
        console.log("Error", err)
        throw err;
      });
  }





}])















.controller('EditDetailCtrl', ["$routeParams", "$scope", "api", "dateConverter", "$location", function($routeParams, $scope, api, dateConverter, $location){

  var travel_id = $routeParams.id;
  var detail_url = "http://localhost:8080/api/details/"

  api.get(detail_url + travel_id). then(function response(data) {

    console.log("detail data here", data);

    var detail_data = data.data;

    $scope.travel = {}
    $scope.travel.justification = detail_data.justification
    $scope.travel.project_details = detail_data.project_details
    $scope.travel.region = detail_data.region
    $scope.travel.communication_details = detail_data.communication_details
    $scope.travel.date = detail_data.date
    $scope.travel.department = detail_data.department
    $scope.travel.status = detail_data.status
    $scope.travel.report = detail_data.report

  }, function(err) {

    console.log("detail get error", err);
  });


  $scope.updatedetail = function() {
     $scope.travel.travel=travel_id;
     api.update(detail_url, travel_id, $scope.travel).then (function response(data) {
      $location.path('/signup/travels/');
      console.log("this is updated details", data)


     }, function error (err){

      console.log("error here", err)
      throw err;
     });

}



}])






.controller('ViewOneCtrl', ["$routeParams", "$scope", "$location", "api", "dateConverter", function ($routeParams, $scope, $location, api, dateConverter) {

    var travel_id = $routeParams.id;

    var travel_url = "http://localhost:8080/api/travel/"
    // "http://localhost:8080/api/travel/2
    api.get(travel_url + travel_id).then(function response(data) {
      console.log(data);
      var travel_data = data.data;
      // model
      $scope.travel = {};
      $scope.travel.travel_name = travel_data.travel_name
      $scope.travel.travel_meeting = travel_data.travel_meeting
      $scope.travel.travel_venue = travel_data.travel_venue
      $scope.travel.start_date = new Date(travel_data.start_date)
      $scope.travel.end_date = new Date(travel_data.end_date)
      $scope.travel.travel_days = travel_data.travel_days

    
    },function (err) {

      
      console.log(err);
    });

    
    $scope.gonext = function () {
      $/*scope.travel.start_date = dateConverter.convertDates($scope.travel.start_date);
      console.log($scope.travel.start_date);
      $scope.travel.end_date = dateConverter.convertDates($scope.travel.end_date);*/
      api.get(travel_url, travel_id, $scope.travel).then (function response (data){

        $location.path('/signup/travels/viewb/' + travel_id)
       /* console.log("dddatahere", data);*/
      }, function error (err){
        throw err;
      });
  }




  $scope.delete = function(id){
    console.log("Delete", id);
    api.delete(travel_url, id).then (function response (data){

      console.log("dddddddata", data);
    }, function error (err){
      throw err;
    });

  }

  $scope.openPopup = function() {
    $scope.popup = {};
    $scope.popup.open = true;
  };

  $scope.openPopup1 = function() {
    $scope.popup1 = {};
    $scope.popup1.open = true;
  };

}])







.controller('ViewTwoCtrl', ["$routeParams", "$scope", "api", "$location", "dateConverter", function($routeParams, $scope, api, $location, dateConverter) {

  var travel_id = $routeParams.id;
  console.log(travel_id)
  var budget_url = "http://localhost:8080/api/budget/"


  api.get(budget_url + travel_id).then(function response(data) {
      /*console.log("budgetData", data);*/
      var budget_data = data.data;
      // model
      $scope.travel = {};
      $scope.travel.budget_line = budget_data.budget_line
      $scope.travel.budget_cost = budget_data.budget_cost
      $scope.travel.additional_cost = budget_data.additional_cost
      $scope.travel.budget = budget_data.budget
      $scope.travel.budget_balance = budget_data.budget_balance

    
    },function (err) {
      console.log("Budget Get Error", err);
    });


  $scope.gonext = function () {
      $scope.travel.travel=travel_id;
      console.log('travel_id',$scope.travel.travel)
      console.log('budget data before',$scope.travel)
      api.update(budget_url, travel_id, $scope.travel).then(function response(data){

        $location.path('/signup/travels/viewc/' + travel_id)

        console.log('budget data after',$scope.travel)
        console.log("Itsawesome", data);
      }, function error (err){
        console.log("Error", err)
        throw err;
      });
  }





}])





.controller('ViewThreeCtrl', ["$routeParams", "$scope", "api", "dateConverter", "$location", function($routeParams, $scope, api, dateConverter, $location){

  var travel_id = $routeParams.id;
  var detail_url = "http://localhost:8080/api/details/"
  $scope.travelID = travel_id;
  api.get(detail_url + travel_id). then(function response(data) {

    /*console.log("detail data here", data);*/

    var detail_data = data.data;

    $scope.travel = {}
    $scope.travel.justification = detail_data.justification
    $scope.travel.project_details = detail_data.project_details
    $scope.travel.region = detail_data.region
    $scope.travel.communication_details = detail_data.communication_details
    $scope.travel.date = detail_data.date
    $scope.travel.department = detail_data.department
    
    

  }, function(err) {

    console.log("detail get error", err);
  });


 

  $scope.gonext = function() {
     $scope.travel.travel=travel_id;
     api.update(detail_url, travel_id, $scope.travel).then (function response(data) {
      $location.path('/signup/travels/');
      console.log("this is updated details", data)


     }, function error (err){

      console.log("error here", err)
      throw err;
     });

}



}])








.controller('DeleteTravelCtrl', ["$routeParams", "$scope", "api", "dateConverter",  
  function ($routeParams, $scope, api, dateConverter){

    var travel_id = $routeParams.id;

    var travel_url = "http://localhost:8080/api/travel/"
   

    api.get(travel_url + travel_id).then(function response(data) {
      console.log(data);
    
    },function (err) {
      console.log(err);
    });

}])




.controller('ViewAllCtrl', ["$routeParams", "$scope", "$location", "api", "dateConverter", 
  function ($routeParams, $scope, $location, api, dateConverter) {

    var travel_id = $routeParams.id;

    var travel_url = "http://localhost:8080/api/travel/"
    // "http://localhost:8080/api/travel/2
    api.get(travel_url + travel_id).then(function response(travel) {
      console.log("Travel name", travel.data.travel_name);
      // model
      // $scope.travel = {};
      $scope.travel_name = travel.data.travel_name
      $scope.travel_meeting = travel.data.travel_meeting
      $scope.travel_venue = travel.data.travel_venue
      $scope.start_date = new Date(travel.data.start_date)
      $scope.end_date = new Date(travel.data.end_date)
      $scope.status = travel.data.status
      $scope.travel_days =travel.data.travel_days

    
    },function (err) {
      console.log(err);
    });

    $scope.confirmTravel = function confirmTravel (id) {
    var url = "http://localhost:8080/api/travel/";
    console.log("Travel", $scope.status);
    $scope.status = 1;
    api.update(url, id, $scope.status).then (function (travel) {
      console.log("Update", travel);
    });
  };



  
  var budget_url = "http://localhost:8080/api/budget/"


  api.get(budget_url + travel_id).then(function response(data) {
      console.log("budgetData", data);
      var budget_data = data.data;
      // model
      // $scope.travel = {};
      $scope.budget_line = budget_data.budget_line
      $scope.budget_cost = budget_data.budget_cost
      $scope.additional_cost = budget_data.additional_cost
      $scope.budget = budget_data.budget
      $scope.budget_balance = budget_data.budget_balance

    
    },function (err) {
      console.log("Budget Get Error", err);
    });



 
  var detail_url = "http://localhost:8080/api/details/"

  api.get(detail_url + travel_id). then(function response(data) {

    console.log("detail data here", data);

    var detail_data = data.data;

    $scope.travel = {}
    $scope.travel.justification = detail_data.justification
    $scope.travel.project_details = detail_data.project_details
    $scope.travel.region = detail_data.region
    $scope.travel.communication_details = detail_data.communication_details
    $scope.travel.date = detail_data.date
    $scope.travel.department = detail_data.department
    $scope.travel.report = detail_data.report

  }, function(err) {

    console.log("detail get error", err);
  });


   

  

}]);

