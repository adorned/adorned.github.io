function recordEmail(email) {
  var ref = new Firebase('https://adornedbynomad.firebaseio.com');
  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log('error logging in');
      return;
    } 

    var users = ref.child('users');
    users.child(authData.uid).set({
      email: email,
      loc: location.hostname
    });
  }, { remember: 'none' });
}

