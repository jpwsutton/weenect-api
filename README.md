# weenect-api
A NodeJS implementation of the Weenect Pet tracker API, inspired by / borrowed from [RMHonor's](https://github.com/RMHonor) [Surepet API](https://github.com/RMHonor/sure-pet-care) and [mmende's](https://github.com/mmende) [Homebridge Weenect API](https://github.com/mmende/homebridge-weenect/)

## Installation

Just do `npm install weenect-api`


## Usage

In a normal Javascript file, the usage would be as follows, I'll add in the EC alternative once I understand it!

### Initialisation
```
// Import the Module
var Weenect = require('weenect-api');

// Initialise the Module with your credentials
var myWeenect = new Weenect.WeenectClient("username", "password");

```

### Getting an array of trackers on the account
```
// Return an array of trackers
myWeenect.getTrackers().then((trackers) => {
    console.log("got trackers");

    console.log(trackers)
})
```

### Getting a trackers history between two points in time

```

// Get The history of a specific tracker
let now = new Date();
var oneHour = 60 * 60 * 1000;
var prev = new Date(now - oneHour);

/* Arguments:

id: Tracker ID
measurement system: 'km' or 'miles'
start: the start date
end: the end data
*/

myWeenect.getTrackerHistory(00001, 'km', prev, now).then((history) => {
    console.log("got history");

    console.log(history)
})


```


Example Trackers Object:

```
[
  {
    name: 'Luna',
    id: '123456',
    battery: 66,
    online: true,
    type: 'cat2',
    imei: 000000000000000,
    latitude: 49,
    longitude: -1,
    firmware: 'cat3'
  }
]
```