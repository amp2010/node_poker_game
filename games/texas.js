'use strict';

const Deck = require('../deck.js');

class Texas {

    constructor (players){
        this.players = players;
        this.deck = Deck.createDeck();
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

    }
}

module.exports = Texas;