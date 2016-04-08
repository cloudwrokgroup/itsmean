(function () {
  'use strict';

  // Devices controller
  angular
    .module('devices')
    .controller('DevicesController', DevicesController);

  DevicesController.$inject = ['$scope', '$state', 'Authentication', 'deviceResolve'];

  function DevicesController ($scope, $state, Authentication, device) {
    var vm = this;

    vm.authentication = Authentication;
    vm.device = device;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Device
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.device.$remove($state.go('devices.list'));
      }
    }

    // Save Device
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deviceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.device._id) {
        vm.device.$update(successCallback, errorCallback);
      } else {
        vm.device.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('devices.view', {
          deviceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
