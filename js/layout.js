var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/view/home", {
      templateUrl: "subjects.html"
    })
    .when("/view/about", {
      templateUrl: "about.html"
    })
    .when("/view/contact", {
      templateUrl: "contact.html"
    })
    .when("/view/feedback", {
      templateUrl: "feedback.html"
    })
    .when("/view/faq", {
      templateUrl: "faq.html"
    })
    .when("/view/changepass", {
      templateUrl: "changepass.html"
    })
    .when("/view/updateinfo", {
      templateUrl: "updateinfo.html"
    })
    .when("/view/quiz/:id/:name", {
      templateUrl: "quiz.html",
      controller: "quiz123"
    })
    .when("/view/admin", {
      templateUrl: "admin.html",
      controller: "abc"
    })
    .otherwise({
      redirectTo: "/view/home"
    });
});
app.controller("quiz123", function ($scope, $http, $routeParams) {
  $scope.quizId = $routeParams.id;
  $scope.quizName = $routeParams.name;
  $http.get("db/Quizs/" + $scope.quizId + ".js").then(function (response) {
    $scope.listQuizs = response.data;
    $scope.summark = ((Math.ceil($scope.listQuizs.length / 1) - 1) * 1);
  }, function (response) {
    alert("lỗi")
  });
  // phân trang Quizz
  $scope.begin = 0;
  $scope.first = function () {
    $scope.begin = 0;
  }
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 1;
    }

  }
  $scope.next = function () {
    $scope.begin += 1;

  }
  $scope.last = function () {
    $scope.begin = $scope.summark;
  }

  // kết thúc phân trang Quizz
});
app.controller("myctrl", function ($scope, $http) {
  $scope.listMonHocs = [];
  $http.get("db/Subjects.js").then(function (response) {
    $scope.listMonHocs = response.data;
    $scope.sum = ((Math.ceil($scope.listMonHocs.length / 8) - 1) * 8);
  });
  $scope.begin = 0;
  $scope.first = function () {
    $scope.begin = 0;
  }
  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 8;
    }
  }
  $scope.next = function () {
    if ($scope.begin < $scope.sum) {
      $scope.begin += 8;
    }
  }
  $scope.last = function () {
    $scope.begin = $scope.sum;
  }
  $scope.mark = 0;
  var checkTraLoi = $scope.traLoi = {
    checked: ""
  };
  $scope.subMit = function () {
    var a = $("#cauTraLoi").val();
    var b = $("#dapAn").val();
    if (parseInt(a) == parseInt(b)) {
      Swal.fire(
        'Chính xác!',
        'Bạn trả lời đúng!',
        'success'
      )
      $scope.mark = $scope.mark + 1;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Không trùng khớp',
        text: 'Bạn trả lời sai!'
      })
    }
  }

  var getPeople = function () {
    $http.get("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user").then(function (response) {
      $scope.people = response.data;
    });
  }
  getPeople();

  
  
  $scope.getId = localStorage.getItem('id');
  $scope.update = function (id) {

function getData() {
          console.log($scope.people.fullname);
          console.log($scope.people.email);

          var data = {
            "fullname": $scope.people.fullname,
            "email": $scope.people.email,
            "password": localStorage.getItem('password'),
            "role": localStorage.getItem('role'),
            "birthday": $scope.people.birthday,
            "gender": $scope.people.gender,
            "marks": localStorage.getItem('marks'),
            "schoolfee": localStorage.getItem('schoolfee'),
            "username": localStorage.getItem('username'),
          }
          return data;
        }

    $http.put("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user/" + id, getData()).then(function (response) {
      getPeople();
      Swal.fire(
        'Thành Công',
        'Cập nhật thành công!',
        'success'
      )
    });
  }
  $scope.changePassword = function (id) {
    console.log($scope.people.passwordHT);
    console.log($scope.people.passwordNew);
    console.log($scope.people.passwordCf)


    if ($scope.people.passwordHT == localStorage.getItem('password')) {
      if ($scope.people.passwordNew == $scope.people.passwordCf) {
        $scope.people.password = $scope.people.passwordNew;

        function getData() {

          var data = {
            "fullname": localStorage.getItem('name'),
            "email": localStorage.getItem('email'),
            "password": $scope.people.passwordNew,
            "role": localStorage.getItem('role'),
            "birthday": localStorage.getItem('birthday'),
            "gender": localStorage.getItem('gender'),
            "marks": localStorage.getItem('marks'),
            "schoolfee": localStorage.getItem('schoolfee'),
            "username": localStorage.getItem('username'),
          }
          return data;
        }
        $http.put("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user/" + id, getData()).then(function (response) {
          getPeople();
          Swal.fire(
            'Thành Công',
            'Cập nhật thành công!',
            'success'
          )
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Không trùng khớp',
          text: 'Mật khẩu mới và mật khẩu xác nhận phải trùng khớp!'
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Không trùng khớp',
        text: 'Bạn trả lời sai!'
      })
    }
  }
  var indexS = localStorage.getItem('id');
  // check login
  if (indexS == null) {
    $scope.checkLogin = "TÀI KHOẢN";
    $scope.checkLogin1 = 0;
  } else {
    $scope.checkLogin = localStorage.getItem('name');
    $scope.checkLogin1 = 1;
    if (console.log(localStorage.getItem('role'))) {
      $scope.checkRole = 1;
    }else{
      $scope.checkRole = 0;
    }
  }
  console.log($scope.checkRole);
  $scope.logout = function () {
    localStorage.setItem('role',0);
    localStorage.clear();
    window.location = "index.html";
  }
  
});
var upgradeTime = 600;
var seconds = upgradeTime;

function timer() {
  var days = Math.floor(seconds / 24 / 60 / 60);
  var hoursLeft = Math.floor((seconds) - (days * 86400));
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
  var minutes = Math.floor(minutesLeft / 60);
  var remainingSeconds = seconds % 60;

  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  //kiểm tra sự tồn tại của cowndown
  if (document.getElementById('countdown')) {
    document.getElementById('countdown').innerHTML = pad(minutes) + ":" + pad(remainingSeconds);
  }
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "Completed";
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval('timer()', 1000);


app.controller("abc", function ($scope, $http) {
  // Tạo hàm lấy list sản phẩm
  var getPeople = function () {
    $http.get("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user").then(function (response) {
      $scope.people = response.data;
    });
  }

  getPeople();

  $scope.getDetail = function (id) {
    $http.get("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user/" + id).then(function (response) {
      // Xem chi tiết theo Id
      $scope.getPeopleById = response.data;
    });
  };

  function getData() {
    var data = {
      "fullname": $scope.fullname,
      "email": $scope.email,
      "username": $scope.username,
      "birthday": $scope.birthday,
      "gender": $scope.gender
    }

    var isValid = true;
    if ($scope.fullname == "") {
      alert("Please enter a First name");
      isValid = false;
    }
    if ($scope.email == "") {
      alert("Please enter a Email");
      isValid = false;
    }
    if ($scope.username == "") {
      alert("Please enter a username");
      isValid = false;
    }
    if ($scope.birthday == "") {
      alert("Please enter a birthday");
      isValid = false;
    }
    if ($scope.gender == "") {
      alert("Please enter a gender");
      isValid = false;
    }
    if (isValid == true) {
      return data;
    } else {
      return null;
    }

  }

  $scope.add = function () {
    if (getData() != null) {
      $http.post("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user", getData()).then(function (response) {
        getPeople();
        alert("Added");
      });
      console.log(getData());
    }
  }

  $scope.update = function (id) {
    if (getData() != null) {
      $http.put("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user/" + id, getData()).then(function (response) {
        getPeople();
        alert("Updated");
      });
    }
  }

  $scope.delete = function (id) {
    $http.delete("https://63f30910de3a0b242b39431c.mockapi.io/api/phuongtx/user/" + id).then(function (response) {
      $scope.people.splice(id, 1);
      alert("Deleted");
      getPeople();
    });
  }
});
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}