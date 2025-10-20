// 活动管理控制器
angular.module('charityHubAdmin')
  .controller('EventsController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.events = [];
    $scope.loading = true;
    $scope.error = null;
    
    // 加载所有活动
    $scope.loadEvents = function() {
      $scope.loading = true;
      $scope.error = null;
      
      ApiService.getAllEvents()
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
    
    // 删除活动
    $scope.deleteEvent = function(event) {
      if (confirm('Are you sure you want to delete event "' + event.title + '"?')) {
        ApiService.deleteEvent(event.id)
          .then(function(response) {
            if (response.data.success) {
              $scope.loadEvents(); // 重新加载活动列表
            } else {
              alert('Failed to delete event: ' + (response.data.message || 'Unknown error'));
            }
          })
          .catch(function(error) {
            alert('Failed to delete event, please try again later');
          });
      }
    };
    
    // 初始化
    $scope.loadEvents();
  }]);
