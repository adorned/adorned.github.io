
(function() {
  'use strict';
  let generator = require('firebase-token-generator');
  let firebase = require('firebase');
  let flags = require('flags');

  const URL_PREFIX = 'https://adornedbynomad.firebaseio.com';

  flags.defineString('secret', '', 'the firebase secret');

  let generateToken = function() {
    if (!flags.FLAGS.secret.isSet) {
      console.log('\'--secret\' is undefined');
      throw new Error('Undefined secret flag.');
    }
    return new generator(flags.FLAGS.secret.currentValue)
            .createToken({ uid: 'root', isRoot: true });
  };

  let listUsers = function() {
    let ref = new Firebase(URL_PREFIX);
    let token = generateToken();
    return new Promise(function(resolve, reject) {
      ref.authWithCustomToken(token, function(error, result) {
        if (error) {
          console.log('authentication failed: %s', error);
          reject(Error('unable to authenticate'));
        }

        let users = ref.child('users');
        users.once('value', function(snapshot) {
          let emails = [];
          snapshot.forEach(function(child) {
            emails.push(child.child('email').val());
          });
          console.log(emails.join(', '));
          resolve();
        }, function(error) {
          console.log('error: %s', error);
          reject('error accessing users');
        });
      });
    });
  };

  module.exports = {
    listUsers: listUsers
  };
})();
