'use strict';

const Deck = require('../deck.js');

class Ferme {

    constructor (players){
        this.players = players;
        this.deck = new Deck.Builder()
            .withFaces()
            .build();
    }

    start(){
        console.log("Sorry, Ferme is not yet implemented");
        process.exit();
    }
}

module.exports = Ferme;