var require = meteorInstall({"imports":{"api":{"DOCX":{"docx.js":["fs","meteor-node-stubs/deps/fs",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/DOCX/docx.js                                                                       //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var fs = require('fs');                                                                           // 1
                                                                                                  //
if (Meteor.isServer) {                                                                            // 3
                                                                                                  //
  Meteor.methods({                                                                                // 5
                                                                                                  //
    'readFile': function () {                                                                     // 7
      function readFile(inputFile) {                                                              // 7
        fs.readFile(inputFile, 'utf-8', function (err, html) {                                    // 8
          if (err) return err;                                                                    // 9
          console.log(html);                                                                      // 10
          return html;                                                                            // 11
        });                                                                                       //
      }                                                                                           //
                                                                                                  //
      return readFile;                                                                            //
    }(),                                                                                          //
                                                                                                  //
    'writeFile': function () {                                                                    // 15
      function writeFile(outputFile, docx) {                                                      // 15
        fs.writeFile(outputFile, docx, function (err) {                                           // 16
          if (err) return err;                                                                    // 17
        });                                                                                       //
      }                                                                                           //
                                                                                                  //
      return writeFile;                                                                           //
    }()                                                                                           //
                                                                                                  //
  });                                                                                             //
}                                                                                                 //
                                                                                                  //
/*                                                                                                //
                                                                                                  //
var HtmlDocx = require('html-docx-js');                                                           //
    var inputFile = '~/test.html';                                                                //
    var outputFile = 'text.docx';                                                                 //
    Meteor.call('readFile', inputFile, function(err, html) {                                      //
    if (err) console.log(err);                                                                    //
    var docx = HtmlDocx.asBlob(html);                                                             //
    Meteor.call('writeFile', outputFile, docx, function(err) {                                    //
    if (err) console.log(err);                                                                    //
    });                                                                                           //
                                                                                                  //
                                                                                                  //
 */                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"IPFS":{"ipfs.js":["meteor/akasha:meteor-ipfs",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/IPFS/ipfs.js                                                                       //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _akashaMeteorIpfs = require('meteor/akasha:meteor-ipfs');                                     // 1
                                                                                                  //
//import ipfsAPI from 'ipfs-api';                                                                 //
                                                                                                  //
// for global access on server side                                                               //
ipfsObj = false;                                                                                  // 5
                                                                                                  //
/* var hash = 'QmQ1xrPzKaFharLbkqoFnhrXN1cLpdQj6RstVrVS9zhAEu';                                   //
    Meteor.call('ipfsCat', hash, function(err,resp){                                              //
    if ( err ) {                                                                                  //
    console.log( err );                                                                           //
    } else {                                                                                      //
    console.log( resp );                                                                          //
        }                                                                                         //
    }); */                                                                                        //
                                                                                                  //
/* Meteor.call('ipfsAdd', "Needs to be html", function(err,resp){                                 //
if ( err ) {                                                                                      //
console.log( err );                                                                               //
} else {                                                                                          //
console.log( resp );                                                                              //
    }                                                                                             //
});                                                                                               //
 */                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"PDF":{"pdf.js":["meteor/jspdf:core",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/PDF/pdf.js                                                                         //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _jspdfCore = require('meteor/jspdf:core');                                                    // 1
                                                                                                  //
if (Meteor.isServer) {                                                                            // 3
    Meteor.methods({                                                                              // 4
        'createPDF': function () {                                                                // 5
            function createPDF() {                                                                // 5
                var doc = new jsPDF();                                                            // 6
                doc.text(20, 20, 'Hello world.');                                                 // 7
                doc.save('Test.pdf');                                                             // 8
            }                                                                                     //
                                                                                                  //
            return createPDF;                                                                     //
        }()                                                                                       //
    });                                                                                           //
}                                                                                                 //
                                                                                                  //
/*                                                                                                //
                                                                                                  //
var doc = new jsPDF();                                                                            //
    doc.text(20, 20, 'Hello world.');                                                             //
    doc.save('Test.pdf');                                                                         //
    Meteor.call('ipfsAdd', "Needs to be html", function(err,resp){                                //
    if ( err ) {                                                                                  //
    console.log( err );                                                                           //
    } else {                                                                                      //
    console.log( resp );                                                                          //
        }                                                                                         //
    });                                                                                           //
                                                                                                  //
    */                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"compiler":{"compiler.js":["meteor/silentcicero:solc-compiler",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/compiler/compiler.js                                                               //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _silentciceroSolcCompiler = require('meteor/silentcicero:solc-compiler');                     // 4
                                                                                                  //
if (Meteor.isServer) {                                                                            // 6
  Meteor.methods({                                                                                // 7
    'compile': function () {                                                                      // 8
      function compile(input, options) {                                                          // 8
        var future = new Future();                                                                // 9
        var codeInput = input;                                                                    // 10
        var response = _silentciceroSolcCompiler.solc.compile(codeInput, options);                // 11
        future['return'](response);                                                               // 12
        return future.wait();                                                                     // 13
      }                                                                                           //
                                                                                                  //
      return compile;                                                                             //
    }()                                                                                           //
                                                                                                  //
  });                                                                                             //
} //import compile from './node_modules/solc/bin/soljson-latest.js';                              //
//import solc from './bin/soljson-latest.js';                                                     //
//import solc from 'solc';                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"documents":{"documents.js":["meteor/mongo",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/documents/documents.js                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _mongo = require('meteor/mongo');                                                             // 1
                                                                                                  //
Documents = new _mongo.Mongo.Collection('Documents');                                             // 3
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"encryption":{"encryption.js":["openpgp",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/encryption/encryption.js                                                           //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _openpgp = require('openpgp');                                                                // 1
                                                                                                  //
var _openpgp2 = _interopRequireDefault(_openpgp);                                                 //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
if (Meteor.isServer) {                                                                            // 3
                                                                                                  //
  Meteor.methods({                                                                                // 5
                                                                                                  //
    'encrypt': function () {                                                                      // 7
      function encrypt(message, publicKey) {                                                      // 7
        var future = new Future();                                                                // 8
        var openpgp = require('openpgp');                                                         // 9
        openpgp.initWorker({ path: 'openpgp.worker.js' });                                        // 10
        openpgp.config.aead_protect = true;                                                       // 11
        var options, encrypted;                                                                   // 12
        var pubkey = publicKey;                                                                   // 13
        //var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';    //
        options = {                                                                               // 7
          data: message, // input as String (or Uint8Array)                                       // 16
          publicKeys: openpgp.key.readArmored(pubkey).keys };                                     // 17
        // for encryption                                                                         //
        //privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional)            //
        openpgp.encrypt(options).then(function (ciphertext) {                                     // 20
          encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'       // 21
        });                                                                                       // 20
        console.log(ciphertext.data);                                                             // 23
        var response = encrypted;                                                                 // 24
        future['return'](response);                                                               // 25
        return future.wait();                                                                     // 26
      }                                                                                           //
                                                                                                  //
      return encrypt;                                                                             //
    }(),                                                                                          //
    'createKeys': function () {                                                                   // 28
      function createKeys() {                                                                     // 28
        var future = new Future();                                                                // 29
        var openpgp = require('openpgp');                                                         // 30
        openpgp.initWorker({ path: 'openpgp.worker.js' });                                        // 31
        openpgp.config.aead_protect = true;                                                       // 32
        var options = {                                                                           // 33
          userIds: [{ name: 'Jon Smith', email: 'jon@example.com' }], // multiple user IDs        // 34
          numBits: 4096, // RSA key size                                                          // 35
          passphrase: 'super long and hard to guess secret' // protects the private key           // 36
        };                                                                                        // 33
        openpgp.generateKey(options).then(function (key) {                                        // 38
          var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '         // 39
          var pubkey = key.publicKeyArmored; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '            // 38
          console.log(pubkey);                                                                    // 38
          var keyPair = [privkey, pubkey];                                                        // 42
          var response = keyPair[0];                                                              // 43
          future['return'](response);                                                             // 44
          return future.wait();                                                                   // 45
        });                                                                                       //
      }                                                                                           //
                                                                                                  //
      return createKeys;                                                                          //
    }(),                                                                                          //
                                                                                                  //
    'decrypt': function () {                                                                      // 49
      function decrypt(message, privateK) {                                                       // 49
        var future = new Future();                                                                // 50
        var pgpMessage = message;                                                                 // 51
        pgpMessage = _openpgp2['default'].message.readArmored(pgpMessage);                        // 52
        var key = privateK;                                                                       // 53
        var privateKey = _openpgp2['default'].key.readArmored(key).keys[0];                       // 54
        privateKey.decrypt('passphrase');                                                         // 55
        _openpgp2['default'].decryptMessage(privateKey, pgpMessage).then(function (plaintext) {   // 56
          console.log(plaintext);                                                                 // 57
          var plaintext = plaintext;                                                              // 58
          future["return"](plaintext);                                                            // 59
        });                                                                                       //
        return future.wait();                                                                     // 61
      }                                                                                           //
                                                                                                  //
      return decrypt;                                                                             //
    }()                                                                                           //
                                                                                                  //
  });                                                                                             //
}                                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"wallet":{"wallet.js":["meteor/silentcicero:ethereumjs-accounts",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/wallet/wallet.js                                                                   //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _silentciceroEthereumjsAccounts = require('meteor/silentcicero:ethereumjs-accounts');         // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"startup":{"server":{"index.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/startup/server/index.js                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
                                                                                                  //
                                                                                                  //
// don't forget to import server methods and other server side API files                          //
////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":["meteor/meteor","../imports/startup/server/index.js","../imports/api/documents/documents.js","../imports/api/compiler/compiler.js","../imports/api/encryption/encryption.js","../imports/api/wallet/wallet.js","../imports/api/IPFS/ipfs.js","../imports/api/PDF/pdf.js","../imports/api/DOCX/docx.js",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// server/main.js                                                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _meteor = require('meteor/meteor');                                                           // 1
                                                                                                  //
require('../imports/startup/server/index.js');                                                    // 2
                                                                                                  //
require('../imports/api/documents/documents.js');                                                 // 3
                                                                                                  //
require('../imports/api/compiler/compiler.js');                                                   // 4
                                                                                                  //
require('../imports/api/encryption/encryption.js');                                               // 5
                                                                                                  //
require('../imports/api/wallet/wallet.js');                                                       // 6
                                                                                                  //
require('../imports/api/IPFS/ipfs.js');                                                           // 7
                                                                                                  //
require('../imports/api/PDF/pdf.js');                                                             // 8
                                                                                                  //
require('../imports/api/DOCX/docx.js');                                                           // 9
                                                                                                  //
_meteor.Meteor.startup(function () {                                                              // 11
  process.env.MONGO_URL = 'mongodb://root:xAw5orybyg@olympia.modulusmongo.net:27017/ymEhe9ju?autoReconnect=true&connectTimeoutMS=60000';
  /* ipfsObj =  IpfsConnector.getInstance(); //singleton                                          //
  ipfsObj.setLogLevel('info'); // info is default                                                 //
  const testIpfs = function () {                                                                  //
  // start ipfs daemon                                                                            //
  let started = ipfsObj.start();                                                                  //
  // wait for process to start                                                                    //
  if (started) {                                                                                  //
    // test api calls https://www.npmjs.com/package/ipfs-api                                      //
    ipfsObj.api.add(new Buffer('random stuff'), (err, data)=> {                                   //
      console.log('ipfs hash ' + data[0].Hash);                                                   //
    });                                                                                           //
  }                                                                                               //
  };                                                                                              //
   testIpfs(); */                                                                                 //
});                                                                                               // 11
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
