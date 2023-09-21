let intervalId;
let attempt = 1;
let delayedTime
let currentTime
let startTime;
let targetClicked = false;


function startGame() {
  const delay = parseFloat(document.getElementById('delay-input').value);
  if (!isNaN(delay) && delay >= 0) {
      resetGame();
      target.style.display = "block"
        startTime = Date.now()
        targetClicked = true;
        document.getElementById('pause-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        const delayTimer = delay * 1000;
        delayedTime  = delayTimer
        intervalId = setInterval(moveTarget, delayTimer);
        console.log(intervalId)
        // Move target immediately upon start
        moveTarget();
    } else {
        resetGame()
        targetClicked = true
        startTime = Date.now()
        document.getElementById('pause-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        const target = document.getElementById('target')
        target.style.display = "block"
  }
}

document.getElementById('target').addEventListener('click', () => {
    if (delayedTime > 0) {
        // startTime = Date.now()
        moveTarget();
        targetClicked = true
        recordReactionTime()
    } else {
        moveTarget();
        targetClicked = true;
        // startTime = Date.now()
        recordReactionTime()
    }
    
    
});

function moveTarget() {
  if (targetClicked) {
    const playArea = document.getElementById('play-area');
    const target = document.getElementById('target');
    const playAreaRect = playArea.getBoundingClientRect();

    const maxX = playAreaRect.width - target.offsetWidth;
    const maxY = playAreaRect.height - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
  }
}

function recordReactionTime() {
  if (targetClicked) {
    currentTime = Date.now();
    const reactionTime = currentTime - startTime;
    displayReactionTime(reactionTime);
      attempt++;
      startTime = Date.now()
    }
}

function displayReactionTime(reactionTime) {
  const resultsTable = document.getElementById('results').getElementsByTagName('tbody')[0];
  const newRow = resultsTable.insertRow(-1);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  cell1.innerHTML = attempt;
  cell2.innerHTML = (reactionTime / 1000).toFixed(3) + 's';
}

function resetTarget() {
  const target = document.getElementById('target');
  target.style.left = '0px';
  target.style.top = '0px';
}

function resetGame() {
  clearResults();
  resetTarget();
  clearInterval(intervalId);
  attempt = 1;
}

function pauseGame() {
  clearInterval(intervalId);
  document.getElementById('target').disabled = true;
}

function clearResults() {
  document.getElementById('results').getElementsByTagName('tbody')[0].innerHTML = '';
}
