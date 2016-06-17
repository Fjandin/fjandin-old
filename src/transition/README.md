# Transition

Transition between values

## Install
`npm install fjandin-transition`

## Usage
```
const someElement = getElementById('test');
const transition = require('fjandin-transition');
const EASING = transition.EASING;
const promise = transition({
    start: 0,
    end: 100,
    duration: 5000, // ms
    easing: EASING.easeInOutQuad, // (easeInOutQuad, easeInCubic, inOutQuintic)
    callback: (err, value) => {
        someElement.scrollTop = value;
    }
});

// transition is done
promise.then(() => console.log('done'));

// Cancel transition by calling
promise.cancel(); // Will reject the promise
```
