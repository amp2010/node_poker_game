'use strict';

const UserInput = require('./services/UserInput.js');
const Deck = require('./deck.js');
const GameFactory = require('./gameFactory.js');

class App {

    async start(){
        let game = await this._askGameType();
        let playersNumber = await this._askPlayersNumber(game);
        let players = this._generatePlayers(playersNumber);
        let deck = Deck.CreateDeck();

        console.log(game, players, deck);
        game.create(players, deck);
    }

    async _askGameType(){
        let chosenGame;

        do {
            let gameArrays = "";
            GameFactory.GetGameTypes().forEach((el) => { gameArrays += el.name + ", "; });
            chosenGame = await UserInput.read("Choose a game type ( " +  gameArrays + " ... ) : ");
        } while (!this._validGameChoice(chosenGame));

        console.log(chosenGame + " chosen");
        return GameFactory.GetGameTypes().filter( e => e.name === chosenGame)[0];
    }

    async _askPlayersNumber(game){
        let playersNumber;

        do{
            playersNumber = await UserInput.read("Players number (" + game.playersMin + "-" +  game.playersMax + ") : ");
        }while (playersNumber <= game.playersMin || playersNumber >= game.playersMax );

        console.log(playersNumber + " game");
        return playersNumber;
    }

    _validGameChoice(gameType){
        return GameFactory.GetGameTypes().filter( e => e.name === gameType).length > 0;
    }

    _generatePlayers(playersNumber){
        let players = [];
        for(let i = 1; i <= playersNumber; ++i){
            players.push({ name: "Player " + i, hand: []})
        }
        return players;
    }
}

module.exports = App;