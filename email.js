function recordEmail() {

  var txtInput = document.getElementById('email');
  var btn = document.getElementById('saveemail');
  txtInput.disabled = true;
  btn.disabled = true;

  var ref = new Firebase('https://adornedbynomad.firebaseio.com');
  ref.authAnonymously(function(error, authData) {
    if (error) {
      txtInput.disabled = false;
      button.disabled = false;
      return;
    } 

    var email = txtInput.value;

    var users = ref.child('users');
    users.child(authData.uid).set({
      email: email
    });
    txtInput.parentElement.classList.add('saved');

  }, { remember: 'none' });
}

function handleKey(e) {
  e.which = e.which || e.keyCode;
  if ( e.which == 13 ) {
  var email = document.getElementById('email').value;
    if (email.length > 0) {
      recordEmail();
    }
  }
}

document.getElementById('email').focus();
