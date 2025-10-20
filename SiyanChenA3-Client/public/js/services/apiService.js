// API服务
angular.module('charityHub')
  .service('ApiService', ['$http', function($http) {
    const API_BASE = "http://localhost:3000/api";
    
    return {
      // 获取首页活动
      getHomeEvents: function() {
        return $http.get(API_BASE + '/events');
      },
      
      // 获取分类
      getCategories: function() {
        return $http.get(API_BASE + '/categories');
      },
      
      // 搜索活动
      searchEvents: function(params) {
        return $http.get(API_BASE + '/events/search', { params: params });
      },
      
      // 获取活动详情
      getEvent: function(id) {
        return $http.get(API_BASE + '/events/' + id);
      },
      
      // 注册活动
      registerEvent: function(data) {
        return $http.post(API_BASE + '/registrations', data);
      }
    };
  }]);
