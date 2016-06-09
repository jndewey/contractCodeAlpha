(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var EJSON = Package.ejson.EJSON;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var LongRunningChildProcess = Package['sanjo:long-running-child-process'].LongRunningChildProcess;
var Fse = Package['akasha:fs-extra'].Fse;
var Request = Package['akasha:request'].Request;
var Shelljs = Package['akasha:shelljs'].Shelljs;
var AdmZip = Package['akasha:adm-zip'].AdmZip;
var Symbol = Package['ecmascript-runtime'].Symbol;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var defaultLevel, IpfsConnector;

var require = meteorInstall({"node_modules":{"meteor":{"akasha:meteor-ipfs":{"lib":{"ipfsConnector.js":["babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/akasha_meteor-ipfs/lib/ipfsConnector.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require('babel-runtime/helpers/typeof');                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }                     //
                                                                                                                      //
var binariesVersion = '0.3.9_';                                                                                       // 1
var path = Npm.require('path');                                                                                       // 2
var ipfsAPI = Npm.require('ipfs-api');                                                                                // 3
var Future = Npm.require('fibers/future');                                                                            // 4
var exec = Npm.require('child_process').exec;                                                                         // 5
var writeJson = Meteor.wrapAsync(Fse.outputJson);                                                                     // 6
                                                                                                                      //
var device = process.platform + '-' + process.arch;                                                                   // 8
var projectDir = process.env.PWD + '/';                                                                               // 9
var homeDir = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];                                      // 10
                                                                                                                      //
var assetsDir = '.private';                                                                                           // 12
var configFile = 'ipfs.json';                                                                                         // 13
var execPath = path.join(projectDir, assetsDir);                                                                      // 14
                                                                                                                      //
var ipfsFolder = 'ipfs';                                                                                              // 16
var ipfsRoot = path.join(execPath, ipfsFolder);                                                                       // 17
var assetsRoot = 'https://gobuilder.me/get/github.com/ipfs/go-ipfs/cmd/ipfs/ipfs_v' + binariesVersion;                // 18
                                                                                                                      //
var log = loglevel.createPackageLogger('akasha:meteor-ipfs', defaultLevel = 'info');                                  // 20
var logLevels = ['trace', 'fine', 'debug', 'info', 'warn', 'error'];                                                  // 21
                                                                                                                      //
var binaries = {                                                                                                      // 23
  'linux-arm': assetsRoot + 'linux-arm.zip',                                                                          // 24
  'linux-ia32': assetsRoot + 'linux-386.zip',                                                                         // 25
  'linux-x64': assetsRoot + 'linux-amd64.zip',                                                                        // 26
  'darwin-x64': assetsRoot + 'darwin-amd64.zip',                                                                      // 27
  'win32-ia32': assetsRoot + 'windows-386.zip',                                                                       // 28
  'win32-x64': assetsRoot + 'windows-amd64.zip'                                                                       // 29
};                                                                                                                    //
                                                                                                                      //
var symbolEnforcer = Symbol();                                                                                        // 32
var symbol = Symbol();                                                                                                // 33
                                                                                                                      //
IpfsConnector = function () {                                                                                         // 35
  function IpfsConnector(enforcer) {                                                                                  // 37
    (0, _classCallCheck3['default'])(this, IpfsConnector);                                                            //
                                                                                                                      //
    if (enforcer !== symbolEnforcer) {                                                                                // 38
      throw new Meteor.Error('singleton-enforce', 'Cannot construct singleton');                                      // 39
    }                                                                                                                 //
    this.ipfsConnector = false;                                                                                       // 41
    this.config = false;                                                                                              // 42
    this.api = false;                                                                                                 // 43
    this.sock = '/ip4/127.0.0.1/tcp/5001';                                                                            // 44
    this.ipsProcess = new LongRunningChildProcess('ipfsProcess');                                                     // 45
    this.executable = path.join(ipfsRoot, process.platform == 'win32' ? 'ipfs.exe' : 'ipfs');                         // 46
  }                                                                                                                   //
                                                                                                                      //
  IpfsConnector.getInstance = function () {                                                                           // 35
    function getInstance() {                                                                                          //
      if (!this[symbol]) {                                                                                            // 50
        this[symbol] = new IpfsConnector(symbolEnforcer);                                                             // 51
      }                                                                                                               //
      return this[symbol];                                                                                            // 53
    }                                                                                                                 //
                                                                                                                      //
    return getInstance;                                                                                               //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * start ipfs                                                                                                       //
   * @returns {*}                                                                                                     //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype.start = function () {                                                                       // 35
    function start() {                                                                                                //
      var _this = this;                                                                                               //
                                                                                                                      //
      if (!this.ipfsConnector) {                                                                                      // 61
        var _ret = function () {                                                                                      //
          var future = new Future();                                                                                  // 62
          var config = _this._checkConfig();                                                                          // 63
          if (config) {                                                                                               // 64
            var options = {                                                                                           // 65
              command: _this.executable,                                                                              // 66
              args: ['daemon']                                                                                        // 67
            };                                                                                                        //
            log.info('starting ipfs daemon from ' + _this.executable);                                                // 69
            _this.ipfsConnector = _this.ipsProcess.spawn(options);                                                    // 70
            Meteor.setTimeout(function () {                                                                           // 71
              _this.api = ipfsAPI(_this.sock);                                                                        // 72
              log.info('connecting to ipfsAPI on ' + _this.sock);                                                     // 73
              future['return'](true);                                                                                 // 74
            }, 4000);                                                                                                 //
          } else {                                                                                                    //
            log.error('error getting ipfs config');                                                                   // 78
            future['throw'](true);                                                                                    // 79
          }                                                                                                           //
          return {                                                                                                    // 81
            v: future.wait()                                                                                          //
          };                                                                                                          //
        }();                                                                                                          //
                                                                                                                      //
        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3['default'])(_ret)) === "object") return _ret.v;
      }                                                                                                               //
      return true;                                                                                                    // 83
    }                                                                                                                 //
                                                                                                                      //
    return start;                                                                                                     //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   *                                                                                                                  //
   * @returns {*|any}                                                                                                 //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._checkConfig = function () {                                                                // 35
    function _checkConfig() {                                                                                         //
      var _this2 = this;                                                                                              //
                                                                                                                      //
      var future = new Future();                                                                                      // 92
      Fse.stat(path.join(execPath, configFile), Meteor.bindEnvironment(function (err, stats) {                        // 93
        if (!stats) {                                                                                                 // 94
          var hasAssets = _this2._getAssets(true);                                                                    // 95
          if (hasAssets) {                                                                                            // 96
            var init = _this2._init();                                                                                // 97
            if (init) {                                                                                               // 98
              _this2._writeToConfig();                                                                                // 99
              future['return'](true);                                                                                 // 100
            } else {                                                                                                  //
              log.error('could not init ipfs');                                                                       // 102
              future['throw'](true);                                                                                  // 103
            }                                                                                                         //
          } else {                                                                                                    //
            log.error('could not download ipfs');                                                                     // 106
            future['throw'](true);                                                                                    // 107
          }                                                                                                           //
        } else {                                                                                                      //
          Fse.readJson(path.join(execPath, configFile), Meteor.bindEnvironment(function (er, config) {                // 110
            if (er) {                                                                                                 // 111
              future['throw'](er);                                                                                    // 112
            } else {                                                                                                  //
              _this2.config = config;                                                                                 // 114
              var _hasAssets = _this2._getAssets();                                                                   // 115
              if (_hasAssets) {                                                                                       // 116
                _this2._writeToConfig();                                                                              // 117
                var _init2 = _this2._init();                                                                          // 118
                if (_init2) {                                                                                         // 119
                  future['return'](true);                                                                             // 120
                } else {                                                                                              //
                  future['throw'](false);                                                                             // 122
                }                                                                                                     //
              } else {                                                                                                //
                future['return'](true);                                                                               // 125
              }                                                                                                       //
            }                                                                                                         //
          }));                                                                                                        //
        }                                                                                                             //
      }));                                                                                                            //
      return future.wait();                                                                                           // 131
    }                                                                                                                 //
                                                                                                                      //
    return _checkConfig;                                                                                              //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * run <code>ipfs init</code>                                                                                       //
   * @returns {*|any}                                                                                                 //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._init = function () {                                                                       // 35
    function _init() {                                                                                                //
      var future = new Future();                                                                                      // 140
      var q = exec(this.executable + ' init');                                                                        // 141
                                                                                                                      //
      q.on('exit', function (code) {                                                                                  // 143
        future['return'](true);                                                                                       // 144
      });                                                                                                             //
                                                                                                                      //
      q.on('error', function (err) {                                                                                  // 147
        future['throw'](err);                                                                                         // 148
      });                                                                                                             //
      return future.wait();                                                                                           // 150
    }                                                                                                                 //
                                                                                                                      //
    return _init;                                                                                                     //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * donwload and unzip ipfs                                                                                          //
   * @param force                                                                                                     //
   * @returns {boolean}                                                                                               //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._getAssets = function () {                                                                  // 35
    function _getAssets() {                                                                                           //
      var _this3 = this;                                                                                              //
                                                                                                                      //
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];                         //
                                                                                                                      //
      var hasInit = this._checkIpfsConfig();                                                                          // 160
      if (!hasInit) {                                                                                                 // 161
        force = true;                                                                                                 // 162
      }                                                                                                               //
      if (force || this.config.version != binariesVersion) {                                                          // 164
        var _ret2 = function () {                                                                                     //
          var zipPath = path.join(execPath, 'ipfs-' + binariesVersion + '.zip');                                      // 165
          var future = new Future();                                                                                  // 166
                                                                                                                      //
          Shelljs.mkdir('-p', ipfsRoot);                                                                              // 168
                                                                                                                      //
          var file = Fse.createWriteStream(zipPath);                                                                  // 170
          Request.get(binaries[device]).on('response', function (response) {                                          // 171
                                                                                                                      //
            /** nice message for download **/                                                                         //
            if (response.statusCode == 200) {                                                                         // 174
              log.info('====Started to download IPFS binaries===');                                                   // 175
            }                                                                                                         //
          }).on('error', function (error) {                                                                           //
                                                                                                                      //
            log.error('!!!Could not download IPFS binaries!!!');                                                      // 179
            future['throw']('could not download IPFS');                                                               // 180
          }).pipe(file).on('finish', function () {                                                                    //
            log.info('====download completed...unzipping files...====');                                              // 182
                                                                                                                      //
            /** extract .zip contents to .private/ipfs **/                                                            //
            var zip = new AdmZip(zipPath);                                                                            // 181
            zip.extractAllTo(execPath);                                                                               // 186
                                                                                                                      //
            /** just to be sure that ipfs is executable **/                                                           //
            Shelljs.chmod('+x', path.join(ipfsRoot, process.platform == 'win32' ? 'ipfs.exe' : 'ipfs'));              // 181
            log.info('finished');                                                                                     // 191
            _this3._delZip();                                                                                         // 192
            future['return'](true);                                                                                   // 193
          });                                                                                                         //
          return {                                                                                                    // 195
            v: future.wait()                                                                                          //
          };                                                                                                          //
        }();                                                                                                          //
                                                                                                                      //
        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3['default'])(_ret2)) === "object") return _ret2.v;
      }                                                                                                               //
      return false;                                                                                                   // 197
    }                                                                                                                 //
                                                                                                                      //
    return _getAssets;                                                                                                //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * write current ipfs version                                                                                       //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._writeToConfig = function () {                                                              // 35
    function _writeToConfig() {                                                                                       //
      var _this4 = this;                                                                                              //
                                                                                                                      //
      writeJson(path.join(execPath, configFile), { version: binariesVersion }, Meteor.bindEnvironment(function (error) {
        if (error) {                                                                                                  // 206
          log.error('could not write to ipfs.json');                                                                  // 207
        } else {                                                                                                      //
          _this4.config = { version: binariesVersion };                                                               // 209
        }                                                                                                             //
      }));                                                                                                            //
    }                                                                                                                 //
                                                                                                                      //
    return _writeToConfig;                                                                                            //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * check if <code>ipfs init</code>                                                                                  //
   * @returns {*|any}                                                                                                 //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._checkIpfsConfig = function () {                                                            // 35
    function _checkIpfsConfig() {                                                                                     //
      var future = new Future();                                                                                      // 220
      Fse.stat(path.join(homeDir, '.ipfs/config'), Meteor.bindEnvironment(function (err, stats) {                     // 221
        if (err) {                                                                                                    // 222
          future['return'](false);                                                                                    // 223
        } else {                                                                                                      //
          future['return'](true);                                                                                     // 225
        }                                                                                                             //
      }));                                                                                                            //
      return future.wait();                                                                                           // 228
    }                                                                                                                 //
                                                                                                                      //
    return _checkIpfsConfig;                                                                                          //
  }();                                                                                                                //
                                                                                                                      //
  IpfsConnector.prototype.stop = function () {                                                                        // 35
    function stop() {                                                                                                 //
      this._kill();                                                                                                   // 232
      this.ipfsConnector = false;                                                                                     // 233
    }                                                                                                                 //
                                                                                                                      //
    return stop;                                                                                                      //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * kill child process & cleanup                                                                                     //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._kill = function () {                                                                       // 35
    function _kill() {                                                                                                //
      this.ipfsProcess.kill();                                                                                        // 241
    }                                                                                                                 //
                                                                                                                      //
    return _kill;                                                                                                     //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   * delete ipfs archives                                                                                             //
   * @private                                                                                                         //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype._delZip = function () {                                                                     // 35
    function _delZip() {                                                                                              //
      Shelljs.rm('-rf', path.join(execPath, 'ipfs-*.zip'));                                                           // 249
    }                                                                                                                 //
                                                                                                                      //
    return _delZip;                                                                                                   //
  }();                                                                                                                //
                                                                                                                      //
  /**                                                                                                                 //
   *                                                                                                                  //
   * @param level from $logLevels                                                                                     //
   */                                                                                                                 //
                                                                                                                      //
                                                                                                                      //
  IpfsConnector.prototype.setLogLevel = function () {                                                                 // 35
    function setLogLevel() {                                                                                          //
      var level = arguments.length <= 0 || arguments[0] === undefined ? 'info' : arguments[0];                        //
                                                                                                                      //
      if (logLevels.indexOf(level) != -1) {                                                                           // 257
        log.setLevel(level);                                                                                          // 258
      } else {                                                                                                        //
        log.error('level not from logLevels ', logLevels);                                                            // 260
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    return setLogLevel;                                                                                               //
  }();                                                                                                                //
                                                                                                                      //
  return IpfsConnector;                                                                                               //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"ipfsServerMethods.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/akasha_meteor-ipfs/lib/ipfsServerMethods.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Future = Npm.require('fibers/future');                                                                            // 1
                                                                                                                      //
Meteor.methods({                                                                                                      // 3
  ipfsCat: function () {                                                                                              // 5
    function ipfsCat(hash) {                                                                                          //
                                                                                                                      //
      check(hash, String);                                                                                            // 7
      var wrappedFiber = void 0;                                                                                      // 8
      var wrappedApi = void 0;                                                                                        // 9
      var ipfsStream = void 0;                                                                                        // 10
      var instance = IpfsConnector.getInstance();                                                                     // 11
      var currentChunk = new Buffer(0);                                                                               // 12
                                                                                                                      //
      if (!instance.api) {                                                                                            // 14
        throw new Meteor.Error('ipfs-not-started', 'ipfs process is not running');                                    // 15
      }                                                                                                               //
                                                                                                                      //
      wrappedApi = Meteor.wrapAsync(instance.api.cat);                                                                // 18
      ipfsStream = wrappedApi(hash);                                                                                  // 19
                                                                                                                      //
      if (ipfsStream.readable) {                                                                                      // 21
        wrappedFiber = new Future();                                                                                  // 22
        ipfsStream.on('data', function (chunk) {                                                                      // 23
          currentChunk = Buffer.concat([currentChunk, chunk]);                                                        // 24
        });                                                                                                           //
        ipfsStream.on('end', function () {                                                                            // 26
          wrappedFiber['return'](currentChunk.toString());                                                            // 27
        });                                                                                                           //
        ipfsStream.on('error', function (err) {                                                                       // 29
          wrappedFiber['throw'](err);                                                                                 // 30
        });                                                                                                           //
        return wrappedFiber.wait();                                                                                   // 32
      }                                                                                                               //
      return ipfsStream;                                                                                              // 34
    }                                                                                                                 //
                                                                                                                      //
    return ipfsCat;                                                                                                   //
  }(),                                                                                                                //
                                                                                                                      //
                                                                                                                      //
  /**                                                                                                                 //
   *                                                                                                                  //
   * @param content                                                                                                   //
   * @param isArrayBuffer                                                                                             //
   */                                                                                                                 //
  ipfsAdd: function () {                                                                                              // 42
    function ipfsAdd(content) {                                                                                       //
      //check(content, String);                                                                                       //
      var wrappedApi = void 0;                                                                                        // 44
      var wrappedFiber = new Future();                                                                                // 45
      var instance = IpfsConnector.getInstance();                                                                     // 46
                                                                                                                      //
      if (!instance.api) {                                                                                            // 48
        return new Meteor.Error('ipfs-not-started', 'ipfs process is not running');                                   // 49
      }                                                                                                               //
                                                                                                                      //
      wrappedApi = Meteor.wrapAsync(instance.api.add);                                                                // 52
      if (EJSON.isBinary(content) && content.buffer) {                                                                // 53
        content = new Buffer(new Uint8Array(content.buffer));                                                         // 54
      } else {                                                                                                        //
        content = new Buffer(content);                                                                                // 56
      }                                                                                                               //
                                                                                                                      //
      wrappedApi(content, function (err, res) {                                                                       // 59
        if (err || !res) {                                                                                            // 60
          return wrappedFiber['throw'](err);                                                                          // 61
        }                                                                                                             //
        wrappedFiber['return'](res[0].Hash);                                                                          // 63
      });                                                                                                             //
                                                                                                                      //
      return wrappedFiber.wait();                                                                                     // 66
    }                                                                                                                 //
                                                                                                                      //
    return ipfsAdd;                                                                                                   //
  }()                                                                                                                 //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/akasha:meteor-ipfs/lib/ipfsConnector.js");
require("./node_modules/meteor/akasha:meteor-ipfs/lib/ipfsServerMethods.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['akasha:meteor-ipfs'] = {}, {
  IpfsConnector: IpfsConnector
});

})();

//# sourceMappingURL=akasha_meteor-ipfs.js.map
