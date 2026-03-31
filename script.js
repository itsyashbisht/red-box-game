const queue = [];          // tracks order of red boxes (FIFO)
const redSet = new Set();  // lookup: is this box red?
const MAX_RED = 3;

function getBox(id) {
  return document.querySelector(`[data-id="${id}"]`);
}

function updateCounter() {
  document.getElementById('count').textContent = queue?.length;
}

// Color mutator functions.
function setRed(id) {
  redSet.add(id);
  queue.push(id);
  const box = getBox(id);
  box.classList.remove('blue');
  box.classList.add('red');
  updateCounter();
}

function setBlue(id) {
  redSet.delete(id);
  queue.splice(queue.indexOf(id), 1); // remove from any position
  const box = getBox(id);
  box.classList.remove('red');
  box.classList.add('blue');
  updateCounter();
}


function handleClick(id) {
  if (redSet.has(id)) {
    // Box is already red → toggle it off
    setBlue(id);
    return;
  }

  // Evict oldest red box if at capacity
  if (queue.length === MAX_RED) {
    const oldest = queue[0]; // peek front
    setBlue(oldest);
  }

  // turn red
  setRed(id);
}

function createGrid() {
  const grid = document.getElementById('grid');

  for (let i = 0; i < 25; i++) {
    const box = document.createElement('div');
    box.classList.add('box', 'blue');
    box.dataset.id = i;
    box.addEventListener('click', () => handleClick(i));
    grid.appendChild(box);
  }
}

createGrid();