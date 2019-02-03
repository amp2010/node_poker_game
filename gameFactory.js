'use strict';

class GameFactory{

    static StartTexasHoldEm(players, deck){
        console.log("Texas Hold'em")
    }

    static StartFerme(players, deck){
        throw new Error("Sorry, Ferme is not yet implemented");
        console.log("Sorry, Ferme is not yet implemented");
        process.exit(1);
    }

    static StartOhama(players, deck){
        console.log("Sorry, Ohama is not yet implemented");
    }

    static StartRoyal(players, deck){
        console.log("Sorry, Royale is not yet implemented");
    }

    static GetGameTypes(){
        return [ { name: "Texas Hold'em Limit", playersMin: 2, playersMax: 9, create: this.StartTexasHoldEm },
                 { name: 'Ohama', playersMin: 2, playersMax: 10, create: this.StartFerme },
                 { name: 'Ferme', playersMin: 4, playersMax: 6, create: this.StartOhama },
                 { name: 'Royal', playersMin: 3, playersMax: 7, create: this.StartRoyal } ];
    }
}

module.exports = GameFactory;