const fs = require('fs');

if (Meteor.isServer) {

Meteor.methods({

'readFile': function(inputFile) {
 fs.readFile(inputFile, 'utf-8', function(err, html) {
 if (err) return err;
 console.log(html);
 return html;
  });
},

'writeFile' : function(outputFile, docx) {
fs.writeFile(outputFile, docx, function(err) {
    if (err) return err;
  });
 }

});

}




/*

var HtmlDocx = require('html-docx-js');
    var inputFile = '~/test.html';
    var outputFile = 'text.docx';
    Meteor.call('readFile', inputFile, function(err, html) {
    if (err) console.log(err);
    var docx = HtmlDocx.asBlob(html);
    Meteor.call('writeFile', outputFile, docx, function(err) {
    if (err) console.log(err);
    });


 */