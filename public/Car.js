class Car {
 
 constructor(L, B, W, H, S){
  this.left=L;
  this.bottom=B;
  this.w=W;
  this.h=H;
  this.speed=S*grid/50;
 }

 show(){
  fill(0,0,255);
  rect(this.left,this.bottom+5*factor,this.w,this.h-10*factor);
  //shape(pinkcar,left,bottom+5);
 }

 move(){
  this.left=this.left+this.speed;
  if (this.speed>0 && this.left > width){
    this.left=-this.w;}
  else if (this.speed<0 && this.left<0-this.w){
    this.left=width;
    }
 }

}
