//import compile from './node_modules/solc/bin/soljson-latest.js';
//import solc from './bin/soljson-latest.js';
//import solc from 'solc';
import { solc } from 'meteor/silentcicero:solc-compiler';
import async from 'async';

if (Meteor.isServer) {
	 Meteor.methods({
    'compile': function(input, options) {
      var future = new Future();
      var codeInput = input;
      var response = solc.compile(codeInput, options);
      future.return(response);
      return future.wait();
    }

  });
}



