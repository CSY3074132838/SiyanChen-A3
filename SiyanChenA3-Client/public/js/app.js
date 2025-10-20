// 主应用模块
angular.module('charityHub', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      })
      .when('/search', {
        templateUrl: 'templates/search.html',
        controller: 'SearchController'
      })
      .when('/event/:id', {
        templateUrl: 'templates/event.html',
        controller: 'EventController'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$rootScope', 'AuthService', function($rootScope, AuthService) {
    // 初始化用户状态
    $rootScope.isLoggedIn = AuthService.isLoggedIn();
    $rootScope.currentUser = AuthService.getCurrentUser();
    
    // 监听路由变化
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // 可以在这里添加路由守卫逻辑
    });
  }]);
