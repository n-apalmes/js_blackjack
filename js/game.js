//OG CODE refactor

// function resetBlackJack(){
//   console.log("game reset")
//   //player_stay = false;
//   playBlackJack();
// }
// // //var player_stay = false;
// function playBlackJack(){
//   console.log("play black jack")
//   var game_deck = new Deck(master_deck)
//   var player_stay = false;
//   var player_1 = new Hand();
//   var dealer = new Dealer();

//   dealer.dealer_hand.hit(game_deck.draw());
//   player_1.hit(game_deck.draw());
//   console.log("Player:"+player_1.score);
//   console.log("Dealer:"+dealer.dealer_hand.score);

//   dealer.dealer_hand.hit(game_deck.draw());
//   player_1.hit(game_deck.draw());
//   console.log("Player:"+player_1.score);
//   console.log("Dealer:"+dealer.dealer_hand.score);

//   $("#dealer_cell").text("The dealer is showing:"+dealer.dealer_hand.cards_held[0].value)
//   $("#player_data").text("The player is has: "+player_1.cards_held[0].value+","+player_1.cards_held[1].value)
//   $("#player_score").text("The player score: "+player_1.score)
//   //console.log("The dealer is showing:"+dealer.dealer_hand.cards_held[0].value)

//   if(player_1.blackjack() && !dealer.dealer_hand.blackjack()){
//     alert("player wins! via Blackjack");
//     resetBlackJack();
//   }else if(!player_1.blackjack() && dealer.dealer_hand.blackjack()){
//     alert("dealer wins! via Blackjack");
//     resetBlackJack();
//   }else if(player_1.blackjack() && dealer.dealer_hand.blackjack()){
//     console.log("Tie via Blackjack");
//     resetBlackJack();
//   }

//   if(player_stay == false){
//     $("#hit").bind("click", function(){
//       console.log("unbind occured?")
//       $( "#hit").unbind( "click" );
//       player_1.hit(game_deck.draw());
//       console.log(player_1.cards_held[player_1.cards_held.length-1].value)
//       $("#player_score").text("The player score: "+player_1.score)

//       if(player_1.bust()){
//         alert("You lose via bust")
//         resetBlackJack();
//       }
//     });

//   }
//   $("#stay").bind("click", function(){
//     console.log("unbind occured?")
//     $( "#stay").unbind( "click" );
//     console.log("player stops");
//     player_stay = true;
//     while (dealer.stay() == false)
//     {
//       console.log("dealer draws");

//       dealer.dealer_hand.hit(game_deck.draw());
//       if (dealer.dealer_hand.bust()){
//         alert("You win, the dealer busted")
//         resetBlackJack();
//       }
//     }

//     if (dealer.dealer_hand.score === player_1.score){
//       console.log("Tie game");
//       alert("Tie game");
//       resetBlackJack();
//     }
//     else if(dealer.dealer_hand.bust() == false && dealer.dealer_hand.score > player_1.score){
//       console.log("You lose, the dealer outscored you");
//       alert("You lose, the dealer outscored you")
//       resetBlackJack();
//     }
//     else if(player_1.score > dealer.dealer_hand.score && player_1.bust() == false){
//       console.log("You win, you outscored the dealer")
//       alert("You win, you outscored the dealer")
//       resetBlackJack();
//     }
//   });

// }
