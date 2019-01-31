'use strict';

const UserInput = require('./services/UserInput.js');

class App {


    async start(){

        let gametype = await this.askGameType();
        let playersNumber = await this.askPlayersNumber();

        console.log(gametype, playersNumber);
    }

    async askGameType(){
        let gameType;
        do {
            gameType = await UserInput.read("Game type () : ");
            console.log(gameType + " chosen");
        } while (gameType !== "b");
        return gameType;
    }

    async askPlayersNumber(){
        let playerNumber = await UserInput.read("Players number (2-8) : ");
        console.log(playerNumber + " game");
        return playerNumber;
    }
}

module.exports = App;