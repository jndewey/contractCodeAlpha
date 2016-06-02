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
var Fse;

var require = meteorInstall({"node_modules":{"meteor":{"akasha:fs-extra":{"fs-extra.js":function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/akasha_fs-extra/fs-extra.js                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Fse = Npm.require('fs-extra');                                       // 1
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/akasha:fs-extra/fs-extra.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['akasha:fs-extra'] = {}, {
  Fse: Fse
});

})();

//# sourceMappingURL=akasha_fs-extra.js.map
