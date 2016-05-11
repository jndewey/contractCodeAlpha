var require = meteorInstall({"imports":{"api":{"compiler":{"compiler.js":["meteor/silentcicero:solc-compiler","async",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// imports/api/compiler/compiler.js                                                                   //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _silentciceroSolcCompiler = require('meteor/silentcicero:solc-compiler');                         // 4
                                                                                                      //
var _async = require('async');                                                                        // 5
                                                                                                      //
var _async2 = _interopRequireDefault(_async);                                                         //
                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }     //
                                                                                                      //
//import compile from './node_modules/solc/bin/soljson-latest.js';                                    //
//import solc from './bin/soljson-latest.js';                                                         //
//import solc from 'solc';                                                                            //
                                                                                                      //
                                                                                                      //
if (Meteor.isServer) {                                                                                // 7
  Meteor.methods({                                                                                    // 8
    'compile': function () {                                                                          // 9
      function compile(input, options) {                                                              // 9
        var future = new Future();                                                                    // 10
        var codeInput = input;                                                                        // 11
        var response = _silentciceroSolcCompiler.solc.compile(codeInput, options);                    // 12
        //return response;                                                                            //
        future['return'](response);                                                                   // 9
        return future.wait();                                                                         // 15
      }                                                                                               //
                                                                                                      //
      return compile;                                                                                 //
    }(),                                                                                              //
                                                                                                      //
    'solcer': function () {                                                                           // 18
      function solcer() {                                                                             // 18
        //var solc = require('solc');                                                                 //
        var input = "contract x { function g() {} }";                                                 // 20
        var output = _silentciceroSolcCompiler.solc.compile(input, 1); // 1 activates the optimiser   // 21
        for (var contractName in meteorBabelHelpers.sanitizeForInObject(output.contracts)) {          // 18
          // code and ABI that are needed by web3                                                     //
          console.log(contractName + ': ' + output.contracts[contractName].bytecode);                 // 24
          console.log(contractName + '; ' + JSON.parse(output.contracts[contractName]['interface']));
        }                                                                                             //
      }                                                                                               //
                                                                                                      //
      return solcer;                                                                                  //
    }()                                                                                               //
                                                                                                      //
  });                                                                                                 //
}                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"documents":{"documents.js":["meteor/mongo",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// imports/api/documents/documents.js                                                                 //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _mongo = require('meteor/mongo');                                                                 // 1
                                                                                                      //
Documents = new _mongo.Mongo.Collection('Documents');                                                 // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"startup":{"server":{"index.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// imports/startup/server/index.js                                                                    //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
                                                                                                      //
                                                                                                      //
// don't forget to import server methods and other server side API files                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":["meteor/meteor","../imports/startup/server/index.js","../imports/api/documents/documents.js","../imports/api/compiler/compiler.js",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// server/main.js                                                                                     //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
var _meteor = require('meteor/meteor');                                                               // 1
                                                                                                      //
require('../imports/startup/server/index.js');                                                        // 2
                                                                                                      //
require('../imports/api/documents/documents.js');                                                     // 3
                                                                                                      //
require('../imports/api/compiler/compiler.js');                                                       // 4
                                                                                                      //
_meteor.Meteor.startup(function () {                                                                  // 6
  process.env.MONGO_URL = 'mongodb://root:xAw5orybyg@olympia.modulusmongo.net:27017/ymEhe9ju?autoReconnect=true&connectTimeoutMS=60000';
});                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
