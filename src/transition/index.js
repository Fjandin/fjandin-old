/* eslint no-param-reassign: 0*/
'use strict';

// Easing methods
const EASING = {
    easeInOutQuad: (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    },
    easeInCubic: (t, b, c, d) => {
        const tc = (t /= d) * t * t;
        return b + c * (tc);
    },
    inOutQuintic: (t, b, c, d) => {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
    }
};

// Polyfill to request animation frame from browser
const requestAnimFrame = (function requestAnimFrame() {
    const alternative = (callback) => setTimeout(callback, 1000 / 60);
    return typeof window !== 'undefined' ? window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        alternative : alternative;
})();


// transition a number
function transition({start, end, duration, easing, callback}) {
    let canceled;
    const promise = new Promise((resolve, reject) => {
        let lastFrameTime = Date.now();
        let currentTime = 0;
        let diff = end - start;
        if (!diff) {
            return;
        }
        const animate = () => {
            if (canceled) {
                reject('canceled');
                return;
            }
            currentTime += (Date.now() - lastFrameTime);
            let val = (easing || EASING.easeInOutQuad)(currentTime, start, diff, duration);
            if ((currentTime >= duration) || (diff > 0 && val >= end) || (diff < 0 && val <= end)) {
                val = end;
                callback(null, val);
                resolve();
                return;
            }
            callback(null, val);
            lastFrameTime = Date.now();
            requestAnimFrame(animate);
        };
        animate();
    });
    promise.cancel = () => {canceled = true;};
    return promise;
}

transition.EASING = EASING;

module.exports = transition;
