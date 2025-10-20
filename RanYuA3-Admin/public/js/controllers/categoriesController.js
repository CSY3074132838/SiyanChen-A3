// 分类管理控制器
angular.module('charityHubAdmin')
  .controller('CategoriesController', ['$scope', 'ApiService', function($scope, ApiService) {
    $scope.categories = [];
    $scope.loading = false;
    $scope.error = null;
    $scope.editingCategory = null;
    $scope.newCategory = {
      name: '',
      slug: ''
    };
    
    // 加载分类列表
    $scope.loadCategories = function() {
      $scope.loading = true;
      $scope.error = null;
      
      ApiService.getCategories()
        .then(function(response) {
          if (response.data.success) {
            $scope.categories = response.data.data;
          } else {
            $scope.error = 'Failed to load categories';
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          $scope.error = 'Network error, please try again later';
          $scope.loading = false;
        });
    };
    
    // 添加新分类
    $scope.addCategory = function() {
      if (!$scope.newCategory.name.trim()) {
        alert('Please enter category name');
        return;
      }
      
      if (!$scope.newCategory.slug.trim()) {
        alert('Please enter category slug');
        return;
      }
      
      $scope.loading = true;
      
      ApiService.createCategory($scope.newCategory)
        .then(function(response) {
          if (response.data.success) {
            $scope.loadCategories(); // 重新加载列表
            $scope.newCategory = { name: '', slug: '' }; // 清空表单
          } else {
            alert('Failed to create category: ' + (response.data.message || 'Unknown error'));
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          alert('Failed to create category, please try again later');
          $scope.loading = false;
        });
    };
    
    // 编辑分类
    $scope.editCategory = function(category) {
      $scope.editingCategory = angular.copy(category);
    };
    
    // 更新分类
    $scope.updateCategory = function() {
      if (!$scope.editingCategory.name.trim()) {
        alert('Please enter category name');
        return;
      }
      
      if (!$scope.editingCategory.slug.trim()) {
        alert('Please enter category slug');
        return;
      }
      
      $scope.loading = true;
      
      ApiService.updateCategory($scope.editingCategory.id, $scope.editingCategory)
        .then(function(response) {
          if (response.data.success) {
            $scope.loadCategories(); // 重新加载列表
            $scope.editingCategory = null; // 关闭编辑模式
          } else {
            alert('Failed to update category: ' + (response.data.message || 'Unknown error'));
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          alert('Failed to update category, please try again later');
          $scope.loading = false;
        });
    };
    
    // 删除分类
    $scope.deleteCategory = function(category) {
      if (!confirm('Are you sure you want to delete this category?')) {
        return;
      }
      
      $scope.loading = true;
      
      ApiService.deleteCategory(category.id)
        .then(function(response) {
          if (response.data.success) {
            $scope.loadCategories(); // 重新加载列表
          } else {
            alert('Failed to delete category: ' + (response.data.message || 'Unknown error'));
          }
          $scope.loading = false;
        })
        .catch(function(error) {
          alert('Failed to delete category, please try again later');
          $scope.loading = false;
        });
    };
    
    // 取消编辑
    $scope.cancelEdit = function() {
      $scope.editingCategory = null;
    };
    
    // 初始化
    $scope.loadCategories();
  }]);
