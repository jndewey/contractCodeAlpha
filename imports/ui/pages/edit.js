import './edit.html';

Template.edit.onCreated(function() {
  this.getId = () => FlowRouter.getParam('_id');
}); 

Template.edit.helpers({
  deal: function() {
    var instance = Template.instance();
    var documentId = instance.getId();
    var info = Documents.findOne(documentId);
    return info;
  }
 });


Template.edit.events({
  'click .doc': function(e) {
    e.preventDefault();
	var instance = Template.instance();
    var documentId = instance.getId();

    var documents = {
      document_template: "sampleNote",
      note_date: document.getElementsByName("note_date")[0].value,
      project_name: document.getElementsByName("project_name")[0].value,
      nature: document.getElementsByName("nature")[0].value,
      maker_name: document.getElementsByName("maker_name")[0].value,
      loan_amount_written: document.getElementsByName("loan_amount_written")[0].value,
      loan_amount: document.getElementsByName("loan_amount")[0].value,
      lender: document.getElementsByName("lender")[0].value,
      maturity_date: document.getElementsByName("maturity_date")[0].value,
      owner: Meteor.userId()
  };

   Documents.update(documentId, {$set: documents}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
      	console.log(documentId);
        FlowRouter.go('output', {_id: documentId});
      }
     });
	}
});

