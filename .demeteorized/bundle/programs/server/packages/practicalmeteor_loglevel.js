(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var chai = Package['practicalmeteor:chai'].chai;
var assert = Package['practicalmeteor:chai'].assert;
var expect = Package['practicalmeteor:chai'].expect;
var should = Package['practicalmeteor:chai'].should;

/* Package-scope variables */
var Loglevel, log, __coffeescriptShare, loglevel;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/practicalmeteor_loglevel/packages/practicalmeteor_loglevel.js                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/practicalmeteor:loglevel/loglevel.js                                                            //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
/*! loglevel - v1.1.0 - https://github.com/pimterry/loglevel - (c) 2014 Tim Perry - licensed MIT */         // 1
                                                                                                            // 2
Loglevel = function (options) {                                                                             // 3
    var self = {};                                                                                          // 4
    if(options && options.prefix) {                                                                         // 5
      self.prefix = options.prefix;                                                                         // 6
    } else {                                                                                                // 7
      self.prefix = '';                                                                                     // 8
    }                                                                                                       // 9
    if(options && options.level) {                                                                          // 10
      self.level = options.level;                                                                           // 11
    } else {                                                                                                // 12
      self.level = 'info';                                                                                  // 13
    }                                                                                                       // 14
    var noop = function() {};                                                                               // 15
    var undefinedType = "undefined";                                                                        // 16
                                                                                                            // 17
    function realMethod(methodName) {                                                                       // 18
        if (typeof console === undefinedType) {                                                             // 19
            return noop;                                                                                    // 20
        } else if (console[methodName] === undefined) {                                                     // 21
            if (console.log !== undefined) {                                                                // 22
                return boundToConsole(console, 'log');                                                      // 23
            } else {                                                                                        // 24
                return noop;                                                                                // 25
            }                                                                                               // 26
        } else {                                                                                            // 27
            return boundToConsole(console, methodName);                                                     // 28
        }                                                                                                   // 29
    }                                                                                                       // 30
                                                                                                            // 31
    function boundToConsole(console, methodName) {                                                          // 32
        var method = console[methodName];                                                                   // 33
        if (method.bind === undefined) {                                                                    // 34
            if (Function.prototype.bind === undefined) {                                                    // 35
                return functionBindingWrapper(method, console);                                             // 36
            } else {                                                                                        // 37
                try {                                                                                       // 38
                    console.log('Binding' + methodName);                                                    // 39
                    return Function.prototype.bind.call(console[methodName], console, self.prefix);         // 40
                } catch (e) {                                                                               // 41
                    // In IE8 + Modernizr, the bind shim will reject the above, so we fall back to wrapping // 42
                    return functionBindingWrapper(method, console);                                         // 43
                }                                                                                           // 44
            }                                                                                               // 45
        } else {                                                                                            // 46
            return console[methodName].bind(console, self.prefix);                                          // 47
        }                                                                                                   // 48
    }                                                                                                       // 49
                                                                                                            // 50
    function functionBindingWrapper(f, context) {                                                           // 51
        return function() {                                                                                 // 52
            Function.prototype.apply.apply(f, [context, arguments]);                                        // 53
        };                                                                                                  // 54
    }                                                                                                       // 55
                                                                                                            // 56
    var logMethods = [                                                                                      // 57
        "trace",                                                                                            // 58
        "debug",                                                                                            // 59
        "info",                                                                                             // 60
        "warn",                                                                                             // 61
        "error"                                                                                             // 62
    ];                                                                                                      // 63
                                                                                                            // 64
    function replaceLoggingMethods(methodFactory) {                                                         // 65
        for (var ii = 0; ii < logMethods.length; ii++) {                                                    // 66
            self[logMethods[ii]] = methodFactory(logMethods[ii]);                                           // 67
        }                                                                                                   // 68
    }                                                                                                       // 69
                                                                                                            // 70
    function cookiesAvailable() {                                                                           // 71
        return (typeof window !== undefinedType &&                                                          // 72
                window.document !== undefined &&                                                            // 73
                window.document.cookie !== undefined);                                                      // 74
    }                                                                                                       // 75
                                                                                                            // 76
    function localStorageAvailable() {                                                                      // 77
        try {                                                                                               // 78
            return (typeof window !== undefinedType &&                                                      // 79
                    window.localStorage !== undefined &&                                                    // 80
                    window.localStorage !== null);                                                          // 81
        } catch (e) {                                                                                       // 82
            return false;                                                                                   // 83
        }                                                                                                   // 84
    }                                                                                                       // 85
                                                                                                            // 86
    function persistLevelIfPossible(levelNum) {                                                             // 87
        var localStorageFail = false,                                                                       // 88
            levelName;                                                                                      // 89
                                                                                                            // 90
        for (var key in self.levels) {                                                                      // 91
            if (self.levels.hasOwnProperty(key) && self.levels[key] === levelNum) {                         // 92
                levelName = key;                                                                            // 93
                break;                                                                                      // 94
            }                                                                                               // 95
        }                                                                                                   // 96
                                                                                                            // 97
        if (localStorageAvailable()) {                                                                      // 98
            /*                                                                                              // 99
             * Setting localStorage can create a DOM 22 Exception if running in Private mode                // 100
             * in Safari, so even if it is available we need to catch any errors when trying                // 101
             * to write to it                                                                               // 102
             */                                                                                             // 103
            try {                                                                                           // 104
                window.localStorage['loglevel'] = levelName;                                                // 105
            } catch (e) {                                                                                   // 106
                localStorageFail = true;                                                                    // 107
            }                                                                                               // 108
        } else {                                                                                            // 109
            localStorageFail = true;                                                                        // 110
        }                                                                                                   // 111
                                                                                                            // 112
        if (localStorageFail && cookiesAvailable()) {                                                       // 113
            window.document.cookie = "loglevel=" + levelName + ";";                                         // 114
        }                                                                                                   // 115
    }                                                                                                       // 116
                                                                                                            // 117
    var cookieRegex = /loglevel=([^;]+)/;                                                                   // 118
                                                                                                            // 119
    function loadPersistedLevel() {                                                                         // 120
        var storedLevel;                                                                                    // 121
                                                                                                            // 122
        if (localStorageAvailable()) {                                                                      // 123
            storedLevel = window.localStorage['loglevel'];                                                  // 124
        }                                                                                                   // 125
                                                                                                            // 126
        if (storedLevel === undefined && cookiesAvailable()) {                                              // 127
            var cookieMatch = cookieRegex.exec(window.document.cookie) || [];                               // 128
            storedLevel = cookieMatch[1];                                                                   // 129
        }                                                                                                   // 130
                                                                                                            // 131
        if (self.levels[storedLevel] === undefined) {                                                       // 132
            storedLevel = "WARN";                                                                           // 133
        }                                                                                                   // 134
                                                                                                            // 135
        self.setLevel(self.levels[storedLevel]);                                                            // 136
    }                                                                                                       // 137
                                                                                                            // 138
    /*                                                                                                      // 139
     *                                                                                                      // 140
     * Public API                                                                                           // 141
     *                                                                                                      // 142
     */                                                                                                     // 143
                                                                                                            // 144
    self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,                                           // 145
        "ERROR": 4, "SILENT": 5};                                                                           // 146
                                                                                                            // 147
    self.setLevel = function (level) {                                                                      // 148
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {                       // 149
            self.level = level;                                                                             // 150
            //persistLevelIfPossible(level);                                                                // 151
                                                                                                            // 152
            if (level === self.levels.SILENT) {                                                             // 153
                replaceLoggingMethods(function () {                                                         // 154
                    return noop;                                                                            // 155
                });                                                                                         // 156
                return;                                                                                     // 157
            } else if (typeof console === undefinedType) {                                                  // 158
                replaceLoggingMethods(function (methodName) {                                               // 159
                    return function () {                                                                    // 160
                        if (typeof console !== undefinedType) {                                             // 161
                            self.setLevel(level);                                                           // 162
                            self[methodName].apply(self, arguments);                                        // 163
                        }                                                                                   // 164
                    };                                                                                      // 165
                });                                                                                         // 166
                return "No console available for logging";                                                  // 167
            } else {                                                                                        // 168
                replaceLoggingMethods(function (methodName) {                                               // 169
                    if (level <= self.levels[methodName.toUpperCase()]) {                                   // 170
                        return realMethod(methodName);                                                      // 171
                    } else {                                                                                // 172
                        return noop;                                                                        // 173
                    }                                                                                       // 174
                });                                                                                         // 175
            }                                                                                               // 176
        } else if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {           // 177
            self.setLevel(self.levels[level.toUpperCase()]);                                                // 178
        } else {                                                                                            // 179
            throw "log.setLevel() called with invalid level: " + level;                                     // 180
        }                                                                                                   // 181
    };                                                                                                      // 182
                                                                                                            // 183
    self.enableAll = function() {                                                                           // 184
        self.setLevel(self.levels.TRACE);                                                                   // 185
    };                                                                                                      // 186
                                                                                                            // 187
    self.disableAll = function() {                                                                          // 188
        self.setLevel(self.levels.SILENT);                                                                  // 189
    };                                                                                                      // 190
                                                                                                            // 191
  self.setLevel(self.level);                                                                                // 192
  return self;                                                                                              // 193
};                                                                                                          // 194
                                                                                                            // 195
log = Loglevel({prefix: 'practicalmeteor:loglevel:'});                                                      // 196
                                                                                                            // 197
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/practicalmeteor:loglevel/LoggerFactory.coffee.js                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
             

if (this.practical == null) {
  this.practical = {};
}

practical.LoggerFactory = (function() {
  var instance;

  function LoggerFactory() {}

  instance = null;

  LoggerFactory.get = function() {
    return instance != null ? instance : instance = new practical.LoggerFactory();
  };

  LoggerFactory.prototype._getSettingsLoglevel = function(namespace, defaultLevel) {
    var globalLevel, level;
    if (namespace == null) {
      namespace = '';
    }
    if (defaultLevel == null) {
      defaultLevel = 'info';
    }
    expect(namespace).to.be.a('string');
    expect(defaultLevel).to.be.a('string').that.has.length.above(0);
    globalLevel = this._getNamespaceLoglevel('global');
    if (globalLevel != null) {
      return globalLevel;
    }
    if (namespace.length > 0) {
      level = this._getNamespaceLoglevel(namespace);
    }
    if (level == null) {
      level = this._getNamespaceLoglevel('default');
    }
    return level != null ? level : level = defaultLevel;
  };

  LoggerFactory.prototype._getNamespaceLoglevel = function(namespace) {
    var level, serverLevel, _ref, _ref1, _ref2, _ref3, _ref4;
    expect(namespace).to.be.a('string').that.has.length.above(0);
    level = (_ref = Meteor.settings) != null ? (_ref1 = _ref["public"]) != null ? (_ref2 = _ref1.loglevel) != null ? _ref2[namespace] : void 0 : void 0 : void 0;
    if (Meteor.isServer) {
      serverLevel = (_ref3 = Meteor.settings) != null ? (_ref4 = _ref3.loglevel) != null ? _ref4[namespace] : void 0 : void 0;
      if (serverLevel != null) {
        level = serverLevel;
      }
    }
    return level;
  };

  LoggerFactory.prototype.createLogger = function(namespace, defaultLevel) {
    var options;
    if (namespace == null) {
      namespace = '';
    }
    if (defaultLevel == null) {
      defaultLevel = 'info';
    }
    log.debug('LoggerFactory.createLogger()', arguments);
    expect(namespace).to.be.a('string');
    expect(defaultLevel).to.be.a('string').that.has.length.above(0);
    expect(Loglevel).to.be.a('function');
    options = {};
    if (namespace.length > 0) {
      options.prefix = namespace + ':';
    }
    options.level = this._getSettingsLoglevel(namespace, defaultLevel);
    return Loglevel(options);
  };

  LoggerFactory.prototype.createPackageLogger = function(packageName, defaultLevel) {
    if (defaultLevel == null) {
      defaultLevel = 'info';
    }
    return this.createLogger(packageName, defaultLevel);
  };

  LoggerFactory.prototype.createAppLogger = function(appName, defaultLevel) {
    if (appName == null) {
      appName = 'app';
    }
    if (defaultLevel == null) {
      defaultLevel = 'info';
    }
    return this.createLogger(appName, defaultLevel);
  };

  return LoggerFactory;

})();

loglevel = practical.LoggerFactory.get();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['practicalmeteor:loglevel'] = {}, {
  loglevel: loglevel
});

})();

//# sourceMappingURL=practicalmeteor_loglevel.js.map
