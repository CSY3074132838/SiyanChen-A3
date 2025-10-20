// 搜索控制器
angular.module('charityHub')
  .controller('SearchController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.searchForm = {
      date: '',
      location: '',
      category: ''
    };
    $scope.categories = [];
    $scope.results = [];
    $scope.loading = false;
    $scope.searched = false;
    
    // 加载分类
    $scope.loadCategories = function() {
      ApiService.getCategories()
        .then(function(response) {
          if (response.data.success) {
            $scope.categories = response.data.data;
          }
        })
        .catch(function(error) {
          console.error('加载分类失败:', error);
        });
    };
    
    // 搜索活动
    $scope.search = function() {
      $scope.loading = true;
      $scope.searched = true;
      
      const params = {};
      if ($scope.searchForm.date) params.date = $scope.searchForm.date;
      if ($scope.searchForm.location) params.location = $scope.searchForm.location;
      if ($scope.searchForm.category) params.category = $scope.searchForm.category;
      
      ApiService.searchEvents(params)
        .then(function(response) {
          if (response.data.success) {
            $scope.results = response.data.data;
          } else {
            $scope.results = [];
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          $scope.results = [];
          $scope.loading = false;
        });
    };
    
    // 清空搜索
    $scope.clearSearch = function() {
      $scope.searchForm = {
        date: '',
        location: '',
        category: ''
      };
      $scope.results = [];
      $scope.searched = false;
    };
    
    // 初始化
    $scope.loadCategories();
  }]);
