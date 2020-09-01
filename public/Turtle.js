class Turtle {

    constructor(L, B, W, H, S) {
        this.left = L;
        this.bottom = B;
        this.w = W;
        this.h = H;
        this.speed = S * grid / 50;
    }

    show() {
        noStroke();
        fill(5, 35, 120, 255);
        // rect(this.left + 5 * factor, this.bottom + 5 * factor, this.w - 10 * factor, this.h - 10 * factor);
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

    //need to add an internal loop here to
    //control individual turtles so they
    //submerge individually
    //   void displayturtles(){
    //     turtleTimer++;
    //     if (turtleTimer>660) {
    //           turtleAlpha=255;
    //           turtleTimer=int(random(100));
    //           submerged=false;}
    //     else if (turtleTimer>540){
    //           turtleAlpha=0;
    //           submerged=true;}
    //     else if (turtleTimer>360){
    //           turtleAlpha=75;}
    //     else if (turtleTimer>180){
    //           turtleAlpha=150;}
    //     //maybe just move the turtleTimer routine in here
    //     //to control individual turtles
    //     for (Turtle t: turtles){
    //          t.move();
    //          t.show(turtleAlpha);
    //          if (frog.intersect(t) && !submerged){
    //            frog.attach(t);}
    //     }
    //   }
    //
}