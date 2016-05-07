import './sampleNote.html';

Template.sampleNote.events({

  'click .doc': function(e) {
    e.preventDefault();
    var documents = {
      document_template: "sampleNote",
      note_date: document.getElementsByName("note_date")[0].value,
      maker_name: document.getElementsByName("maker_name")[0].value,
      loan_amount_written: document.getElementsByName("loan_amount_written")[0].value,
      loan_amount: document.getElementsByName("loan_amount")[0].value,
      lender: document.getElementsByName("lender")[0].value,
      maturity_date: document.getElementsByName("maturity_date")[0].value,
  };
    documents._id = Documents.insert(documents);
    alert("Document Saved");
    FlowRouter.go('ethereumPanel');
  }
});