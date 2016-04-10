import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../ui/pages/ethereum_panel.js';
import '../../ui/pages/documents_index.js';
import '../../ui/pages/CAS_CRE_nonConstruction.js';
import '../../api/wallet/wallet.js';
import '../../ui/layouts/body.js';
import '../../ui/layouts/mainpage.html';

FlowRouter.route('/', {
  name: 'homePage',
  action: function() {
    BlazeLayout.render("layout", {content: "main_page"});
  }
});

FlowRouter.route('/ethereum_panel', {
    name: 'ethereumPanel',
    action() {
    BlazeLayout.render('layout', {content: 'ethereum'});
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