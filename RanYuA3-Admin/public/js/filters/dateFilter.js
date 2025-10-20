// 日期过滤器
angular.module('charityHubAdmin')
  .filter('formatDate', function() {
    return function(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN');
    };
  });
