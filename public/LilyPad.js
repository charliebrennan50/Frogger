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

    //
    //   void resetpads(){
    //     //nSafe=0;
    //     nScore=nScore+500;
    //     level++;
    //     lifeScore=lifeScore+500;
    //     println(theme.isPlaying());
    //       nSafe=0; //<>//
    //       for (int i=0; i<num; i++){
    //         lilypads[i].occupied=false;
    //         lilypads[i].show();
    //       }
    //   }
    //
}