'use strict';

const Deck = require('../deck.js');

class Ohama {

    constructor (players){
        this.players = players;
        this.deck = new Deck.Builder()
            .withFaces()
            .build();
    }

    start(){
        console.log("Sorry, Ohama is not yet implemented");
        process.exit();
    }
}

module.exports = Ohama;