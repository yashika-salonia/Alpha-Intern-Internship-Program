const buttons = document.querySelectorAll('.btn-add-bag');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const countElement = document.querySelector('.bag-item-count');

    let currentCount = parseInt(countElement.innerText, 10);

    if (isNaN(currentCount)) {
      currentCount = 0;
    }
    currentCount++;

    countElement.innerText = currentCount;
  });
});