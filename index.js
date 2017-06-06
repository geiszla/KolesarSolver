const DOMParser = require('xmldom').DOMParser;
const fs = require('fs');
const request = require('request');

const baseUrl = 'http://kolesar.turistautak.hu/szmg/tortenelem/';
function createOptions(page) {
  // Create options for request with encoded URI and a cookie jar
  return {
    url: encodeURI(`${baseUrl}?${page}`),
    jar: true
  };
}

// Request a quiz with all questions
request(createOptions('mind'), (questionsError) => {
  if (questionsError) return console.error(questionsError);

  // Request the answers of the quiz (with the same session cookie)
  request(createOptions('értékelés'), (resultsError, _, body) => {
    if (resultsError) return console.error(resultsError);

    // Get question html elements
    const doc = (new DOMParser()).parseFromString(body, 'text/html');
    const questionElements = Array.prototype.filter.call(
      Object.values(doc.getElementsByTagName('td')),
      elem => elem.nodeType === 1 && elem.getAttribute('class') === 'kerdes'
    );

    // Get the question and the answer for each question element 
    const answers = Array.prototype.map.call(questionElements, (question) => {
      const questionString = question.textContent;
      const answerString = Array.prototype.filter.call(
        question.parentNode.getElementsByTagName('li'),
        elem => elem.getAttribute('class') === 'helyes-lett-volna'
      )[0].textContent;

      return [questionString, answerString];
    });

    // Write question-answer pairs to file (answers.json)
    fs.writeFile('./extension/answers.json', JSON.stringify(answers, null, 2), (wireFileErr) => {
      if (wireFileErr) return console.error(wireFileErr);

      console.log('Parsing succesfully finished.');
    });
  });
});
