// 活动编辑控制器
angular.module('charityHubAdmin')
  .controller('EventEditController', ['$scope', '$routeParams', '$location', 'ApiService', function($scope, $routeParams, $location, ApiService) {
    $scope.event = {
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      venue: '',
      city: '',
      category_id: '',
      hero_image_url: '',
      price: 0
    };
    $scope.categories = [];
    $scope.loading = true;
    $scope.saving = false;
    $scope.isEdit = !!$routeParams.id;
    
    // 加载分类
    $scope.loadCategories = function() {
      ApiService.getCategories()
        .then(function(response) {
          if (response.data.success) {
            $scope.categories = response.data.data;
          }
        })
        .catch(function(error) {
          console.error('Failed to load categories:', error);
        });
    };
    
    // 加载活动详情（编辑模式）
    $scope.loadEvent = function() {
      if ($scope.isEdit) {
        $scope.loading = true;
        ApiService.getEvent($routeParams.id)
          .then(function(response) {
            if (response.data.success) {
              $scope.event = response.data.data;
            }
            $scope.loading = false;
          })
          .catch(function(error) {
            $scope.loading = false;
          });
      } else {
        $scope.loading = false;
      }
    };
    
    // 保存活动
    $scope.saveEvent = function() {
      if (!$scope.event.title || !$scope.event.start_time) {
        alert('Please fill in required information');
        return;
      }
      
      $scope.saving = true;
      
      const saveFunction = $scope.isEdit ? 
        ApiService.updateEvent($routeParams.id, $scope.event) :
        ApiService.createEvent($scope.event);
      
      saveFunction
        .then(function(response) {
          if (response.data.success) {
            alert($scope.isEdit ? 'Event updated successfully' : 'Event created successfully');
            $location.path('/');
          } else {
            alert('Save failed: ' + (response.data.message || 'Unknown error'));
          }
          $scope.saving = false;
        })
        .catch(function(error) {
          alert('Save failed, please try again later');
          $scope.saving = false;
        });
    };
    
    // 初始化
    console.log('EventEditController initialized, isEdit:', $scope.isEdit);
    $scope.loadCategories();
    $scope.loadEvent();
  }]);
