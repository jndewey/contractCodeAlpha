import './ethereum_panel.html';

Template.ethereum.helpers({
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

Template.ethereum.events({
  'click .find': function(e) {
    e.preventDefault();
    var address = document.getElementsByName("address")[0].value;
    var abi = Session.get('ABI');
    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.at(address);
    var object = myContractInstance.returnContract();
    var objectParsed = JSON.parse(object);
    var template = objectParsed.document_template;
    Session.set('contractObject', object);
    //Router.go('document2');
  }

});
