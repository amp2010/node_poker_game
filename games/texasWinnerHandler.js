'use strict';

class Handler {

    constructor(board, players){
        this.board = board;
        this.players = players;
    };

    handle() {
        this.players.forEach((player) => {
            this._setPlayerHand(player);
            this._handleFlush(player);
        });
    }

    displayPlayersHand(){
        console.log("************ Result ************");
        this.players.forEach((player) => {
            console.log(player.name + " has " + player.handName + " (" + player.handValue + ")");
        });
    }

    displayWinner() {
        let highestScore = Math.max.apply(Math, this.players.map((player) => { return player.handValue; }));
        let winners = this.players.filter((player) => { return player.handValue === highestScore; });

        console.log("************ Winner ************");
        winners.forEach((player) => {
            console.log("Winner: " + player.name + " with " + player.handName);
        });
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
            player.handValue = 700 + parseInt(highestCard);

            if(this._hasStraight(player.hand)){
                player.handValue = 800 + parseInt(highestCard);
            }
        }

        (!player.handValue) ? this._handleStraight(player) : false;
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
            player.handValue = 600 + parseInt(this._getPlayerHighestCard(player));
        }

        (!player.handValue) ? this._handleFours(player) : false;
    }

    _handleFours(player) {
        let fourOfAKind = this._getPlayerCardsCountOf(player, 4);

        if(fourOfAKind) {
            player.handName = "Four " + fourOfAKind[0];
            player.handValue = 500
                             + parseInt(fourOfAKind[0])
                             + this._getPlayerHighestCard(player);
        }

        (!player.handValue) ? this._handleFullHouse(player) : false;
    }

    _handleFullHouse(player) {
        let twoOfAKind = this._getPlayerCardsCountOf(player, 2);
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);
        let bestTwo = twoOfAKind[twoOfAKind.length - 1];
        let bestThree = threeOfAKind[threeOfAKind.length - 1];

        if(bestTwo !== null && bestThree !== null) {
            player.handName = "Full house of three " + bestThree + " and two " + bestTwo;
            player.handValue = 400
                             + parseInt(bestTwo)
                             + parseInt(bestThree);
        }

        (!player.handValue) ? this._handleThrees(player) : false;
    }

    _handleThrees(player) {
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);
        let bestThree = threeOfAKind[threeOfAKind.length - 1];

        if(bestThree) {
            player.handName = "Three " + bestThree;
            player.handValue = 300
                             + parseInt(bestThree)
                             + this._getPlayerHighestCard(player);
        }

        (!player.handValue) ? this._handlePairs(player) : false;
    }

    _handlePairs(player) {
        let pair = this._getPlayerCardsCountOf(player, 2);
        let bestPair = pair[pair.length - 1];
        let highestCard = this._getPlayerHighestCard(player);

        if(pair) {
            player.handName = "Pair of " + bestPair;
            player.handValue = 100
                + (parseInt(bestPair) * 2)
                + highestCard;
        }

        if(pair.length > 1) {
            let secondBestPair = pair[pair.length - 2];
            player.handName = "Two pair of " + bestPair + " and " + secondBestPair;
            player.handValue = 200
                             + (parseInt(bestPair) * 2)
                             + highestCard;
        }

        (!player.handValue) ? this._handleRest(player) : false;
    }

    _handleRest(player) {
        let highestCard = this._getPlayerHighestCard(player);
        player.handName = "Nothing but a " + highestCard;
        player.handValue = highestCard;
    }

    _getPlayerHighestCard(player) {
        return Math.max.apply(Math, player.hand.map((card) => { return card.value; }));
    }

    /**
     * @param player
     * @param occurrence: number of time the same card should be found in the player's hand
     * @return array: returns an array containing the cards respecting the occurrence
     * @private
     */
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
}

module.exports = Handler;