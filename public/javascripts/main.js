(function() {
  function updateStats() {
    var oldTotal = parseInt(localStorage.getItem('statsTotal') || 0, 10);
    var oldCorrect = parseInt(localStorage.getItem('statsCorrect') || 0, 10);

    localStorage.setItem('statsTotal', oldTotal + 1);
    if (window.isCorrect) {
      localStorage.setItem('statsCorrect', oldCorrect + 1);
    }
  }

  function showStats() {
    var correct = parseInt(localStorage.getItem('statsCorrect') || 0, 10);
    var total = parseInt(localStorage.getItem('statsTotal') || 0, 10);

    document.querySelector('.stats-correct').innerHTML = correct;
    document.querySelector('.stats-total').innerHTML = total;
  }

  if (window.isCorrect != null && window.localStorage) {
    updateStats();
  }

  document.addEventListener('DOMContentLoaded', function() {
    var hasStats = document.querySelector('.stats-total');

    if (window.localStorage) {
      document.querySelector('html').className += ' localstorage';
      showStats();
    }
  });
})();
