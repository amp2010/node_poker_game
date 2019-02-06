'use strict';

const Texas = require('./games/texas');
const Ferme = require('./games/ferme');
const Ohama = require('./games/ohama');
const Royal = require('./games/royal');


class GameFactory{

    static createTexasHoldEm(players){
        return new Texas(players);
    }

    static createFerme(players){
        return new Ferme(players);
    }

    static createOhama(players){
        return new Ohama(players);
    }

    static createRoyal(players){
        return new Royal(players);
    }

    static getGameTypes(){
        return [ { name: "Texas", playersMin: 2, playersMax: 9, create: this.createTexasHoldEm },
                 { name: 'Ohama', playersMin: 2, playersMax: 10, create: this.createOhama },
                 { name: 'Ferme', playersMin: 4, playersMax: 6, create: this.createFerme },
                 { name: 'Royal', playersMin: 3, playersMax: 7, create: this.createRoyal } ];
    }
}

module.exports = GameFactory;