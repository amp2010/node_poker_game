'use strict';

class GameFactory{

    static createTexasHoldEm(){

    }

    static getGameTypes(){
        return [ { name: 'Texas Hold Em', playersMin: 2, playersMax: 8 },
                 { name: 'Whatever', playersMin: 2, playersMax: 8 },
                 { name: 'Whatever', playersMin: 2, playersMax: 8 } ];
    }
}