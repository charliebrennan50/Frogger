let grid = 30;
let factor = grid / 50;
let nScore = 0;
let nSafe = 4;
let level = 1;
let nLives = 5;
let frogpng;
let safepng;
let frog;
let lanes = [];
let lilypads = [];
let safe, hop, squash, plunk, theme;
let started;
//var context = new AudioContext();

// One-liner to resume playback when user interacted with the page.
// document.querySelector('button').addEventListener('click', function() {
//   context.resume().then(() => {
//     console.log('Playback resumed successfully');
//   });
// });

function preload() {
  frogpng = loadImage('data/frogpic3.png');
  safepng = loadImage('data/frogpic2.png');
  safe = loadSound('data/sound-frogger-extra.wav');
  hop = loadSound('data/hop.wav');
  squash = loadSound('data/squash.wav');
  plunk = loadSound('data/sound-frogger-plunk.wav');
  theme = loadSound('data/frogger-theme.wav');
}

function setup() {

  // set width of button div to canvas width to center start button
  document.getElementById("button-div").style.width = grid * 16 + "px";

  theme.play();

  createCanvas(grid * 16, grid * 18);

  frog = new Frog(grid * 7, height - grid, grid, grid);

  // Lane(lane left, lane bottom, item width, type, speed, number, spacing)
  // Lanes 0-4 are cars
  lanes[0] = new Lane(0, height - 2 * grid, grid, 1, 1, 1, 6 * grid);
  lanes[1] = new Lane(0, height - 3 * grid, grid, 1, -1, 1, 5 * grid);
  lanes[2] = new Lane(0, height - 4 * grid, grid, 1, 1, 1, 5 * grid);
  lanes[3] = new Lane(0, height - 5 * grid, grid, 1, -1, 1, 3 * grid);
  lanes[4] = new Lane(0, height - 6 * grid, grid, 1, 1, 1, 3 * grid);

  // Lanes 6-8 are logs
  lanes[6] = new Lane(0, height - 9 * grid, grid * 2, 2, -2, 2, 3 * grid);
  lanes[7] = new Lane(0, height - 10 * grid, grid * 3, 2, 3, 3, 3.5 * grid);
  lanes[8] = new Lane(0, height - 12 * grid, grid * 2, 2, 2, 3, 4 * grid);

  // Lanes 5 and 9 are turtles
  // Need a way to group turtles may have to create method
  lanes[5] = new Lane(0, height - 8 * grid, grid * 1.5, 4, 2, 2, 3, grid);
  lanes[9] = new Lane(0, height - 11 * grid, grid * 1.5, 4, -3, 3, 3.5 * grid);

  // lily pads
  // draw here so that safe image can be displayed later
  // This doesn't have to be updated every frame

  fill(21, 90, 59);
  fill(0, 97, 36);
  fill(0, 100, 0);
  noStroke();
  rect(0, height - grid * 14, width, grid); // line above lilypad area
  rect(0, height - grid * 13, width, grid) //lilypad area
  //create lilypad objects
  for (let i = 0; i < 5; i++) {
    lilypads[i] = new LilyPad(factor * (40 + 160 * i));
  }
  //display lilypads
  for (let L of lilypads) {
    L.show();
  }

}

function draw() {
  //game background
  fill(0);
  rect(0, 0, width, grid * 4);

  //score
  fill(0, 255, 0);
  textSize(grid / 1.75);
  text("Player One", grid, 30 * factor);
  text("Score", grid, 1.5 * grid);
  text(str(nScore), 3 * grid, 1.5 * grid);
  text("Level", grid, 2.5 * grid);
  text(str(level), 3 * grid, 2.5 * grid);
  text("Lives", grid, 3.5 * grid);
  //text(str(nLives), 3 * grid, 3.5 * grid);
  for (let i = 1; i < nLives + 1; i++) {
    image(frogpng, 3 * grid + grid * i, 3 * grid, grid, grid);
  }

  // //safe areas
  fill(0, 100, 0);
  rect(0, height - grid * 7, width, grid); // middle - between road and water
  rect(0, height - grid, width, grid); // start area

  //water
  fill(116, 196, 245);
  rect(0, height - grid * 12, width, grid * 5);

  //road
  fill(0);
  rect(0, height - grid * 6, width, grid * 5);

  for (let i = 0; i < 5; i++) {
    lanes[i].displaycars();
  }

  for (let i = 6; i < 9; i++) {
    lanes[i].displaylogs();
  }

  lanes[5].displayturtles();
  lanes[9].displayturtles();

  frog.update();
  frog.checkWet();
  frog.show();
  frog.checkPadsFull();
}


// function touchStarted() {
//   if (getAudioContext().state !== 'running') {
//     getAudioContext().resume();
//   }
// }

function mousePressed() {
  getAudioContext().resume()
}

// this function responds to the "start" button click on the game page
// the frog can't move and hence the game can't start until the button is pushed
// the audio also won't start until the user interacts with the page
function start() {
  started = true;
  loop();
}