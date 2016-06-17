# Log

Log method

## Install
`npm install fjandin-log`

## Usage
```
const log = require('fjandin-log');
log.setSettings({
    addFileLineNum: true, // Try and guess file and line number of log
    level: 'debug', // severity log level
    addDate: true, // Prepend logs with [ISO_8601_DATE]
    addSeverity: true // Prepend logs with [severity]
});

log.debug('test');
log.info('test');
log.warn('test');
log.error('test');
log.time('test');
log.timeEnd('test');
```

Output

```
[2016-06-17T22:36:39.678Z] [debug] [/test.js:12] test
[2016-06-17T22:36:39.690Z] [info] [/test.js:13] test
[2016-06-17T22:36:39.691Z] [warn] [/test.js:14] test
[2016-06-17T22:36:39.691Z] [error] [/test.js:15] test
[2016-06-17T22:36:39.691Z] [timer] [/test.js:17] test: 0ms
```
