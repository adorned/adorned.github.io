function recordEmail() {
  var ref = new Firebase('https://adornedbynomad.firebaseio.com');
  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log('error logging in');
      return;
    } 

    var email = 'foo@bar.com';
    var users = ref.child('users');
    users.child(authData.uid).set({
      email: email
    });
  }, { remember: 'none' });
}

