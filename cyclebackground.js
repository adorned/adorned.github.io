(function() {
  'strict';
  var imageIds = [ 'firstimage', 'secondimage', 'thirdimage' ];
  var currentIndex = 0;

  setInterval(function() {
    currentIndex;
    document.getElementById(imageIds[currentIndex]).style.opacity = 0;
    currentIndex++;
    if (currentIndex >= imageIds.length) {
      currentIndex = 0;
    }
    document.getElementById(imageIds[currentIndex]).style.opacity = 100;
  }, 5000);
})();
