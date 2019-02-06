'use strict';

const Deck = require('../deck.js');

class Royal {

    constructor (players){
        this.players = players;
        this.deck = new Deck.Builder()
            .withFaces()
            .build();
    }

    start(){
        console.log("Sorry, Royale is not yet implemented");
        process.exit();
    }
}

module.exports = Royal;