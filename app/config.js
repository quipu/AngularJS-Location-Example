app.config(function($stateProvider, $urlRouterProvider){
   // Default route
   $urlRouterProvider.otherwise('/home');
   $stateProvider
      .state('home', {
         url: '/home',
         templateUrl: 'app/templates/home.html',
         controller: 'HomeCtrl'
      })
      .state('pins', {
         url: '/pins',
         templateUrl: 'app/templates/pins.html',
         controller: 'PinListCtrl'
      })
      .state('pins.create', {
         url: '/create',
         templateUrl : 'app/templates/pins.create.html',
         controller : 'PinCreateCtrl'
      });
});
