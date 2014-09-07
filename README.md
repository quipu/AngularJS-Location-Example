# Location Services Example

Simple example AngularJS app that uses device location services and Google Places API.

* Get current device location
* Set a location using search

## Configuration

App API key and other configuration required needs to be included in a file called constant.js

Example:

    app.constant("AppConfig", {
        "MAPS_API_KEY" : "[PUT YOUR GOOGLE MAPS API KEY HERE]"
    });
