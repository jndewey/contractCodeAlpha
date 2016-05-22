import openpgp from 'openpgp';

if (Meteor.isServer) {

Meteor.methods({

     'encrypt': function(message, publicKey) {
      var future = new Future();
      var openpgp = require('openpgp');
      openpgp.initWorker({ path:'openpgp.worker.js' });
      openpgp.config.aead_protect = true;
      var options, encrypted;
      var pubkey = publicKey;
      //var privkey = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
      options = {
        data: message,                             // input as String (or Uint8Array) 
        publicKeys: openpgp.key.readArmored(pubkey).keys,  // for encryption 
        //privateKeys: openpgp.key.readArmored(privkey).keys // for signing (optional) 
      };
      openpgp.encrypt(options).then(function(ciphertext) {
      encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----' 
      });
      console.log(ciphertext.data);
      var response = encrypted;
      future.return(response);
      return future.wait();
},
    'createKeys' : function() {
      var future = new Future();
      var openpgp = require('openpgp');
      openpgp.initWorker({ path:'openpgp.worker.js' });
      openpgp.config.aead_protect = true;
      var options = {
        userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
        numBits: 4096,                                            // RSA key size
        passphrase: 'super long and hard to guess secret'         // protects the private key
        };
      openpgp.generateKey(options).then(function(key) {
        var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
        console.log(pubkey);
        var keyPair = [privkey, pubkey];
        var response = keyPair[0];
        future.return(response);
        return future.wait();
        });
    },

     'decrypt': function(message, privateK) {
      var future = new Future();
      var pgpMessage = message;
      pgpMessage = openpgp.message.readArmored(pgpMessage);
      var key = privateK;
      var privateKey = openpgp.key.readArmored(key).keys[0];
      privateKey.decrypt('passphrase');
      openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
        console.log(plaintext);
        var plaintext = plaintext;
        future ["return"] (plaintext)
        });
      return future.wait();
    }

  });
}