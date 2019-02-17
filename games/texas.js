'use strict';

const Deck = require('../deck.js');
const TexasHandler = require('./texasWinnerHandler.js');

class Texas {

    constructor (players){
        this.players = players;
        this.deck = new Deck.Builder()
                            .withFaces()
                            .build();
        this.board = [];
    }

    start(){
        this.distributeCards();
        this.deck = Deck.shuffle(this.deck);
        this.doFlop();
        this.doTurn();
        this.doRiver();
        this.verifyWinner();
        this.displayEndOfGameResult();
    }

    displayEndOfGameResult() {
        console.log("************ Result ************");
        console.log("Board: " + this.board.map((card) => { return (card.name + " of " + card.suit); }).join(", "));
        this.handler.displayPlayersHand();
        this.handler.displayWinner();
    }

    distributeCards(){
        this.distributeFirstCard();
        this.distributeSecondCard();
    }

    doFlop() {
        this.burnCard();
        this.board.push(this.deck.shift());
        this.board.push(this.deck.shift());
        this.board.push(this.deck.shift());
    }

    doTurn() {
        this.burnCard();
        this.board.push(this.deck.shift());
    }

    doRiver() {
        this.burnCard();
        this.board.push(this.deck.shift());
    }

    verifyWinner() {
        this.handler = new TexasHandler(this.board, this.players);
        this.handler.handle();
    }

    distributeFirstCard(){
        this.players.forEach((player) => {
            player.hand.push(this.deck.shift());
        });
    }

    distributeSecondCard(){
        this.players.forEach((player) => {
            player.hand.push(this.deck.shift());
        });
    }

    burnCard(){
        /** Burns a card **/
        this.deck.shift();
    }
}

module.exports = Texas;