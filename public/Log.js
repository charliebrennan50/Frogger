class Log{

constructor(L, B, W, H, S){
  this.left=L;
  this.bottom=B;
  this.w=W;
  this.h=H;
  this.speed=S*grid/50;
 }

 show(){
  noStroke();
  fill(103,67,22,255);
  rect(this.left+5*factor,this.bottom+5*factor,this.w-10*factor,this.h-10*factor);
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
