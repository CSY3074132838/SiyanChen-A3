// 注册管理控制器
angular.module('charityHubAdmin')
  .controller('RegistrationsController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.registrations = [];
    $scope.loading = true;
    $scope.error = null;
    
    // 加载所有注册
    $scope.loadRegistrations = function() {
      $scope.loading = true;
      $scope.error = null;
      
      ApiService.getAllRegistrations()
        .then(function(response) {
          if (response.data.success) {
            $scope.registrations = response.data.data;
          } else {
            $scope.error = 'Failed to load registrations';
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          $scope.error = 'Network error, please try again later';
          $scope.loading = false;
        });
    };
    
    // 初始化
    $scope.loadRegistrations();
  }]);
