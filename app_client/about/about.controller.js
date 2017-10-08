(function () {

  angular
    .module('calendarApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About calendar app'
    };
    vm.main = {
      content: 'This is calendar app.'
    };
  }

})();