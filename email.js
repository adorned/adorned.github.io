(function() {

  var  recordEmail = function() {
    var txtInput = document.getElementById('email');

    var email = txtInput.value;
    if (email.length <= 5) {
      return;
    }

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
      setTimeout(function() { 
        document.getElementById('email').parentElement.classList.remove('saved');
      }, 5000);

    }, { remember: 'none' });
  };

  var handleKey = function (e) {
    e.which = e.which || e.keyCode;
    if ( e.which == 13 ) {
    var email = document.getElementById('email').value;
      if (email.length > 5) {
        recordEmail();
      }
    }
  };

  document.getElementById('saveemail').onclick = recordEmail;
  document.getElementById('email').onkeyup = handleKey;

  document.getElementById('email').focus();
})();

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

