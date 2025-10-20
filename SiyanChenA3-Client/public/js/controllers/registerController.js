// 注册控制器
angular.module('charityHub')
  .controller('RegisterController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.registerForm = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    $scope.loading = false;
    
    // 注册
    $scope.register = function() {
      if (!$scope.registerForm.username.trim()) {
        alert('Please enter username');
        return;
      }
      
      if (!$scope.registerForm.email.trim()) {
        alert('Please enter email');
        return;
      }
      
      if ($scope.registerForm.password !== $scope.registerForm.confirmPassword) {
        alert('Password confirmation does not match');
        return;
      }
      
      $scope.loading = true;
      
      // 模拟注册过程
      setTimeout(function() {
        AuthService.login($scope.registerForm.username);
        $scope.$apply(function() {
          $scope.loading = false;
          $location.path('/');
        });
      }, 500);
    };
  }]);
