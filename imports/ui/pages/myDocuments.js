import './myDocuments.html';

Template.myDocuments.helpers({
 list: function() {
    var owner = Meteor.userId();
    var documents = Documents.find({'owner': owner});
    return documents;
  },
  pathForDocument: function() {
    var documentEdit = this;
    var params = {
        _id: documentEdit._id
    };
    var routeName = "edit";
    var path = FlowRouter.path(routeName, params);
    return path;
  }
});

Template.myDocuments.events({
  'click .delete_document': function(e) {
    e.preventDefault();
    if (confirm("Delete this document?")) {
      var currentDocId = this._id;
      Documents.remove(currentDocId);
      FlowRouter.go('myDocuments');
    }
  }
});


