// 管理端主应用模块
angular.module('charityHubAdmin', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/events.html',
        controller: 'EventsController'
      })
      .when('/edit/:id', {
        templateUrl: 'templates/event-edit.html',
        controller: 'EventEditController'
      })
      .when('/edit', {
        templateUrl: 'templates/event-edit.html',
        controller: 'EventEditController'
      })
      .when('/categories', {
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesController'
      })
      .when('/registrations', {
        templateUrl: 'templates/registrations.html',
        controller: 'RegistrationsController'
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
