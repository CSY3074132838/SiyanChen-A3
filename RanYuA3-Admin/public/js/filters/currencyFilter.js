// 货币过滤器
angular.module('charityHubAdmin')
  .filter('currency', function() {
    return function(amount, currency) {
      if (!amount) return '';
      const value = Number(amount);
      const currencyCode = currency || 'USD';
      return new Intl.NumberFormat('zh-CN', { 
        style: 'currency', 
        currency: currencyCode 
      }).format(value);
    };
  });
