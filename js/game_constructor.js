var STAY = "Advice: Stay";
var HIT = "Advice: Hit"
var DOUBLE = "Advice: Double Down"
var SPLIT = "Advice: Split"

var Game = function() {
  this.game_deck = new Deck(master_deck);
  this.player_stay = false;
  this.player_1 = new Hand();
  this.dealer = new Dealer();
  this.advice = "DEFAULT";
};

Game.prototype.deal = function(){
  //console.log(DA);
  //console.log("move registered?")
  // this.player_1.hit(HA);
  // this.player_1.hit(CA);
  // console.log(this.player_1.cards_held[0].image)
  // console.log(this.player_1.cards_held[1].image)

  this.dealer.dealer_hand.hit(this.game_deck.draw());
  this.player_1.hit(this.game_deck.draw());
  this.dealer.dealer_hand.hit(this.game_deck.draw());
  this.player_1.hit(this.game_deck.draw());

  console.log(this.player_1.cards_held[0].image)
  console.log(this.player_1.cards_held[1].image)
  this.show();
  this.blackjack();
}

Game.prototype.show = function(){
  that = this;
  $("#dealer_data").append("<img src='images/"+this.dealer.dealer_hand.cards_held[0].image+"'' width='100'>");
  // $("#dealer_cell").append("<img src='images/"+this.dealer.dealer_hand.cards_held[1].image+"'' width='100'>");

  $("#player_data").append("<img src='images/"+this.player_1.cards_held[0].image+"'' width='100'>");

  $("#player_data").append("<img src='images/"+this.player_1.cards_held[1].image+"'' width='100'>");

  $("#player_score").text("Player score: "+this.player_1.score)
  //console.log("Dealer score: "+this.dealer.dealer_hand.score)
  $("#dealer_score").text("Dealer score: "+this.dealer.dealer_hand.score)
  this.get_advice();
}

Game.prototype.hit = function(){
  if (this.player_stay == true)
  {
    alert("invalid move, player has already decided to stay")
    return
  }

  this.player_1.hit(this.game_deck.draw());
  this.get_advice();

 $("#player_data").append("<img src='images/"+this.player_1.cards_held[this.player_1.cards_held.length-1].image+"'' width='100'>");

  // console.log(this.player_1.cards_held[this.player_1.cards_held.length-1].value)
  $("#player_score").text("The player score: "+this.player_1.score)
  if(this.player_1.bust()){
    alert("You lose via bust")
    // console.log("You lose via bust")
    this.reset();
  }
}

Game.prototype.next = function(){
  console.log(this.dealer.stay())

  if(this.dealer.stay() == false){
    this.dealer.dealer_hand.hit(this.game_deck.draw())
    $("#dealer_score").text("Dealer score: "+this.dealer.dealer_hand.score)
    $("#dealer_data").append("<img src='images/"+this.dealer.dealer_hand.cards_held[this.dealer.dealer_hand.cards_held.length-1].image+"'' width='100'>");
    if (this.dealer.dealer_hand.bust()){
      // console.log("You win, the dealer busted")
      alert("You win, the dealer busted")
      this.reset();
    }
  }
  else{
    this.compare();
  }
}

Game.prototype.stay = function(){
  if (this.player_stay == true){
    alert("Please click 'next'");
    return
  }

  console.log("player stays");
  this.player_stay = true;
  $(".next").show();
    // $("#dealer_data").append("<img src='images/"+this.player_1.cards_held[1].image+"'' width='100'>");
  $("#dealer_data").append("<img src='images/"+this.dealer.dealer_hand.cards_held[1].image+"'' width='100'>");
}

Game.prototype.compare = function(){
  if(this.player_stay == true){
    console.log("COMPARE CALLED")
    if (this.dealer.dealer_hand.score === this.player_1.score){
      // console.log("Tie game");
      alert("Tie game");
    }
    else if(this.dealer.dealer_hand.bust() == false && this.dealer.dealer_hand.score > this.player_1.score){
      // console.log("You lose, the dealer outscored you");
      alert("You lose, the dealer outscored you")
    }
    else if(this.player_1.score > this.dealer.dealer_hand.score && this.player_1.bust() == false){
      // console.log("You win, you outscored the dealer")
      alert("You win, you outscored the dealer")
    }
    this.reset();
  }
}

Game.prototype.reset = function(){
  console.log("RESET CALLED")
  this.game_deck = new Deck(master_deck);
  this.player_stay = false;
  this.player_1 = new Hand();
  this.dealer = new Dealer();
  $("#player_data").html("");
  $("#dealer_data").html("");
  $(".next").hide();
  //$("#dealer_score").hide();
  this.deal();
  //this.show();
}

Game.prototype.blackjack = function(){
  if(this.player_1.blackjack() && !this.dealer.dealer_hand.blackjack()){
    //console.log("player wins! via Blackjack");
    alert("player wins! via Blackjack");
    this.reset();
  }else if(!this.player_1.blackjack() && this.dealer.dealer_hand.blackjack()){
    //console.log("dealer wins! via Blackjack");
    alert("dealer wins! via Blackjack");
    this.reset();
  }else if(this.player_1.blackjack() && this.dealer.dealer_hand.blackjack()){
    console.log("Tie via Blackjack");
    this.reset();
  }
}

Game.prototype.get_advice = function(){
  dealer_face_up = this.dealer.dealer_hand.cards_held[0].evaluate();
  initial_hand_values = [this.player_1.cards_held[0].value, this.player_1.cards_held[1].value];
  //console.log(initial_hand_values);
  //console.log(this.player_1.score);
  //if
  if( this.player_1.cards_held.length == 2 & (initial_hand_values.includes("A") || initial_hand_values.includes("8")) && initial_hand_values[0] === initial_hand_values[1] ){
    this.advice = SPLIT;
    console.log("1")
  }
  else if(this.player_1.cards_held.length == 2 &&  (initial_hand_values.includes("10") || initial_hand_values.includes("J") || initial_hand_values.includes("Q") || initial_hand_values.includes("K") ) && initial_hand_values[0] == initial_hand_values[1] ){
    this.advice = STAY;
    console.log("2")
  }
  else if(this.player_1.cards_held.length == 2 && (initial_hand_values.includes("9") && initial_hand_values[0] == initial_hand_values[1]) && (dealer_face_up == 7 || dealer_face_up == 10 || dealer_face_up == 11) ){
    this.advice = STAY
    console.log("3")
  }
  else if(this.player_1.cards_held.length == 2 && (initial_hand_values.includes("9") && initial_hand_values[0] === initial_hand_values[1]) && !(dealer_face_up == 7 || dealer_face_up == 10 || dealer_face_up == 11) ){
    this.advice == SPLIT
    console.log("4")
  }
  else if(this.player_1.cards_held.length == 2 &&  (initial_hand_values.includes("7") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up > 7 ){
    this.advice = HIT
    console.log("5")
  }
  else if(this.player_1.cards_held.length == 2 &&  (initial_hand_values.includes("7") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up <= 7 ){
    this.advice = SPLIT
    console.log("6")
  }
  else if(this.player_1.cards_held.length == 2 &&  (initial_hand_values.includes("6") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up > 6 ){
    this.advice = HIT
    console.log("7")
  }
  else if(this.player_1.cards_held.length == 2 &&  (initial_hand_values.includes("6") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up <= 6 ){
    this.advice = SPLIT
    console.log("8")
  }
  else if( this.player_1.cards_held.length == 2 && (initial_hand_values.includes("5") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up > 9 ){
    this.advice = HIT
    console.log("9")
  }
  else if(this.player_1.cards_held.length == 2 && (initial_hand_values.includes("4") && initial_hand_values[0] === initial_hand_values[1]) && (dealer_face_up == 5 || dealer_face_up == 6)){
    this.advice = SPLIT
    console.log("10")
  }
  else if(this.player_1.cards_held.length == 2 && (initial_hand_values.includes("4") && initial_hand_values[0] === initial_hand_values[1]) && !(dealer_face_up == 5 || dealer_face_up == 6) ){
    this.advice = HIT
    console.log("11")
  }
  else if( this.player_1.cards_held.length == 2 &&(initial_hand_values.includes("3") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up > 7 ){
    this.advice = HIT
    console.log("12")
  }
  else if( this.player_1.cards_held.length == 2 &&(initial_hand_values.includes("3") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up <= 7 ){
    this.advice = SPLIT
    console.log("13")
  }
  else if( this.player_1.cards_held.length == 2 && (initial_hand_values.includes("2") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up > 7 ){
    this.advice = HIT
    console.log("14")
  }
  else if( this.player_1.cards_held.length == 2 &&(initial_hand_values.includes("2") && initial_hand_values[0] === initial_hand_values[1]) && dealer_face_up <= 7 ){
    this.advice = SPLIT
    console.log("15")
  }
  //REVISIT THIS LINE!!!!
  else if( initial_hand_values.includes("A","8") || initial_hand_values.includes("A","9") || initial_hand_values.includes("A","10") ){
    this.advice = STAY;
    console.log("16")
  }
  else if( initial_hand_values.includes("A","7") && (dealer_face_up == 2 || dealer_face_up == 7 || dealer_face_up == 8) ){
    this.advice = STAY;
    console.log("17")
  }
  else if( initial_hand_values.includes("A","7") && dealer_face_up > 2&& dealer_face_up < 7){
    this.advice = DOUBLE;
    console.log("18")
  }
  else if( initial_hand_values.includes("A","7") && dealer_face_up > 8){
    this.advice = HIT;
    console.log("19")
  }
  else if( initial_hand_values.includes("A","6") && (dealer_face_up == 2 || dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("20")
  }
  else if( initial_hand_values.includes("A","6") && !(dealer_face_up == 2 || dealer_face_up > 6) ){
    this.advice = DOUBLE;
    console.log("21")
  }
  else if( initial_hand_values.includes("A","5") && (dealer_face_up < 4 || dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("22")
  }
  else if( initial_hand_values.includes("A","5") && !(dealer_face_up < 4 || dealer_face_up > 6) ){
    this.advice = DOUBLE;
    console.log("23")
  }
  else if( initial_hand_values.includes("A","4") && (dealer_face_up < 4 || dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("24")
  }
  else if( initial_hand_values.includes("A","4") && !(dealer_face_up < 4 || dealer_face_up > 6) ){
    this.advice = DOUBLE;
    console.log("25")
  }
  else if( initial_hand_values.includes("A","3") && (dealer_face_up < 5 || dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("26")
  }
  else if( initial_hand_values.includes("A","3") && !(dealer_face_up < 5 || dealer_face_up > 6) ){
    this.advice = DOUBLE;
    console.log("28")
  }
  else if( initial_hand_values.includes("A","2") && (dealer_face_up < 5 || dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("29")
  }
  else if( initial_hand_values.includes("A","2") && !(dealer_face_up < 5 || dealer_face_up > 6) ){
    this.advice = DOUBLE;
    console.log("30")
  }
  else if(this.player_1.score >= 17){
    this.advice = STAY;
    console.log("31")
  }
  else if(this.player_1.score >= 13 && dealer_face_up <= 6){
    this.advice = STAY;
    console.log("32")
  }
  else if(this.player_1.score >= 13 && dealer_face_up > 6){
    this.advice = HIT;
    console.log("33")
  }
  else if(this.player_1.score == 12 && (dealer_face_up < 4) || (dealer_face_up > 6) ){
    this.advice = HIT;
    console.log("34")
  }
  else if( this.player_1.score == 12 && !(dealer_face_up < 4 || dealer_face_up > 6) ){
    this.advice = STAY;
    console.log("35")
  }
  else if(this.player_1.score == 11 && dealer_face_up < 11 ){
    this.advice = DOUBLE;
    console.log("36")
  }
  else if(this.player_1.score == 11 && dealer_face_up == 11 ){
    this.advice = DOUBLE;
    console.log("37")
  }
  else if(this.player_1.score == 10 && dealer_face_up < 10 ){
    this.advice = DOUBLE;
    console.log("38")
  }
  else if(this.player_1.score == 10 && dealer_face_up >= 10 ){
    this.advice = HIT;
    console.log("39")
  }
  else if(this.player_1.score == 9 && (dealer_face_up == 2 || dealer_face_up < 6 ) ){
    this.advice = DOUBLE;
    console.log("40")
  }
  else if(this.player_1.score == 9 && !(dealer_face_up == 2 || dealer_face_up < 6 ) ){
    this.advice = DOUBLE;
    console.log("41")
  }
  else if(this.player_1.score > 4 && this.player_1.score < 9){
    this.advice = HIT;
    console.log("42")
  }

  $("#advice").text(this.advice);
}
