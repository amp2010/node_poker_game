'use strict';

const Texas = require('./games/texas');

class GameFactory{

    static StartTexasHoldEm(players, deck){
        console.log("Texas Hold'em");
        let texas = new Texas(players, deck);
        texas.start();
    }

    static StartFerme(players, deck){
        console.log("Sorry, Ferme is not yet implemented");
        process.exit();
    }

    static StartOhama(players, deck){
        console.log("Sorry, Ohama is not yet implemented");
        process.exit();
    }

    static StartRoyal(players, deck){
        console.log("Sorry, Royale is not yet implemented");
        process.exit();
    }

    static GetGameTypes(){
        return [ { name: "Texas Hold'em Limit", playersMin: 2, playersMax: 9, start: this.StartTexasHoldEm },
                 { name: 'Ohama', playersMin: 2, playersMax: 10, start: this.StartOhama },
                 { name: 'Ferme', playersMin: 4, playersMax: 6, start: this.StartFerme },
                 { name: 'Royal', playersMin: 3, playersMax: 7, start: this.StartRoyal } ];
    }
}

module.exports = GameFactory;