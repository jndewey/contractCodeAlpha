(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var solc;

(function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/silentcicero_solc-compiler/package-init.js                               //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
// Node environment
if(typeof global !== 'undefined') {
    solc = (typeof global.solc !== 'undefined') ? global.solc : Npm.require('solc');
}

///////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['silentcicero:solc-compiler'] = {}, {
  solc: solc
});

})();

//# sourceMappingURL=silentcicero_solc-compiler.js.map
