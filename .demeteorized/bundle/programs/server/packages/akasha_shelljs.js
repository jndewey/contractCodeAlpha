(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Shelljs;

var require = meteorInstall({"node_modules":{"meteor":{"akasha:shelljs":{"shelljs.js":function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/akasha_shelljs/shelljs.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Shelljs = Npm.require('shelljs');                                    // 1
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/akasha:shelljs/shelljs.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['akasha:shelljs'] = {}, {
  Shelljs: Shelljs
});

})();

//# sourceMappingURL=akasha_shelljs.js.map
