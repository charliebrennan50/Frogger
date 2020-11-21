class LilyPad {

    constructor(L) {
        this.left = L;
        this.bottom = height - grid * 13;
        this.w = 80 * factor;
        this.h = 80 * factor;
        this.occupied = false;
    }

    show() {
        noStroke();
        fill(116, 196, 245);
        rect(this.left, this.bottom, this.w, this.h);
    }
}