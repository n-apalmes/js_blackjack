var Hand = function(){
  this.cards_held = [];
  this.score = 0;
};

Hand.prototype.hit = function(card){
  //console.log(card);
  if (this.score+card.evaluate() > 21 && card.value === "A" )
  {
    this.score++;
  }
  else{
    this.cards_held.push(card);
    this.score += card.evaluate();
  }
};

Hand.prototype.blackjack = function(card){
  return (this.score === 21 && this.cards_held.length === 2)
};

Hand.prototype.bust = function(){
  return (this.score > 21)
};
