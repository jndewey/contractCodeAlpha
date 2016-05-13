import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import '../imports/api/documents/documents.js';
import '../imports/api/compiler/compiler.js';
import '../imports/api/encryption/encryption.js';
import '../imports/api/wallet/wallet.js';
import '../imports/api/IPFS/ipfs.js';

Meteor.startup(() => {
  process.env.MONGO_URL = 'mongodb://root:xAw5orybyg@olympia.modulusmongo.net:27017/ymEhe9ju?autoReconnect=true&connectTimeoutMS=60000';
  ipfsObj =  IpfsConnector.getInstance(); //singleton
  ipfsObj.setLogLevel('info'); // info is default
  const testIpfs = function () {
  // start ipfs daemon
  let started = ipfsObj.start();
  // wait for process to start
  if (started) {
    // test api calls https://www.npmjs.com/package/ipfs-api
    ipfsObj.api.add(new Buffer('random stuff'), (err, data)=> {
      console.log('ipfs hash ' + data[0].Hash);
    });
  }
};
   testIpfs();

});
