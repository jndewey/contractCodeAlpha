import './myDocuments.html';

Template.myDocuments.helpers({
 list: function() {
    var owner = Meteor.userId();
    var documents = Documents.find({'owner': owner});
    console.log(owner);
    return documents;
  }
});
