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

'click #createPDF': function(e) {
    e.preventDefault();
    var doc = new jsPDF();
    var raw = document.getElementById("doc_body");
    body = raw.textContent;
    doc.text(20, 20, body);
    doc.save('Test.pdf');
}

});
