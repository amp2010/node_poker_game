'use strict';

class Texas {

    constructor (players, deck){
        this.players = players;
        this.deck = deck;
    }

    start(){
        console.log(this.players);
    }
}

module.exports = Texas;