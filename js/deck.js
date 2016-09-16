var Card = function(value, suit, image) {
  this.suit = suit;
  this.value = value;
  this.image = image;
};

Card.prototype.evaluate = function(){
  var value;
  if (this.value == "J" || this.value == "Q" ||this.value == "K"){
    value = 10;
  }
  else if(this.value == "A"){
    value = 11;
  }
  else{
    value = parseInt(this.value);
  }

  return value;
};


var Deck = function(cards){
  //this.deck_available = cards;
  this.deck_available = cards.slice();
  this.played_cards = [];
};

Deck.prototype.draw = function(){

  var random = Math.floor( (Math.random() * this.deck_available.length));

  this.played_cards.push(this.deck_available[random]);
  this.deck_available.splice(random, 1);

  return this.played_cards[this.played_cards.length-1];
};


SA = new Card("A", "Spades", "SA.png" );
S2= new Card("2", "Spades", "S2.png" );
S3= new Card("3", "Spades", "S3.png" );
S4= new Card("4", "Spades", "S4.png" );
S5= new Card("5", "Spades", "S5.png" );
S6= new Card("6", "Spades", "S6.png" );
S7= new Card("7", "Spades", "S7.png" );
S8= new Card("8", "Spades", "S8.png" );
S9= new Card("9", "Spades", "S9.png" );
ST= new Card("10", "Spades", "ST.png" );
SJ= new Card("J", "Spades", "SJ.png" );
SQ= new Card("Q", "Spades", "SQ.png" );
SK= new Card("K", "Spades", "SK.png" );
CA = new Card("A", "Clovers", "CA.png" );
C2= new Card("2", "Clovers", "C2.png" );
C3= new Card("3", "Clovers", "C3.png" );
C4= new Card("4", "Clovers", "C4.png" );
C5= new Card("5", "Clovers", "C5.png" );
C6= new Card("6", "Clovers", "C6.png" );
C7= new Card("7", "Clovers", "C7.png" );
C8= new Card("8", "Clovers", "C8.png" );
C9= new Card("9", "Clovers", "C9.png" );
CT= new Card("10", "Clovers", "CT.png" );
CJ= new Card("J", "Clovers", "CJ.png" );
CQ= new Card("Q", "Clovers", "CQ.png" );
CK= new Card("K", "Clovers", "CK.png" );
HA = new Card("A", "Hearts", "HA.png" );
H2= new Card("2", "Hearts", "H2.png" );
H3= new Card("3", "Hearts", "H3.png" );
H4= new Card("4", "Hearts", "H4.png" );
H5= new Card("5", "Hearts", "H5.png" );
H6= new Card("6", "Hearts", "H6.png" );
H7= new Card("7", "Hearts", "H7.png" );
H8= new Card("8", "Hearts", "H8.png" );
H9= new Card("9", "Hearts", "H9.png" );
HT= new Card("10", "Hearts", "HT.png" );
HJ= new Card("J", "Hearts", "HJ.png" );
HQ= new Card("Q", "Hearts", "HQ.png" );
HK= new Card("K", "Hearts", "HK.png" );
DA = new Card("A", "Diamonds", "DA.png" );
D2= new Card("2", "Diamonds","D2.png" );
D3= new Card("3", "Diamonds", "D3.png" );
D4= new Card("4", "Diamonds", "D4.png" );
D5= new Card("5", "Diamonds", "D5.png" );
D6= new Card("6", "Diamonds", "D6.png" );
D7= new Card("7", "Diamonds", "D7.png" );
D8= new Card("8", "Diamonds", "D8.png" );
D9= new Card("9", "Diamonds", "D9.png" );
DT= new Card("10", "Diamonds", "DT.png" );
DJ= new Card("J", "Diamonds", "DJ.png" );
DQ= new Card("Q", "Diamonds", "DQ.png" );
DK= new Card("K", "Diamonds", "DK.png" );

var master_deck = [SA, S2, S3, S4, S5, S6, S7, S8, S9, ST, SJ, SQ, SK,
    CA, C2, C3, C4, C5, C6, C7, C8, C9, CT, CJ, CQ, CK,
    HA, H2, H3, H4, H5, H6, H7, H8, H9, HT, HJ, HQ, HK,
    DA, D2, D3, D4, D5, D6, D7, D8, D9, DT, DJ, DQ, DK];
