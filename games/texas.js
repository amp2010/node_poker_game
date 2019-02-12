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
        let handler = new TexasHandler(this.board, this.players);
        handler.handle();
        handler.displayPlayersHand();
        handler.displayWinner();
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