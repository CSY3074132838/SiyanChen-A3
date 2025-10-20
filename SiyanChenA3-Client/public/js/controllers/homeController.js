// 首页控制器
angular.module('charityHub')
  .controller('HomeController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.events = [];
    $scope.loading = true;
    $scope.error = null;
    
    // 加载首页活动
    $scope.loadEvents = function() {
      $scope.loading = true;
      $scope.error = null;
      
      ApiService.getHomeEvents()
        .then(function(response) {
          if (response.data.success) {
            $scope.events = response.data.data;
          } else {
            $scope.error = 'Failed to load events';
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          $scope.error = 'Network error, please try again later';
          $scope.loading = false;
        });
    };
    
    // 初始化
    $scope.loadEvents();
  }]);
