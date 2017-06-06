'use strict';

function getAnswer() {
  // Fetch answers from answers.json provided with the extension
  const answersUrl = chrome.extension.getURL('answers.json');
  fetch(answersUrl).then(data => data.text()).then((answersString) => {
    // Parse answers
    const answers = JSON.parse(answersString);
    const question = document.getElementById('main').getElementsByTagName('h1')[0].textContent;

    // Get possible answer choices for the question
    const answerElements = document.getElementsByClassName('valasz');
    const currAnswers = Array.prototype.map.call(answerElements, elem => elem.textContent);

    // Get the answer, that corresponds to the current question
    // and possible answer choices, from the answers array (from answers.json)
    // (question and the answer can be switched)
    let answer = answers.filter(currAnswer =>
      currAnswer[0] === question && currAnswers.includes(currAnswer[1])
      || currAnswer[1] === question && currAnswers.includes(currAnswer[0])
    )[0];
    answer = currAnswers.includes(answer[1]) ? answer[1] : answer[0];

    // Set class of the html element of the correct answer
    for (let i = 0; i < answerElements.length; i++) {
      if (answerElements[i].textContent === answer) {
        answerElements[i].classList.add('helyes-lett-volna');
      }
    }
  }).catch(err => console.log(err));
}

// Start script
if (location.search !== '?') {
  getAnswer();

  // Set observer to get answer on main element change
  // (due to question being updated using ajax request, not new page load)
  const main = document.getElementById('main');
  const observer = new MutationObserver(() => {
    getAnswer();
  });
  observer.observe(main, { childList: true });
}
