'use strict';

class Deck{

    static CreateDeck(){
        let deck = [];
        Deck._GetCardsSuits().forEach(function (suit) {
            Deck._GetCardsValue().forEach(function (card) {
                deck.push({suit: suit, value: card.value, name: card.name});
            });
        });
        return this._ShuffleDeck(deck);
    }

    static _GetCardsValue(){
        return [
            { value: 2, name: 2 },
            { value: 3, name: 3 },
            { value: 4, name: 4 },
            { value: 5, name: 5 },
            { value: 6, name: 6 },
            { value: 7, name: 7 },
            { value: 8, name: 8 },
            { value: 9, name: 9 },
            { value: 10, name: 10 },
            { value: 11, name: 'Jack' },
            { value: 12, name: 'Queen' },
            { value: 13, name: 'King' },
            { value: 14, name: 'Ace' }
        ];
    }

    static _GetCardsSuits(){
        return [ 'Clubs' , 'Diamonds' , 'Hearts' , 'Spades' ];
    }

    static _ShuffleDeck(deck){
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
}

module.exports = Deck;