'use strict';

const Texas = require('./games/texas');

class GameFactory{

    static createTexasHoldEm(players){
        return new Texas(players);
    }

    static createFerme(players, deck){
        console.log("Sorry, Ferme is not yet implemented");
        process.exit();
    }

    static createOhama(players, deck){
        console.log("Sorry, Ohama is not yet implemented");
        process.exit();
    }

    static createRoyal(players, deck){
        console.log("Sorry, Royale is not yet implemented");
        process.exit();
    }

    static getGameTypes(){
        return [ { name: "Texas Hold'em Limit", playersMin: 2, playersMax: 9, create: this.createTexasHoldEm },
                 { name: 'Ohama', playersMin: 2, playersMax: 10, create: this.createOhama },
                 { name: 'Ferme', playersMin: 4, playersMax: 6, create: this.createFerme },
                 { name: 'Royal', playersMin: 3, playersMax: 7, create: this.createRoyal } ];
    }
}

module.exports = GameFactory;