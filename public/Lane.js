class Lane {

  //Lane(lane left, lane bottom, item width, type, speed, number, spacing)
  constructor(LL, LB, IW, T, S, N, SP) {
    this.laneLeft = LL;
    this.laneBottom = LB;
    this.itemWidth = IW;
    this.type = T;
    this.speed = S;
    this.num = N;
    this.space = SP;
    this.cars = [];
    this.logs = [];
    this.lilypads = [];
    this.turtles = [];
    this.onLilyPad = false;
    this.turtleAlpha = 255;
    this.turtleTimer = int(random(100));
    this.submerged = false;
    if (this.type == 1) {
      //cars
      for (let i = 0; i < this.num; i++) {
        this.cars[i] = new Car(this.laneLeft + i * (this.itemWidth + this.space), this.laneBottom, this.itemWidth, grid, this.speed);
      }
    } else if (this.type == 2) {
      //logs
      for (let i = 0; i < this.num; i++) {
        this.logs[i] = new Log(this.laneLeft + i * (this.itemWidth + this.space), this.laneBottom, this.itemWidth, grid, this.speed);
      }
    } else if (this.type == 4) {
      //turtles
      for (let i = 0; i < this.num; i++) {
        this.turtles[i] = new Turtle(this.laneLeft + i * (this.itemWidth + this.space), this.laneBottom, this.itemWidth, grid, this.speed);
      }
    }
  }

  displaycars() {
    for (let car of this.cars) {
      car.show();
      car.move();
      if (frog.intersect(car)) {
        squash.play();
        nLives = nLives - 1;
        ResetFrog();
      }
    }
  }

  displaylogs() {
    for (let log of this.logs) {
      log.move();
      log.show();
      if (frog.intersect(log)) {
        frog.attach(log);
      }
    }
  }

  displayturtles() {
    for (let t of this.turtles) {
      t.move();
      t.show();
      if (frog.intersect(t)) {
        frog.attach(t);
      }
    }
  }
}