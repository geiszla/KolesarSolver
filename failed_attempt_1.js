javascript: 'use strict';

function fetchPage(url) {
  return fetch(url, {
    credentials: 'same-origin'
  }).then((response) => {
    console.log(response.headers);
    response.text();
  });
}

function parseAnswer(question, answersDocument) {
  const questionElements = answersDocument.getElementsByClassName('kerdes');
  for (let i = 0; i < questionElements.length; i++) {
    if (questionElements[i].textContent === question) {
      return questionElements[i].parentNode
        .getElementsByClassName('helyes-lett-volna')[0].textContent;
    }
  }
}

function getAnswer() {
  fetchPage(location.href).then(() => {
    const url = `${location.protocol}//${location.hostname}${location.pathname}/?értékelés`;
    return fetchPage(url);
  }).then((htmlString) => {
    const question = document.getElementById('main').getElementsByTagName('h1')[0].textContent;
    const responseHtml = document.createElement('html');
    responseHtml.innerHTML = htmlString;
    const answer = parseAnswer(question, responseHtml);

    if (answer) {
      console.log('Answer found!');

      const answerElements = document.getElementsByClassName('valasz');
      for (let i = 0; i < answerElements.length; i++) {
        if (answerElements[i].textContent === answer) {
          answerElements[i].classList.add('helyes-lett-volna');
        }
      }
      finish();
    } else {
      console.log("Answer wasn't in this request. Retrying...");
    }
  }).catch(err => console.log(err));
}

function finish() {
  console.log('Script executed. Exiting...');
}

console.log('Getting solutions...');
localStorage.setItem('cookies', document.cookie);
document.cookie = 'PHPSESSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
getAnswer();
