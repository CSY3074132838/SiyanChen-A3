// 活动详情控制器
angular.module('charityHub')
  .controller('EventController', ['$scope', '$routeParams', 'ApiService', 'AuthService', function($scope, $routeParams, ApiService, AuthService) {
    $scope.event = null;
    $scope.registrations = [];
    $scope.loading = true;
    $scope.registerForm = {
      name: '',
      email: '',
      phone: ''
    };
    $scope.showRegisterForm = false;
    $scope.registerSuccess = false;
    
    // 加载活动详情
    $scope.loadEvent = function() {
      $scope.loading = true;
      
      ApiService.getEvent($routeParams.id)
        .then(function(response) {
          if (response.data.success) {
            $scope.event = response.data.event;
            $scope.registrations = response.data.registrations || [];
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          $scope.loading = false;
        });
    };
    
    // 显示注册表单
    $scope.showRegister = function() {
      if (!AuthService.isLoggedIn()) {
        alert('Please login first');
        return;
      }
      $scope.showRegisterForm = true;
    };
    
    // 提交注册
    $scope.submitRegistration = function() {
      if (!$scope.registerForm.name || !$scope.registerForm.email) {
        alert('Please fill in required information');
        return;
      }
      
      const registrationData = {
        event_id: $routeParams.id,
        name: $scope.registerForm.name,
        email: $scope.registerForm.email,
        phone: $scope.registerForm.phone
      };
      
      ApiService.registerEvent(registrationData)
        .then(function(response) {
          if (response.data.success) {
            $scope.registerSuccess = true;
            $scope.showRegisterForm = false;
            $scope.loadEvent(); // 重新加载活动信息
          } else {
            alert('Registration failed: ' + (response.data.message || 'Unknown error'));
          }
        })
        .catch(function(error) {
          alert('Registration failed, please try again later');
        });
    };
    
    // 初始化
    $scope.loadEvent();
  }]);
