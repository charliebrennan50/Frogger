//monitors arrow key presses to move frog

function keyPressed() {
      
      //if resetting after frog safe on lilypad, pause until song stops 
      if (!safe.isPlaying() && !plunk.isPlaying() && !theme.isPlaying() && started) {
            hop.play();
            if (keyCode == UP_ARROW) {
                  frog.move(0, -1);
                  nScore = nScore +10;
            } else if (keyCode == DOWN_ARROW) {
                  frog.move(0, 1);
                  nScore = nScore - 10;
            } else if (keyCode == LEFT_ARROW) {
                  frog.move(-1, 0);
            } else if (keyCode == RIGHT_ARROW) {
                  frog.move(1, 0);
            }
      }
}