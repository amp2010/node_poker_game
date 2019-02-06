'use strict';

const Deck = require('../deck.js');

class Texas {

    constructor (players){
        this.players = players;
        this.deck = new Deck.Builder()
                            .withFaces()
                            .build();
    }

    start(){
        console.log(this.deck);
        this.distributeCards();
        this.deck = Deck.shuffle(this.deck);
        this.doFlop();
        this.doTurn();
        this.doRiver();
        this.verifyWinner();
    }

    distributeCards(){

    }

    doFlop() {

    }

    doTurn() {

    }

    doRiver() {

    }

    verifyWinner() {

    }
}

module.exports = Texas;