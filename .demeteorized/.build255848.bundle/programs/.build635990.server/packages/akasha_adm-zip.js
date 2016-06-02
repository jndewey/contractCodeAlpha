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
var AdmZip;

var require = meteorInstall({"node_modules":{"meteor":{"akasha:adm-zip":{"adm-zip.js":function(require){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/akasha_adm-zip/adm-zip.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
AdmZip = Npm.require('adm-zip');                                     // 1
///////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/akasha:adm-zip/adm-zip.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['akasha:adm-zip'] = {}, {
  AdmZip: AdmZip
});

})();

//# sourceMappingURL=akasha_adm-zip.js.map
