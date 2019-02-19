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
        this._distributeCards();
        this.deck = Deck.shuffle(this.deck);
        this._doFlop();
        this._doTurn();
        this._doRiver();
        this._verifyWinner();
        this._displayEndOfGameResult();
    }

    _displayEndOfGameResult() {
        console.log("************ Result ************");
        console.log("Board: " + this.board.map((card) => { return (card.name + " of " + card.suit); }).join(", "));
        this.handler.displayPlayersHand();
        this.handler.displayWinner();
    }

    _distributeCards(){
        this._distributeFirstCard();
        this._distributeSecondCard();
    }

    _doFlop() {
        this._burnCard();
        this.board.push(this.deck.shift());
        this.board.push(this.deck.shift());
        this.board.push(this.deck.shift());
    }

    _doTurn() {
        this._burnCard();
        this.board.push(this.deck.shift());
    }

    _doRiver() {
        this._burnCard();
        this.board.push(this.deck.shift());
    }

    _verifyWinner() {
        this.handler = new TexasHandler(this.board, this.players);
        this.handler.handle();
    }

    _distributeFirstCard(){
        this.players.forEach((player) => {
            player.hand.push(this.deck.shift());
        });
    }

    _distributeSecondCard(){
        this.players.forEach((player) => {
            player.hand.push(this.deck.shift());
        });
    }

    _burnCard(){
        /** Burns a card **/
        this.deck.shift();
    }

    _askPlayersForBet(){
        this.players.forEach((player) => {
            //TODO ask for bet amount
        });
    }
}

module.exports = Texas;