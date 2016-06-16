/* eslint no-console: 0 */
'use strict';

const baseDir = typeof process !== undefined && process.cwd && process.cwd() || '';

// Log settings
let settings = {
    addFileLineNum: false,
    level: 'debug',
    addDate: true,
    addSeverity: true
};

const LEVELS = {
    log: 0,
    debug: 1,
    time: 1,
    timeEnd: 1,
    info: 2,
    warn: 3,
    error: 4
};

const TYPES = {
    action: {name: 'action', console: 'log', color: 'blue'},
    log: {name: 'log', console: 'log', color: 'white'},
    debug: {name: 'debug', console: 'log', color: 'grey'},
    info: {name: 'info', console: 'info', color: 'cyan'},
    warn: {name: 'warn', console: 'warn', color: 'yellow'},
    error: {name: 'error', console: 'error', color: 'red'},
    time: {name: 'timer', console: 'log', color: 'magenta'},
    timeEnd: {name: 'timer', console: 'log', color: 'magenta'}
};

function getFileAndLine(level) {
    const errorStack = (new Error()).stack
        .replace(/^((?!\sat\s).)*$/gm, '')
        .replace(/at\s(\/.+$)/gm, 'at file ($1)')
        .replace(/^\s+at\s+/gm, '')
        .replace(/^Object.<anonymous>\s*\(/gm, '[anonymous] (')
        .replace(/\:\d+\)$/gim, ')')
        .replace(/.*?\((.*?)\)/gim, '$1')
        .split('\n');
    const fileAndLine = (errorStack[level] || 'null:0').replace(baseDir, '');
    return fileAndLine;
}

const timers = {};

function log(type) {
    if (!TYPES[type] || LEVELS[type] < LEVELS[settings.level]) {
        return;
    }

    let args = Array.prototype.slice.call(arguments).slice(1);

    if (type === 'time') {
        timers[args[0]] = Date.now();
        return;
    } else if (type === 'timeEnd') {
        let start = timers[args[0]];
        let end = Date.now();
        args = [args[0] + ': ' + (start ? (end - start) + 'ms' : '-')];
    }

    if (args[0] && args[0] instanceof Error) {
        args[0] = args[0].stack || args[0];
    }

    // File line number
    if (settings.addFileLineNum) {
        let line = getFileAndLine(2).replace(__dirname.replace('/lib', ''), '');
        args.unshift('[' + line + ']');
    }

    // Add date + type (in that order)
    settings.addSeverity && args.unshift('[' + TYPES[type].name + ']');
    settings.addDate && args.unshift('[' + (new Date()).toJSON().toString() + ']');

    console[TYPES[type].console].apply(console, args);
}

module.exports = {
    action: (inUser, inAction, inResource, inResourceId, inExtra) => {
        const user = inUser || 0;
        const action = inAction || '-';
        const resource = inResource || '-';
        const resourceId = inResourceId || 0;
        const extra = JSON.stringify(inExtra || {});
        log('action', user, '|', action, '|', resource, '|', resourceId, '|', extra);
    },
    log: log.bind(log, 'log'),
    debug: log.bind(log, 'debug'),
    info: log.bind(log, 'info'),
    warn: log.bind(log, 'warn'),
    error: log.bind(log, 'error'),
    time: log.bind(log, 'time'),
    timeEnd: log.bind(log, 'timeEnd'),
    setSettings: (newSettings) => {
        settings = Object.assign(settings, newSettings);
    }
};
