import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../ui/pages/publications.js';
import '../../ui/pages/publications_latam.js';
import '../../ui/pages/ethereum_panel.js';
import '../../ui/pages/output.js';
import '../../ui/pages/sampleNote.js';
import '../../ui/pages/myDocuments.js';
import '../../ui/pages/documents_index.js';
import '../../ui/pages/about.html';
import '../../ui/pages/contact.html';
import '../../ui/pages/CAS_CRE_nonConstruction.js';
import '../../api/wallet/wallet.js';
import '../../api/documents/documents.js';
import '../../ui/layouts/body.js';
import '../../ui/layouts/mainpage.html';

FlowRouter.route('/', {
  name: 'homePage',
  action: function() {
    BlazeLayout.render("layout", {content: "main_page"});
  }
});

FlowRouter.route('/output/:_id', {
  name: 'output',
  action(params) {
  BlazeLayout.render('layout', {content: 'output'});
  }
});


FlowRouter.route('/ethereum_panel', {
    name: 'ethereumPanel',
    action() {
    BlazeLayout.render('layout', {content: 'ethereum'});
  }
});

FlowRouter.route('/myDocuments', {
    name: 'myDocuments',
    action() {
    BlazeLayout.render('layout', {content: 'myDocuments'});
  }
});

FlowRouter.route('/documents_index', {
    name: 'documents_index',
    action() {
    BlazeLayout.render('layout', {content: 'documents_index'});
  }
});

FlowRouter.route('/CAS_CRE_nonConstruction', {
    name: 'CAS_CRE_nonConstruction',
    action() {
    BlazeLayout.render('layout', {content: 'CAS_CRE_nonConstruction'});
  }
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
    BlazeLayout.render('layout', {content: 'about'});
  }
});

FlowRouter.route('/publications', {
    name: 'publications',
    action() {
    BlazeLayout.render('layout', {content: 'publications'});
  }
});

FlowRouter.route('/publications_latam', {
    name: 'publications_latam',
    action() {
    BlazeLayout.render('layout', {content: 'publications_latam'});
  }
});

FlowRouter.route('/contact', {
    name: 'contact',
    action() {
    BlazeLayout.render('layout', {content: 'contact'});
  }
});

FlowRouter.route('/sampleNote', {
    name: 'sampleNote',
    action() {
    BlazeLayout.render('layout', {content: 'sampleNote'});
  }
});