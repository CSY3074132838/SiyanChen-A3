// 认证服务
angular.module('charityHub')
  .service('AuthService', ['$rootScope', function($rootScope) {
    return {
      // 检查是否已登录
      isLoggedIn: function() {
        return !!localStorage.getItem('user');
      },
      
      // 获取当前用户
      getCurrentUser: function() {
        return localStorage.getItem('user');
      },
      
      // 登录
      login: function(username) {
        localStorage.setItem('user', username);
        $rootScope.isLoggedIn = true;
        $rootScope.currentUser = username;
      },
      
      // 退出登录
      logout: function() {
        localStorage.removeItem('user');
        $rootScope.isLoggedIn = false;
        $rootScope.currentUser = null;
      }
    };
  }]);
