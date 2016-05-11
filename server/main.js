import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index.js';
import '../imports/api/documents/documents.js';
import '../imports/api/compiler/compiler.js';

Meteor.startup(() => {
  process.env.MONGO_URL = 'mongodb://root:xAw5orybyg@olympia.modulusmongo.net:27017/ymEhe9ju?autoReconnect=true&connectTimeoutMS=60000';
});
