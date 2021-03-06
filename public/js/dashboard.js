(function () {
  'use strict';

  angular.module('procKr.dashboard', [
    'procKr.process',
    'procKr.responses',
    'procKr.logs'
  ])

  .config(function ($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: 'dashboard',
        views: {
          primaryContainer: {
            templateUrl: 'responses.html',
            controller: 'ResponsesCtrl'
          },
          secondaryContainer: {
            templateUrl: 'process-list.html',
            controller: 'ProcessListCtrl'
          },
          logsContainer: {
            templateUrl: 'logs.html',
            controller: 'LogsCtrl'
          }
        }
      });
  });
})();
