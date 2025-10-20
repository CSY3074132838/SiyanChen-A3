// 登录控制器
angular.module('charityHub')
  .controller('LoginController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.loginForm = {
      username: ''
    };
    $scope.loading = false;
    
    // 登录
    $scope.login = function() {
      if (!$scope.loginForm.username.trim()) {
        alert('Please enter username');
        return;
      }
      
      $scope.loading = true;
      
      // 模拟登录过程
      setTimeout(function() {
        AuthService.login($scope.loginForm.username);
        $scope.$apply(function() {
          $scope.loading = false;
          $location.path('/');
        });
      }, 500);
    };
  }]);
