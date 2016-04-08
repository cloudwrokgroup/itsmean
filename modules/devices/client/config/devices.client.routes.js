(function () {
  'use strict';

  angular
    .module('devices')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('devices', {
        abstract: true,
        url: '/devices',
        template: '<ui-view/>'
      })
      .state('devices.list', {
        url: '',
        templateUrl: 'modules/devices/client/views/list-devices.client.view.html',
        controller: 'DevicesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Devices List'
        }
      })
      .state('devices.view', {
        url: '/:deviceId',
        templateUrl: 'modules/devices/client/views/view-device.client.view.html',
        controller: 'DevicesController',
        controllerAs: 'vm',
        resolve: {
          deviceResolve: getDevice
        },
        data:{
          pageTitle: 'Device {{ articleResolve.name }}'
        }
      });
  }

  getDevice.$inject = ['$stateParams', 'DevicesService'];

  function getDevice($stateParams, DevicesService) {
    return DevicesService.get({
      deviceId: $stateParams.deviceId
    }).$promise;
  }

  newDevice.$inject = ['DevicesService'];

  function newDevice(DevicesService) {
    return new DevicesService();
  }
})();
