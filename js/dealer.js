// var Dealer = {
//   dealers_hand: new Hand(),

//   // dealer
//   stay: function(){
//     return(this.dealers_hand.score >= 17)
//   },

//   hit: function(){
//     if (this.stay()){
//       console.log("The dealer decided to stay");
//       this.dealers_hand.hit();
//     }
//   },
// };

var Dealer = function(){
  this.dealer_hand = new Hand();
}

Dealer.prototype.stay = function(){
  return(this.dealer_hand.score >= 17)
}

//Dealer.prototype.hit = function(){}
