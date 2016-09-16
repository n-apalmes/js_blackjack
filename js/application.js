// A $( document ).ready() block.
$( document ).ready(function() {
  var game = new Game();
  game.deal();
  //game.show();

  $("body").on("click","#hit" , function(){
    game.hit();
  });

  $("body").on("click","#stay" , function(){
    game.stay();
  });

  $("body").on("click","#next" , function(){
    game.next();
  });

  game.compare();
});
