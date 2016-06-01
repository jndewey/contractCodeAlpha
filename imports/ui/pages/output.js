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
  },

  setConnection: function() {
  web3 = new Web3(new Web3.providers.HttpProvider('http://65.34.170.14:8545'));
  console.log(web3);
  },

  balance: function() {
  var coin = '0x5e561e6097210571d7f56913599a31950283d260';
  var balance = web3.eth.getBalance(coin);
  return balance;
  },
  current: function() {
    var str = web3.currentProvider.host;
    return str;
  },
  Web3Version: function() {
    var version = web3.version.api;
    return version;
  }, 
 Web3ClientVersion: function() {
   var version = web3.version.ethereum;
    return version;
  },
  defaultAccount: function() {
   var account = '0x5e561e6097210571d7f56913599a31950283d260';
    return account;
  },
  gasprice: function() {
    var gasPrice = web3.eth.gasPrice;
    var price = gasPrice.toString(10);
    return price;
  }
});

Template.output.events({
'click #uploadCode': function(e) {
    e.preventDefault();
    var mySenderAddress = '0x5e561e6097210571d7f56913599a31950283d260';
    //var mySenderAddress = '088f9a944de3b3cfbce91846e0a59822c9aa3fc9';
    web3 = new Web3(new Web3.providers.HttpProvider('http://65.34.170.14:8545'));
    var peerCount = web3.net.peerCount;
    console.log(peerCount);
    var recipient = '0x61568fAD02928318257020767cfAabC97A6B2C74';
    const instance = Template.instance();
    const documentId = instance.getId();
    var contract = Documents.findOne(documentId);
    var contract_string = JSON.stringify(contract); // converts contractCode object into a JSON string
    var _contractcontent = contract_string; //sets response from contract to the string output of our contractCode object
    // var contractSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract contractCode is mortal { string contractCodeObject; function contractCode(string _contractcontent) public { contractCodeObject = _contractcontent; } function returnContract() constant returns (string) { return contractCodeObject; } }'; // source code ready for compilation
    // var contractCompiled = web3.eth.compile.solidity(contractSource); // produces compiled code
    var code = '606060405260405161032c38038061032c833981016040528080518201919060200150505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b8060016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a057805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518260005055916020019190600101906100b2565b5b5090506100fc91906100de565b808211156100f857600081815060009055506001016100de565b5090565b50505b5061021e8061010e6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806341c0e1b51461004457806383fe30561461005357610042565b005b61005160048050506100ce565b005b6100606004805050610162565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156100c05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561015f57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b602060405190810160405280600081526020015060016000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561020f5780601f106101e45761010080835404028352916020019161020f565b820191906000526020600020905b8154815290600101906020018083116101f257829003601f168201915b5050505050905061021b565b9056'
    var raw_abi = '[{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"returnContract","outputs":[{"name":"","type":"string"}],"type":"function"},{"inputs":[{"name":"_contractcontent","type":"string"}],"type":"constructor"}]'
    var abi = JSON.parse(raw_abi);
    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.new(_contractcontent, {data: code, gas: 2000000, from: mySenderAddress}, function(e, contract){
      if(!e) {

      if(!contract.address) {
        //console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        console.log(e);
        Session.set('contractHash', contract.transactionHash);

      } else {
        //console.log("Contract mined! Address: " + contract.address);
        console.log(e);
        Session.set('contractAddress', contract.address);
      }
    }
  });
    /*web3.eth.sendTransaction({from: mySenderAddress, to: recipient, value: 1000}, function(error, result){
      if(!error) {

      if(!result) {
        console.log("transaction waiting to be mined...");

      } else {
        console.log("Transaction sent " + result);
      }
    }
  }); */
    console.log('done');
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
