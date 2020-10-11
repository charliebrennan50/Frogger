let grid = 50;
let factor = grid / 50;
let nScore = 0;
let nSafe = 0;
let level = 1;
let nLives = 5;
let frogpng;
let safepng;
let frog;
let lanes = [];
let lilypads = [];
let safe, hop, squash, plunk, theme;
let started;

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

  //createCanvas(grid * 16, grid * 18);
  let renderer = createCanvas(grid * 16, grid * 14);
  renderer.parent("game-canvas");

  frog = new Frog(grid * 7, height - grid, grid, grid);

  // Lane(lane left, lane bottom, item width, type, speed, number, spacing)
  // Lanes 0-4 are cars
  lanes[0] = new Lane(0, height - 2 * grid, grid, 1, 2, 2, 2 * grid);
  lanes[1] = new Lane(0, height - 3 * grid, grid, 1, -1.2, 2, 5 * grid);
  lanes[2] = new Lane(0, height - 4 * grid, grid, 1, 1.4, 2, 2 * grid);
  lanes[3] = new Lane(0, height - 5 * grid, grid, 1, -1, 2, 1 * grid);
  lanes[4] = new Lane(0, height - 6 * grid, grid, 1, 3, 2, 3 * grid);

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
  
  //create lilypad objects and display them
  for (let i = 0; i < 5; i++) {
    lilypads[i] = new LilyPad(factor * (40 + 160 * i));
    lilypads[i].show();
  }
}

function draw() {

  //display score and lives

  document.getElementById("score").textContent = `Score: ${nScore} Level: ${level}`;

  let frogImageString = '<img class = "live-image" src="/data/frogpic3.png"/>';
  let livesDisplayString = nLives>0 ? frogImageString.repeat(nLives) : "Game Over!";
  document.getElementById("lives").innerHTML = livesDisplayString;

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

  for (let lane of lanes) {
    lane.displaycars();
    lane.displaylogs();
    lane.displayturtles();
  }

  frog.update(); // move frog if attached to something
  frog.checkWet(); // check to see if in water
  frog.show(); // display the frog
  frog.checkPadsFull(); // check to see if lilypads are full
}

// The code below is needed to initiate the audio and start the game

function mousePressed() {
  getAudioContext().resume()
}

// this function responds to the "start" button click on the game page
// the frog can't move and hence the game can't start until the button is pushed
// the audio also won't start until the user interacts with the page

function start() {
  //if not started, start, else restart
  started = true;
  loop();
}