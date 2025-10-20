// Date Filter
angular.module('charityHub')
  .filter('formatDate', function() {
    return function(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('en-US');
    };
  });
