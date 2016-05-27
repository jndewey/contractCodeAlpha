import { core } from 'meteor/jspdf:core';

if (Meteor.isServer) {
	 Meteor.methods({
    'createPDF': function() {
 		var doc = new jsPDF();
		doc.text(20, 20, 'Hello world.');
		doc.save('Test.pdf');
    }
  });
}

/*

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

    */