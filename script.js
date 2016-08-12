/* globals angular */
var arjuna = angular.module('arjuna', ['ngRoute', 'ngResource']);

arjuna.config(function ($routeProvider) {
  $routeProvider

    .when('/signup', {
      templateUrl: './pages/signup.html',
      controller: 'signupController'
    })

    .when('/login', {
      templateUrl: './pages/login.html',
      controller: 'loginController'
    })
    .when('/logout', {
      templateUrl: './pages/logout.html',
      controller: 'logoutController'
    })
    .when('/promos', {
      templateUrl: './pages/promo.html',
      controller: 'promoController'
    });
});

// ADD a Promo
arjuna.controller('addController', ['$scope', '$http', '$route', function ($scope, $http, $route) {
  // $scope.promoTitle = '';
  // $scope.promoAmount = '';
  // $scope.promoDate = '';
  // $scope.promoDetail = '';
  $scope.addPromo = function () {
    $http.post('https://arjuna.herokuapp.com/promo/add', {promoTitle: $scope.promoTitle, promoAmount: $scope.promoAmount, promoDate: $scope.promoDate, promoDetail: $scope.promoDetail})
      .success(function (promos) {
        $scope.promoTitle = '';
        $scope.promoAmount = '';
        $scope.promoDate = '';
        $scope.promoDetail = '';
        $route.reload();
        $scope.allPromos = promos;
      });
  };
}]);

// Sign-up controller
arjuna.controller('signupController', ['$scope', '$http', function ($scope, $http) {
  console.log('Signup Controller initialized...');

  $scope.runSignup = function () {
    $http.post('https://arjuna.herokuapp.com/signup', {
      email: $scope.email,
      password: $scope.password
    })
    .then(function onSuccess (response) {
      console.log('Signup successfull!');
      window.localStorage.email = $scope.email;
      window.localStorage.password = $scope.password;
      window.location = '#/promos';
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
    });
  };
}]);

// Log-in controller
arjuna.controller('loginController', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
  console.log('Login Controller initialized...');
  $scope.login = function () {
    $scope.email;
    $scope.password;

    $http.post('https://arjuna.herokuapp.com/login', {
      email: $scope.email,
      password: $scope.password
    }).then(function onSuccess (response) {
      console.log('login from angular success!');
      window.localStorage.email = $scope.email;
      window.localStorage.password = $scope.password;
      window.location = '#/promos';
      document.getElementById('navPromos').style.visibility = 'visible';
      document.getElementById('navLogout').style.visibility = 'visible';
      document.getElementById('navSignup').style.visibility = 'hidden';
      document.getElementById('navLogin').style.visibility = 'hidden';
      document.getElementById('addButton').style.visibility = 'visible';
    })
    .catch(function onError (err) {
      console.log('Error: ' + err);
    });
  };
}]);

// Log-out controller
arjuna.controller('logoutController', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
  $scope.message = 'Logged Out';
  $http.get('https://arjuna.herokuapp.com/logout')
    .then(function onSuccess () {
      console.log('logged out');
      window.localStorage.clear();
      window.location = '#/login';
      document.getElementById('navPromos').style.visibility = 'hidden';
      document.getElementById('navLogout').style.visibility = 'hidden';
      document.getElementById('navSignup').style.visibility = 'visible';
      document.getElementById('navLogin').style.visibility = 'visible';
      document.getElementById('addButton').style.visibility = 'hidden';
    });
}]);

// Promos
arjuna.controller('promoController', ['$scope', '$location', '$http', '$route', function ($scope, $location, $http, $route) {
  console.log('Promos page initialized...');
  if (window.localStorage.email && window.localStorage.password) {
    // GET All Promos
    $http.get('https://arjuna.herokuapp.com/promos')
      .success(function (promos) {
        $scope.allPromos = promos;
        $scope.message = 'Logged-in! Hence you can see Promos!';
      })
      .error(function (err) {
        console.log('Error: ' + err);
        $scope.message = 'Error! Not Logged-in';
      });

    // EDIT a Promo
    $scope.editPromo = function (data) {
      console.log(data);
      $http.put('https://arjuna.herokuapp.com/promo/edit/' + data, {promoTitle: $scope.promoTitle, promoAmount: $scope.promoAmount, promoDate: $scope.promoDate, promoDetail: $scope.promoDetail})
        .success(function (promos) {
          console.log('yayy');
          $route.reload();
        });
    };

    // $scope.editInput = function ($index, data) {
    //   console.log(data);
    //   console.log($index);
    //   $scope.promoTitle[0] = data.promoTitle;
    //   $scope.promoAmount[0] = data.promoAmount;
    //   $scope.promoDate[0] = data.promoDate;
    //   $scope.promoDetail[0] = data.promoDetail;
    // };

    // Delete a promo
    $scope.delPromo = function (data) {
      $http.delete('https://arjuna.herokuapp.com/promo/delete/' + data)
        .success(function (promos) {
          $route.reload();
          // $scope.allPromos = promos;
        })
        .error(function (err) {
          console.log('Error: ' + err);
          $scope.message = 'Error! Not Logged-in';
        });
    };
  } else {
    console.log('not logged in');
  }
}]);
