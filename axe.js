(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory.bind(window.console));
    } else if (typeof exports === 'object') {
        module.exports = factory(console);
    }
}(this, function(console) {
    'use strict';

    var DEBUG = 0;
    var INFO = 1;
    var WARN = 2;
    var ERROR = 3;

    var ConsoleAppender = function() {};
    ConsoleAppender.prototype.log = function(level, component, message) {
        var logFunction;

        if (level === DEBUG) {
            logFunction = console.log.bind(console);
        } else if (level === INFO) {
            logFunction = console.info.bind(console);
        } else if (level === WARN) {
            logFunction = console.warn.bind(console);
        } else if (level === ERROR) {
            logFunction = console.error.bind(console);
        }

        if (component) {
            logFunction('[' + component + ']', message);
        } else {
            logFunction(message);
        }
    };

    var Axe = function() {
        this.defaultAppender = new ConsoleAppender();
        this.appenders = [this.defaultAppender];
        this.logLevel = 0; // default to trace

        var levels = ['debug', 'info', 'warn', 'error'];
        for (var i = 0; i < levels.length; i++) {
            this[levels[i]] = this.log.bind(this, i);
        }

        this.logs = [];
        this.DEBUG = DEBUG;
        this.INFO = INFO;
        this.WARN = WARN;
        this.ERROR = ERROR;
    };

    Axe.prototype.addAppender = function(appender) {
        if (this.appenders.indexOf(appender) !== -1) {
            return;
        }

        this.appenders.push(appender);
    };

    Axe.prototype.removeAppender = function(appender) {
        var index = this.appenders.indexOf(appender);
        if (index !== -1) {
            this.appenders.splice(index, 1);
        }
    };

    Axe.prototype.log = function(level, component, message) {
        if (level < this.logLevel) {
            return;
        }

        if (component && !message) {
            message = component;
            component = undefined;
        }

        var log = [level, component, message];

        this.logs.push(log);
        this.appenders.forEach(function(appender) {
            appender.log.apply(appender, log);
        });
    };

    Axe.prototype.dump = function(appender) {
        this.logs.forEach(function(log) {
            appender.log.apply(appender, log);
        });
    };

    return new Axe();
}));