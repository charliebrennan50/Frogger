class Turtle {

    constructor(L, B, W, H, S) {
        this.left = L;
        this.bottom = B;
        this.w = W;
        this.h = H;
        this.speed = S * grid / 50;
        this.tAlpha = 255;
        this.Timer = int(random(100));
        this.submerged = false;
    }

    show() {
        this.Timer++; // adjust turtle diving and surfacing with timer
        if (this.Timer>660) { 
              this.tAlpha=255;
              this.Timer=int(random(100));
              this.submerged=false;}   //resurfaces
        else if (this.Timer>540){ 
              this.tAlpha=0;
              this.submerged=true;} // completely submerged 
        else if (this.Timer>360){
              this.tAlpha=75;} // goes deeper
        else if (this.Timer>180){
              this.tAlpha=150;} // starts dive
        noStroke();
        fill(5, 35, 120, this.tAlpha);
        ellipseMode(CORNER);
        ellipse(this.left + 5 * factor, this.bottom + 5 * factor, this.w - 10 * factor, this.h - 10 * factor);
    }

    move() {
        this.left = this.left + this.speed;
        if (this.speed > 0 && this.left > width) {
            this.left = -this.w;
        } else if (this.speed < 0 && this.left < 0 - this.w) {
            this.left = width;
        }
    }
}