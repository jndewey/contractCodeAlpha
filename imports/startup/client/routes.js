import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../api/HTTP/http.js';
import '../../ui/pages/publications.js';
import '../../ui/pages/marketplace.js';
import '../../ui/pages/ethereum_panel.js';
import '../../ui/pages/output.js';
import '../../ui/pages/edit.js';
import '../../ui/pages/sampleNote.js';
import '../../ui/pages/myDocuments.js';
import '../../ui/pages/documents_index.js';
import '../../ui/pages/about.html';
import '../../ui/pages/contact.html';
import '../../ui/pages/CAS_CRE_nonConstruction.js';
import '../../ui/pages/CAS_CRE_nonConstructionEdit.js';
import '../../api/wallet/wallet.js';
import '../../api/roles/roles.js';
import '../../api/documents/documents.js';
import '../../api/PDF/pdf.js';
import '../../api/DOCX/docx.js';
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

FlowRouter.route('/edit/:_id', {
  name: 'edit',
  action(params) {
  BlazeLayout.render('layout', {content: 'edit', params: params});
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

FlowRouter.route('/CAS_CRE', {
    name: 'CAS_CRE',
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

FlowRouter.route('/marketplace', {
    name: 'marketplace',
    action() {
    BlazeLayout.render('layout', {content: 'marketplace'});
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