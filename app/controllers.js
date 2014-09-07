app.controller('HomeCtrl', function ($scope, $state, $localStorage, $q, LocSrv) {
   $scope.$storage = $localStorage;
   $scope.contentTitle = "Home";
   $scope.currentLocation = {};

   // Update the current location using Google Places location search
   $scope.$watch('locationSearchDetails', function(newVal, oldVal) {
      if (angular.equals(newVal, oldVal)) { return }
      $scope.$storage.loc = newVal;
      console.log(newVal);
      $scope.currentLocation = updateCurrentLocation('search', newVal);
      console.log("Location updated.");
   });

   // Update the current location using device geolocation services
   $scope.getLocation = function () {
      // Call LocationService - returns promise
      LocSrv.getCurrentDeviceLocation()
         .then(function (data) {
            // Success callback
            // On success, save to local storage and set as user's location
            $scope.$storage.loc = data;
            console.log('Location updated: ', data);
            $scope.currentLocation = updateCurrentLocation('device', data);
         }, function (error) {
            // Error callback
            // On fail, show error
            console.log('Location error: ', error);
      });
   };

   function updateCurrentLocation(source, data) {
      // Source is Google Places lookup
      if(source === 'search'){
         return {
            address: data.formatted_address,
            lat: data.geometry.location.k,
            lon: data.geometry.location.B,
            place_id: data.place_id,
            url: data.url,
            vicinity: data.vicinity
         }
      }
      // Source is geolocation API
      if(source === 'device'){
         return {
            address: data.location.results[0].formatted_address,
            lat: data.position.coords.latitude,
            lon: data.position.coords.longitude
         }
      }
   }

});
