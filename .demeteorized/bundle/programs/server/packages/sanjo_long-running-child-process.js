(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;

/* Package-scope variables */
var log, findAppDir, __coffeescriptShare, LongRunningChildProcess;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/sanjo_long-running-child-process/lib/log.js                                                      //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
log = loglevel.createPackageLogger(
  '[sanjo:long-running-child-process]',
  process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL || 'info'
)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/sanjo_long-running-child-process/lib/meteor/files.js                                             //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/**
 * Copied from Meteor tools/files.js.
 *
 * Includes:
 * - Helper to find the app root path
 */

var path = Npm.require('path');
var fs = Npm.require('fs');

// given a predicate function and a starting path, traverse upwards
// from the path until we find a path that satisfies the predicate.
//
// returns either the path to the lowest level directory that passed
// the test or null for none found. if starting path isn't given, use
// cwd.
var findUpwards = function (predicate, startPath) {
  var testDir = startPath || process.cwd();
  while (testDir) {
    if (predicate(testDir)) {
      break;
    }
    var newDir = path.dirname(testDir);
    if (newDir === testDir) {
      testDir = null;
    } else {
      testDir = newDir;
    }
  }
  if (!testDir)
    return null;

  return testDir;
};

// Determine if 'filepath' (a path, or omit for cwd) is within an app
// directory. If so, return the top-level app directory.
findAppDir = function (filepath) {
  var isAppDir = function (filepath) {
    // XXX once we are done with the transition to engine, this should
    // change to: `return fs.existsSync(path.join(filepath, '.meteor',
    // 'release'))`

    // .meteor/packages can be a directory, if .meteor is a warehouse
    // directory.  since installing meteor initializes a warehouse at
    // $HOME/.meteor, we want to make sure your home directory (and all
    // subdirectories therein) don't count as being within a meteor app.
    try { // use try/catch to avoid the additional syscall to fs.existsSync
      return fs.statSync(path.join(filepath, '.meteor', 'packages')).isFile();
    } catch (e) {
      return false;
    }
  };

  return findUpwards(isAppDir, filepath);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/sanjo_long-running-child-process/lib/LongRunningChildProcess.coffee.js                           //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var assert, child_process, fs, path;                                                                         // 1
                                                                                                             //
fs = Npm.require('fs-extra');                                                                                // 1
                                                                                                             //
path = Npm.require('path');                                                                                  // 1
                                                                                                             //
assert = Npm.require('assert');                                                                              // 1
                                                                                                             //
child_process = Npm.require('child_process');                                                                // 1
                                                                                                             //
if (this.sanjo == null) {                                                                                    //
  this.sanjo = {};                                                                                           //
}                                                                                                            //
                                                                                                             //
sanjo.LongRunningChildProcess = (function() {                                                                // 1
  LongRunningChildProcess.prototype.taskName = null;                                                         // 10
                                                                                                             //
  LongRunningChildProcess.prototype.child = null;                                                            // 10
                                                                                                             //
  LongRunningChildProcess.prototype.pid = null;                                                              // 10
                                                                                                             //
  LongRunningChildProcess.prototype.dead = false;                                                            // 10
                                                                                                             //
  function LongRunningChildProcess(taskName) {                                                               // 17
    log.debug("LongRunningChildProcess.constructor(taskName=" + taskName + ")");                             // 18
    this.taskName = taskName;                                                                                // 18
    this.pid = this.readPid();                                                                               // 18
  }                                                                                                          //
                                                                                                             //
  LongRunningChildProcess.prototype.getTaskName = function() {                                               // 10
    return this.taskName;                                                                                    //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.getChild = function() {                                                  // 10
    return this.child;                                                                                       //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.getPid = function() {                                                    // 10
    return this.pid;                                                                                         //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._setPid = function(pid) {                                                // 10
    log.debug("LongRunningChildProcess._setPid(pid=" + pid + ")");                                           // 37
    this.pid = pid;                                                                                          // 37
    log.debug("Saving " + this.taskName + " pid " + pid + " to " + (this._getPidFilePath()));                // 37
    return fs.outputFile(this._getPidFilePath(), "" + pid);                                                  //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.isDead = function() {                                                    // 10
    return this.dead;                                                                                        //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.isRunning = function() {                                                 // 10
    var err, pid;                                                                                            // 48
    log.debug('LongRunningChildProcess.isRunning()');                                                        // 48
    pid = this.getPid();                                                                                     // 48
    if (!pid) {                                                                                              // 52
      log.debug("LongRunningChildProcess.isRunning returns false");                                          // 53
      return false;                                                                                          // 54
    }                                                                                                        //
    try {                                                                                                    // 56
      process.kill(pid, 0);                                                                                  // 58
      log.debug("LongRunningChildProcess.isRunning returns true");                                           // 58
      return true;                                                                                           // 61
    } catch (_error) {                                                                                       //
      err = _error;                                                                                          // 63
      log.trace(err);                                                                                        // 63
      log.debug("LongRunningChildProcess.isRunning returns false");                                          // 63
      return false;                                                                                          // 65
    }                                                                                                        //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getMeteorPid = function() {                                             // 10
    var parentPid, parentPidIndex;                                                                           // 70
    parentPid = null;                                                                                        // 70
    parentPidIndex = _.indexOf(process.argv, '--parent-pid');                                                // 70
    if (parentPidIndex !== -1) {                                                                             // 73
      parentPid = process.argv[parentPidIndex + 1];                                                          // 74
      log.debug("The pid of the main Meteor app process is " + parentPid);                                   // 74
    } else if (process.env.METEOR_PARENT_PID) {                                                              //
      parentPid = process.env.METEOR_PARENT_PID;                                                             // 78
      log.debug("The pid of the main Meteor app process is " + parentPid);                                   // 78
    } else {                                                                                                 //
      log.error('Could not find the pid of the main Meteor app process');                                    // 81
    }                                                                                                        //
    return parentPid;                                                                                        // 83
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getMeteorAppPath = function() {                                         // 10
    if (!this.appPath) {                                                                                     // 87
      this.appPath = path.resolve(findAppDir());                                                             // 87
    }                                                                                                        //
    return this.appPath;                                                                                     // 88
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getMeteorLocalPath = function() {                                       // 10
    return path.join(this._getMeteorAppPath(), '.meteor/local');                                             //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getPidFilePath = function() {                                           // 10
    return path.join(this._getMeteorLocalPath(), "run/" + this.taskName + ".pid");                           //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getLogFilePath = function() {                                           // 10
    return path.join(this._getMeteorLocalPath(), "log/" + this.taskName + ".log");                           //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype._getSpawnScriptPath = function() {                                       // 10
    return path.join(this._getMeteorLocalPath(), 'build/programs/server/assets/packages/' + 'sanjo_long-running-child-process/lib/spawnScript.js');
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.readPid = function() {                                                   // 10
    var err, pid;                                                                                            // 111
    log.debug('LongRunningChildProcess.readPid()');                                                          // 111
    try {                                                                                                    // 112
      pid = parseInt(fs.readFileSync(this._getPidFilePath(), {                                               // 113
        encoding: 'utf8'                                                                                     // 113
      }, 10));                                                                                               //
      log.debug("LongRunningChildProcess.readPid returns " + pid);                                           // 113
      return pid;                                                                                            // 115
    } catch (_error) {                                                                                       //
      err = _error;                                                                                          // 117
      log.debug('LongRunningChildProcess.readPid returns null');                                             // 117
      return null;                                                                                           // 118
    }                                                                                                        //
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.spawn = function(options) {                                              // 10
    var command, commandArgs, env, logFile, nodeDir, nodePath, spawnOptions, spawnScript, stdio;             // 122
    log.debug("LongRunningChildProcess.spawn()", options);                                                   // 122
    check(options, Match.ObjectIncluding({                                                                   // 122
      command: String,                                                                                       // 123
      args: [Match.Any],                                                                                     // 123
      options: Match.Optional(Match.ObjectIncluding({                                                        // 123
        cwd: Match.Optional(Match.OneOf(String, void 0)),                                                    // 126
        env: Match.Optional(Object),                                                                         // 126
        stdio: Match.Optional(Match.OneOf(String, [Match.Any]))                                              // 126
      }))                                                                                                    //
    }));                                                                                                     //
    if (!options.options) {                                                                                  // 134
      options.options = {};                                                                                  // 134
    }                                                                                                        //
    if (this.isRunning()) {                                                                                  // 136
      return false;                                                                                          // 137
    }                                                                                                        //
    logFile = this._getLogFilePath();                                                                        // 122
    fs.ensureDirSync(path.dirname(logFile));                                                                 // 122
    if (options.options.stdio) {                                                                             // 142
      stdio = options.options.stdio;                                                                         // 143
    } else {                                                                                                 //
      this.fout = fs.openSync(logFile, 'w');                                                                 // 145
      stdio = ['ignore', this.fout, this.fout];                                                              // 145
    }                                                                                                        //
    nodePath = process.execPath;                                                                             // 122
    nodeDir = path.dirname(nodePath);                                                                        // 122
    env = _.clone(options.options.env || process.env);                                                       // 122
    env.PATH = nodeDir + ':' + (env.PATH || process.env.PATH);                                               // 122
    if (process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL && !env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL) {     // 153
      env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL = process.env.LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL;           // 154
    }                                                                                                        //
    spawnOptions = {                                                                                         // 122
      cwd: options.options.cwd || this._getMeteorAppPath(),                                                  // 155
      env: env,                                                                                              // 155
      detached: true,                                                                                        // 155
      stdio: stdio                                                                                           // 155
    };                                                                                                       //
    command = path.basename(options.command);                                                                // 122
    spawnScript = this._getSpawnScriptPath();                                                                // 122
    commandArgs = [spawnScript, this._getMeteorPid(), this._getPidFilePath(), this.taskName, options.command].concat(options.args);
    fs.chmodSync(spawnScript, 0x164);                                                                        // 122
    log.debug("LongRunningChildProcess.spawn is spawning '" + command + "'");                                // 122
    this.child = child_process.spawn(nodePath, commandArgs, spawnOptions);                                   // 122
    this.dead = false;                                                                                       // 122
    this._setPid(this.child.pid);                                                                            // 122
    this.child.on("exit", (function(_this) {                                                                 // 122
      return function(code) {                                                                                //
        log.debug("LongRunningChildProcess: child_process.on 'exit': command=" + command + " code=" + code);
        if (_this.fout) {                                                                                    // 174
          return fs.closeSync(_this.fout);                                                                   //
        }                                                                                                    //
      };                                                                                                     //
    })(this));                                                                                               //
    return true;                                                                                             // 176
  };                                                                                                         //
                                                                                                             //
  LongRunningChildProcess.prototype.kill = function(signal) {                                                // 10
    var err, pid;                                                                                            // 180
    if (signal == null) {                                                                                    //
      signal = "SIGINT";                                                                                     //
    }                                                                                                        //
    log.debug("LongRunningChildProcess.kill(signal=" + signal + ")");                                        // 180
    if (!this.dead) {                                                                                        // 182
      try {                                                                                                  // 183
        if (this.child != null) {                                                                            // 188
          this.child.kill(signal);                                                                           // 189
        } else {                                                                                             //
          pid = this.getPid();                                                                               // 191
          process.kill(pid, signal);                                                                         // 191
        }                                                                                                    //
        this.dead = true;                                                                                    // 188
        this.pid = null;                                                                                     // 188
        return fs.removeSync(this._getPidFilePath());                                                        //
      } catch (_error) {                                                                                     //
        err = _error;                                                                                        // 197
        return log.warn("Error: While killing process:\n", err);                                             //
      }                                                                                                      //
    }                                                                                                        //
  };                                                                                                         //
                                                                                                             //
  return LongRunningChildProcess;                                                                            //
                                                                                                             //
})();                                                                                                        //
                                                                                                             //
if (process.env.IS_MIRROR === 'true') {                                                                      // 201
  sanjo.LongRunningChildProcess.fs = fs;                                                                     // 202
  sanjo.LongRunningChildProcess.path = path;                                                                 // 202
  sanjo.LongRunningChildProcess.assert = assert;                                                             // 202
  sanjo.LongRunningChildProcess.child_process = child_process;                                               // 202
}                                                                                                            //
                                                                                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/sanjo_long-running-child-process/main.js                                                         //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
/* globals LongRunningChildProcess: true */

LongRunningChildProcess = sanjo.LongRunningChildProcess

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['sanjo:long-running-child-process'] = {}, {
  LongRunningChildProcess: LongRunningChildProcess
});

})();

//# sourceMappingURL=sanjo_long-running-child-process.js.map
