import './output.html';

Template.output.onCreated(function() {
  this.getId = () => FlowRouter.getParam('_id');
});

Template.output.helpers({
  deal: function() {
    const instance = Template.instance();
    const documentId = instance.getId();
    var info = Documents.findOne(documentId);
    console.log(info);
    return info;
  }
});

Template.output.events({
'click #uploadCode': function(e) {
    e.preventDefault();
    const instance = Template.instance();
    const documentId = instance.getId();
    var contract = Documents.findOne(documentId);
    var contract_string = JSON.stringify(contract); // converts contractCode object into a JSON string
    var mySenderAddress = '0x5e561e6097210571d7f56913599a31950283d260'; //sets sender address to default account
    var _contractcontent = contract_string; //sets response from contract to the string output of our contractCode object
    var contractSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract contractCode is mortal { string contractCodeObject; function contractCode(string _contractcontent) public { contractCodeObject = _contractcontent; } function returnContract() constant returns (string) { return contractCodeObject; } }'; // source code ready for compilation
    //var contractCompiled = web3.eth.compile.solidity(contractSource); // produces compiled code
    //console.log(contractSource);
    Meteor.call('compile', contractSource, 1, function( error, response ) {
    if ( error ) {
    console.log( error );
    } else {
    //console.log( response );
    for (var contractName in response.contracts) {
    // code and ABI that are needed by web3
    console.log(contractName + ': ' + response.contracts[contractName].bytecode);
    console.log(contractName + '; ' + JSON.parse( response.contracts[contractName].interface));
    var code = response.contracts.contractCode.bytecode;
    console.log(code);
      }
    }
  });
},

'click #createAccount': function(e) {
    e.preventDefault();
    var accounts = new Accounts({minPassphraseLength: 6});
    var accountObject = accounts.new('myPassphrase');
    console.log(accountObject);
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world.');
    doc.save('Test.pdf');
    Meteor.call('ipfsAdd', "Needs to be html", function(err,resp){
    if ( err ) {
    console.log( err );
    } else {
    console.log( resp );
        }
    });
},

'click #encrypt': function(e) {
    e.preventDefault();
    console.log('You made it this far');
    Meteor.call('createKeys', function( error, response ) {
    if ( error ) {
    console.log( error );
    } else {
    console.log( response );
    Session.set('globalPublicKey', response);
        }
    var test = Session.get('globalPublicKey');
    console.log(test);
    });
    /* var message = "This is a contractCode";
    var publicKey = Session.get('globalPublicKey');
    //3console.log(publicKey);
    Meteor.call('encrypt', message, publicKey, function (error, response) {
    if ( error ) {
    console.log( error );
    } else {
    console.log( response );
      }
  }); */
},

'click #get': function(e) {
    e.preventDefault();
    var HtmlDocx = require('html-docx-js');
    var fs = require('fs');
    var inputFile = '~/test.html';
    var outputFile = 'text.docx';
    console.log(Object.getOwnPropertyNames(HtmlDocx));
    fs.readFile(inputFile, 'utf-8', function(err, html) {
    if (err) throw err;

    var docx = HtmlDocx.asBlob(html);
    fs.writeFile(outputFile, docx, function(err) {
    if (err) throw err;
    });
});

    /* var hash = 'QmQ1xrPzKaFharLbkqoFnhrXN1cLpdQj6RstVrVS9zhAEu';
    Meteor.call('ipfsCat', hash, function(err,resp){
    if ( err ) {
    console.log( err );
    } else {
    console.log( resp );
        }
    }); */
}

});
