// Location Service
// A wrapper service for device geolocation services
// and Google reverse geocode service.
// ============================================================

app.service('LocSrv', function ($http, $q, AppConfig) {
   function LocSrv() {

      this.getCurrentDeviceLocation = function () {
         console.log('fn: getCurrentDeviceLocation()');
         var deferred = $q.defer();
         var deviceLocation = {};

         // Check the device supports HTML5 geolocation service
         if(!navigator.geolocation) {
            deferred.reject("Failed: no geolocation service available on device.");
         }

         // Get device location using device's geolocation service
         deviceLocation.location = getDeviceLocation().then(function(pos) {
            console.log("Device position: ", pos);
            deviceLocation.position = pos;
            return pos;
         }).then(function (pos) {
            // Using the position from the device, do a reverse geocode lookup
            doReverseGeo(pos.coords.latitude, pos.coords.longitude, true)
               .then(function (result) {
                  if(result.status == "OK") {
                     deviceLocation.location = result;
                     deferred.resolve(deviceLocation);
                  }
               }, function (result) {
                  deviceLocation.location = undefined;
                  deferred.reject(result);
               });
         });
         return deferred.promise;
      };

      function getDeviceLocation() {
         var deferredGeo = $q.defer();
         var geo_success = function (pos) {
            var crd = pos.coords;
            console.log("Lat: " + crd.latitude + ', Lon: ' + crd.longitude + '.');
            deferredGeo.resolve(pos);
         };
         var geo_error = function (err) {
            console.log('Geolocation lookup failed.');
            deferredGeo.reject(err);
         };
         navigator.geolocation.getCurrentPosition(geo_success, geo_error);
         return deferredGeo.promise;
      }

      function doReverseGeo(lat, lon, local) {
         var deferredRevGeo = $q.defer();
         var apikey = '';
         if(local == false) {
            apikey = '&key=' + AppConfig.MAPS_API_KEY;
         } else { apikey = "" }
         var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
         var theUrl = baseUrl + lat + "," + lon + apikey;
         console.log("Reverse Geocode req: ", theUrl);
         $http.get(theUrl).success(function (data, status, headers, config) {
            if(data.status == "OK") {
               console.log("Reverse geo data: ", data);
               deferredRevGeo.resolve(data);
            } else {
               deferredRevGeo.reject(data);
            }
         });
         return deferredRevGeo.promise;
      }
   }

   return new LocSrv();
});