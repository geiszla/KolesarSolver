javascript: 'use strict';

function getAnswer() {
  fetch(`${location.href}&v=`).then(response => response.text()).then((htmlString) => {
    const responseHtml = document.createElement('html');
    responseHtml.innerHTML = htmlString;

    console.log(responseHtml);
    const currQuestion = responseHtml.getElementById('main')
      .getElementsByTagName('h1')[0].textContent;

    if (question === currQuestion) {
      console.log('Answer found!');
      const answer = responseHtml.getElementsByClassName('helyes-lett-volna')[0].textContent;
      console.log(answer);
    } else {
      console.log('This wasn\'t the right question. Retrying...');
      getAnswer();
    }
  }).catch(err => console.log(err));
}

console.log('Getting solutions...');
var question = document.getElementById('main').getElementsByTagName('h1')[0].textContent;
getAnswer();

// failed: couldn't get answers with one request
// (needed 1 request for quiz generation and 1 for showing answers)
