'use strict';

class Handler {

    constructor(board, players){
        this.board = board;
        this.players = players;
        this.handlers = [
            this._handleFlush,
            this._handleStraight,
            this._handleFours,
            this._handleFullHouse,
            this._handleThrees,
            this._handlePairs,
            this._handleRest
        ];

        this.HAND_SCORE = {
            StraightFlush: 800,
            Flush: 700,
            Straight: 600,
            Fours: 500,
            FullHouse: 400,
            Threes: 300,
            TwoPairs: 200,
            OnePair: 100,
            Nothing: 0
        };
    };

    handle() {
        this.players.forEach((player) => {
            this.handlerIndex = 0;
            this._setPlayerHand(player);
            this._next(player);
        });
    }

    getWinner() {
        this._displayPlayersHand();
        let highestScore = Math.max.apply(Math, this.players.map((player) => { return player.handValue; }));
        return this.players.filter((player) => { return player.handValue === highestScore; });
    }

    _setPlayerHand(player){
        player.hand = player.hand.concat(this.board);
        player.cardsCount = {};
        player.hand.forEach((x) => { player.cardsCount[x.value] = (player.cardsCount[x.value] || 0) + 1; });
    }

    _handleFlush(player) {
        /** Sort hand by suits **/
        player.hand.sort((a, b) => a.suit.localeCompare(b.suit));

        if(player.hand[0].suit === player.hand[4].suit ||
            player.hand[1].suit === player.hand[5].suit ||
            player.hand[2].suit === player.hand[6].suit) {

            let highestCard = this._getPlayerHighestCard(player);
            player.handName = "Flush";
            player.handValue = this.HAND_SCORE.Flush + parseInt(highestCard);

            if(this._hasStraight(player.hand)){
                player.handValue = this.HAND_SCORE.StraightFlush + parseInt(highestCard);
            }
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handleStraight(player) {
        /** Sort hand by card value **/
        player.hand.sort((a, b) => {
            if(a.value < b.value) { return -1; }
            if(a.value > b.value) { return 1; }
            return 0
        });

        if(this._hasStraight(player.hand)) {
            player.handName = "Straight";
            player.handValue = this.HAND_SCORE.Straight + parseInt(this._getPlayerHighestCard(player));
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handleFours(player) {
        let fourOfAKind = this._getPlayerCardsCountOf(player, 4);

        if(fourOfAKind) {
            player.handName = "Four " + fourOfAKind[0];
            player.handValue = this.HAND_SCORE.Fours
                             + parseInt(fourOfAKind[0])
                             + this._getPlayerHighestCard(player);
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handleFullHouse(player) {
        let twoOfAKind = this._getPlayerCardsCountOf(player, 2);
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);
        let bestTwo = twoOfAKind[twoOfAKind.length - 1];
        let bestThree = threeOfAKind[threeOfAKind.length - 1];

        if(bestTwo !== null && bestThree !== null) {
            player.handName = "Full house of three " + bestThree + " and two " + bestTwo;
            player.handValue = this.HAND_SCORE.FullHouse
                             + parseInt(bestTwo)
                             + parseInt(bestThree);
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handleThrees(player) {
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);
        let bestThree = threeOfAKind[threeOfAKind.length - 1];

        if(bestThree) {
            player.handName = "Three " + bestThree;
            player.handValue = this.HAND_SCORE.Threes
                             + parseInt(bestThree)
                             + this._getPlayerHighestCard(player);
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handlePairs(player) {
        let pair = this._getPlayerCardsCountOf(player, 2);
        let bestPair = pair[pair.length - 1];
        let highestCard = this._getPlayerHighestCard(player);

        if(pair) {
            player.handName = "Pair of " + bestPair;
            player.handValue = this.HAND_SCORE.OnePair
                + (parseInt(bestPair) * 2)
                + highestCard;
        }

        if(pair.length > 1) {
            let secondBestPair = pair[pair.length - 2];
            player.handName = "Two pair of " + bestPair + " and " + secondBestPair;
            player.handValue = this.HAND_SCORE.TwoPairs
                             + (parseInt(bestPair) * 2)
                             + highestCard;
        }

        (!player.handValue) ? this._next(player) : false;
    }

    _handleRest(player) {
        let highestCard = this._getPlayerHighestCard(player);
        player.handName = "Nothing but a " + highestCard;
        player.handValue = this.HAND_SCORE.Nothing + highestCard;
    }

    _getPlayerHighestCard(player) {
        return Math.max.apply(Math, player.hand.map((card) => { return card.value; }));
    }

    _displayPlayersHand(){
        this.players.forEach((player) => {
            console.log(player.name + " has " + player.handName + " (" + player.handValue + ")");
        });
    }

    _getPlayerCardsCountOf(player, occurrence) {
        return Object.keys(player.cardsCount).filter(key => player.cardsCount[key] === occurrence);
    }

    _hasStraight(hand) {
        let straightCards = 1;
        for(let i = 0, j = 1; i < 6; i++, j++){
            if((hand[i].value + 1) === hand[j].value){
                straightCards++;
            } else {
                straightCards = 1;
            }
        }
        return (straightCards >= 5);
    }

    _next(player){
        this.handlers[this.handlerIndex++].call(this, player);
    }
}

module.exports = Handler;