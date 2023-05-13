var app = angular.module("myapp", []);
app.controller("abc", function ($scope, $http) {
  // Tạo hàm lấy list sản phẩm
  var getPeople = function() {
    $http.get("https://63f187265b7cf4107e32985f.mockapi.io/lab/people").then(function (response) {
      $scope.people = response.data;
    });
  }

  getPeople();

  $scope.getDetail = function (id) {
    $http.get("https://63f187265b7cf4107e32985f.mockapi.io/lab/people/" + id).then(function (response) {
        // Xem chi tiết theo Id
        $scope.getPeopleById = response.data;
      });
  };

  function getData() {
    var data = {
      "firstName": $scope.firstName,
      "email": $scope.email,
      "country": $scope.country,
      "city": $scope.city,
    }

    var isValid = true;
      if ($scope.firstName == "") {
        alert("Please enter a First name");
        isValid = false;
      }
      if ($scope.email == "") {
        alert("Please enter a Email");
        isValid = false;
      }
      if ($scope.country == "") {
        alert("Please enter a Country");
        isValid = false;
      }
      if ($scope.city == "") {
        alert("Please enter a City");
        isValid = false;
      }
      if (isValid == true) {
        return data;
      } else {
        return null;
      }
  }
  
  $scope.add = function() {
    if(getData() != null) {
      $http.post("https://63f187265b7cf4107e32985f.mockapi.io/lab/people", getData()).then(function(response) {  
        getPeople();
        alert("Added");
      });
      console.log(getData()); 
    }
  }

  $scope.update = function(id) {
    if(getData() != null) {
      $http.put("https://63f187265b7cf4107e32985f.mockapi.io/lab/people/" + id, getData()).then(function(response) {
        getPeople();
        alert("Updated");
    });
    }
  }

  $scope.delete = function(id) {
    $http.delete("https://63f187265b7cf4107e32985f.mockapi.io/lab/people/" + id).then(function(response) {
    $scope.people.splice(id, 1);
    alert("Deleted");    
    getPeople();
    });
  }



});