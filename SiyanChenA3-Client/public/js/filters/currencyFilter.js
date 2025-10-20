// Currency Filter
angular.module('charityHub')
  .filter('currency', function() {
    return function(amount, currency) {
      if (!amount) return '';
      const value = Number(amount);
      const currencyCode = currency || 'USD';
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currencyCode 
      }).format(value);
    };
  });
