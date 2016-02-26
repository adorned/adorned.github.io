

(function() {
  'use strict';
  let firebaseUtils = require("./firebase-utils");
  let flags = require('flags');

  flags.defineBoolean('list', 'false', 'list user emails');
  
  flags.parse();

  if (flags.get('list')) {
    firebaseUtils.listUsers().then(function() {
      process.exit(0);
    }).catch(function(error) {
      console.log('ERROR: %s', error);
      process.exit(1);
    });
  }
})();


