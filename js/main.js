'use strict';

{
  let loc;
  let score;
  let miss;
  let startTimer;
  
  let words = [
    'apple',
    'banana',
    'calot',
    'decameron',
    'lemon',
    'pain',
  ];
  let word = words[Math.floor(Math.random() * words.length)];
  let clearTypo = '';
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timer = document.getElementById('timer');

  function setTimer() {
    let elapsedTime = startTimer + 3 * 1000 - Date.now();
    timer.textContent = (elapsedTime / 1000).toFixed(2);

    let timeoutId = setTimeout(setTimer, 10);

    if(elapsedTime < 0) {
      clearTimeout(timeoutId);
      timer.textContent = '0.00';
      target.textContent = 'click to replay';
      setTimeout(() => {
        let accuracy = score + miss === 0 ? 0 :(score / (score + miss)) * 100;
        alert(
          `${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`
        );
      }, 100);
      isPlaying = false;
    }
  }

  function updateTaget() {
    clearTypo += '_';
    target.textContent = clearTypo + word.substring(loc);
    if(loc === word.length){
      loc = 0;
      clearTypo = '';
      word = words[Math.floor(Math.random() * words.length)];
      target.textContent = word;
    } 
  }

  window.addEventListener('keydown', e => {
    if(isPlaying !== true) {
      return;
    }
    if( e.key === word[loc] ){
      loc++;
      score++;
      scoreLabel.textContent = score;
      updateTaget();
      
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });

  window.addEventListener('click', () => {
    if(isPlaying === false){
      isPlaying = true;
    } else {
      return;
    }
    loc = 0;
    score = 0;
    miss = 0;
    clearTypo = '';
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    target.textContent = word;
    startTimer = Date.now();
    setTimer();
  });

}