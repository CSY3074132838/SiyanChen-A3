// 管理端API服务
angular.module('charityHubAdmin')
  .service('ApiService', ['$http', function($http) {
    const API_BASE = "http://localhost:3000/api";
    
    return {
      // 获取所有活动
      getAllEvents: function() {
        return $http.get(API_BASE + '/events');
      },
      
      // 获取活动详情
      getEvent: function(id) {
        return $http.get(API_BASE + '/events/' + id);
      },
      
      // 创建活动
      createEvent: function(data) {
        return $http.post(API_BASE + '/events', data);
      },
      
      // 更新活动
      updateEvent: function(id, data) {
        return $http.put(API_BASE + '/events/' + id, data);
      },
      
      // 删除活动
      deleteEvent: function(id) {
        return $http.delete(API_BASE + '/events/' + id);
      },
      
      // 获取所有注册
      getAllRegistrations: function() {
        return $http.get(API_BASE + '/registrations');
      },
      
      // 获取分类
      getCategories: function() {
        return $http.get(API_BASE + '/categories');
      },
      
      // 创建分类
      createCategory: function(data) {
        return $http.post(API_BASE + '/categories', data);
      },
      
      // 更新分类
      updateCategory: function(id, data) {
        return $http.put(API_BASE + '/categories/' + id, data);
      },
      
      // 删除分类
      deleteCategory: function(id) {
        return $http.delete(API_BASE + '/categories/' + id);
      }
    };
  }]);
