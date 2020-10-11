class Frog {

  constructor(L, B, W, H) {
    this.left = L;
    this.bottom = B;
    this.w = W;
    this.h = H;
    this.isAttached = false;
    this.attached = null;
    this.onLilyPad = false;
  }

  show() {
    //fill(0, 255, 0);
    //rect(this.left + 5, this.bottom + 5, this.w - 10, this.h - 10);
    image(frogpng, this.left, this.bottom, grid, grid);
  }

  move(xd, yd) {
    this.isAttached = false; //unattach whenever moved
    this.left += xd * grid;
    this.bottom += yd * grid;
    // don't let frog drop below canvas
    if (this.bottom > height - grid) {
      this.bottom = height - grid;
    }
    // If frog at start, don't let it move left or right off canvas
    if (this.bottom == height - grid) {
      if (this.left < 0) {
        this.left = 0;
      }
      if (this.left > width - this.w) {
        this.left = width - this.w;
      }
    }
    //if frog above water level check if in lilypad
    if (this.bottom < height - grid * 12) {
      this.checkLilyPad();
    }
  }

  update() {
    //if (this.attached != null) { // if frog attached to something
    if (this.isAttached) {
      frog.left += this.attached.speed; // set frog speed to attached speed
      if (this.attached.speed > 0 && this.left > width + this.w) { // if frog goes off right side of screen 
        //this.left = -this.w; // re-enter on left side of screen moving in same direction
        this.isAttached = false;
        nLives = nLives - 1;
        plunk.play();
        ResetFrog();
      } else if (this.attached.speed < 0 && this.left < -this.w) { // if frog goes off left side
        //this.left = width + this.w; // re-enter on right
        this.isAttached = false;
        nLives = nLives - 1;
        plunk.play();
        ResetFrog();
      }
    }
  }
  
  attach(log) { // method to attach frog to log
    this.attached = log; // set attached log
    this.isAttached = true; // set attached flag
  }

  checkWet() {
    // check to see if frog is in water
    // if it's in the water area and not attached,
    // it's in the water
    if (this.bottom < height - grid * 7 &&
      this.bottom > height - grid * 13 &&
      !this.isAttached) {
      plunk.play();
      nLives = nLives - 1;
      ResetFrog();
    }
  }

  intersect(car) {
    // if it's anywhere outside the car, it's not in the car
    return !(this.left + this.w <= car.left || this.left >= car.left + car.w ||
      this.bottom >= car.bottom + car.h || this.bottom + this.h <= car.bottom);
  }

  intersect(log) {
    // if it's anywhere outside the log, it's not in the log
    return !(this.left + this.w <= log.left || this.left >= log.left + log.w ||
      this.bottom >= log.bottom + log.h || this.bottom + this.h <= log.bottom);
  }

  checkLilyPad() {
    //determine if frog is on a lilypad and if so which one
    for (let L of lilypads) {
      if (this.left > L.left && this.left + this.w < L.left + L.w) {
        this.onLilyPad = true;
        if (!L.occupied) {
          image(safepng, L.left + 15 * factor, L.bottom + 5 * factor, grid * 0.9, grid * 0.9);
          L.occupied = true;
          nSafe = nSafe + 1;
          //if nSafe=5 don't play safe sound so no overlap with theme song
          if (nSafe < 5) {
            safe.play();
          }
          nScore = nScore + 200;
          //lifeScore = lifeScore + 200;
          ResetFrog();
          //need this because resetting frog changes frog.left for rest of loop
          //and once the frog is on a lilypad, there's no need to check others
          break;
        } else if (L.occupied) {
          this.move(0, 1);
        }
      }
    }
    if (!this.onLilyPad) {
      nLives = nLives - 1;
      plunk.play();
      ResetFrog();
    }
    this.onLilyPad = false;
  }

  // every time frog lands on lilypad, check to see if all lilypads are full
  checkPadsFull() {
    // if all lilypads full, play theme, empty lilypads, adjust score, 
    // increase level
    if (nSafe == 5) {
      theme.play();
      // delay clearing lilypads for seven seconds, until theme done playing
      setTimeout(() => {
        for (let L of lilypads) {
          L.occupied = false;
          L.show();
        }
      }, 7000);
      nSafe = 0;
      nScore = nScore + 500;
      level = level + 1;
    }
  }
}