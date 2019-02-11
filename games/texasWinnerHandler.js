'use strict';

class Handler{

    constructor(){};

    handle(board, players){
        this.board = board;
        this.players = players;

        this.players.forEach((player) => {
            player.hand = player.hand.concat(this.board);
            player.handValue = 0;
            player.cardsCount = {};
            player.hand.forEach((x) => { player.cardsCount[x.value] = (player.cardsCount[x.value] || 0) + 1; });
            this._handleFlush(player);
            console.log(player.handValue);
            console.log(player.handName);
            console.log(player.hand);
        });
    }

    _handleFlush(player){

        player.hand.sort((a, b) => a.suit.localeCompare(b.suit));

        if(player.hand[0].suit === player.hand[4].suit ||
            player.hand[1].suit === player.hand[5].suit ||
            player.hand[2].suit === player.hand[6].suit){
            player.handName = "Flush";
            player.handValue = 700;

            if(this._isStraight(player.hand)){
                player.handValue = 800;
            }
        }

        (!player.handValue) ? this._handleStraight(player) : false;
    }

    _handleStraight(player){
        player.hand.sort((a, b) => {
            if(a.value < b.value) { return -1; }
            if(a.value > b.value) { return 1; }
            return 0
        });

        if(this._isStraight(player.hand)){
            player.handName = "Straight";
            player.handValue = 600;
        }

        (!player.handValue) ? this._handleFours(player) : false;
    }

    _handleFours(player){


        let fourOfAKind = this._getPlayerCardsCountOf(player, 4);
        if(fourOfAKind){
            player.handName = "Four " + fourOfAKind;
            player.handValue = 500 + fourOfAKind;
        }

        (!player.handValue) ? this._handleFullHouse(player) : false;
    }

    _handleFullHouse(player){

        let twoOfAKind = this._getPlayerCardsCountOf(player, 2);
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);

        if(twoOfAKind !== false && threeOfAKind !== false){
            player.handName = "Full house with three " + threeOfAKind + " and two " + twoOfAKind;
            player.handValue = 400 + twoOfAKind + threeOfAKind;
        }

        (!player.handValue) ? this._handleThrees(player) : false;
    }

    _handleThrees(player){
        let threeOfAKind = this._getPlayerCardsCountOf(player, 3);

        if(threeOfAKind){
            player.handName = "Three " + threeOfAKind;
            player.handValue = 300 + threeOfAKind;
        }

        (!player.handValue) ? this._handlePairs(player) : false;
    }

    _handlePairs(player){
        let pair = this._getPlayerCardsCountOf(player, 2);

        if(pair){
            player.handName = "Pair of " + pair;
            player.handValue = 200 + pair;
        }

        (!player.handValue) ? this._handleRest(player) : false;
    }

    _handleRest(player){
        let highestCard = Math.max.apply(Math, player.hand.map(function(card) { return card.value; }));
        player.handName = "Nothing but a " + highestCard;
        player.handValue = highestCard;
    }

    /**
     * @param player
     * @param occurence: number of time the same card should be found
     * @return int: returns the card value respecting the occurence or undefined if none
     * @private
     */
    _getPlayerCardsCountOf(player, occurence){
        let a = Object.keys(player.cardsCount).find(key => player.cardsCount[key] === occurence);
        return (parseInt(a) || false);
    }

    _isStraight(hand){
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