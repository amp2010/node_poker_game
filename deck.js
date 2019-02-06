'use strict';

class Deck{

    constructor(builder){
        this.deck = builder.deck;
        this.addBasicCards();
        this.deck = Deck.shuffle(this.deck);
        return builder;
    }

    addBasicCards(){
        Deck._getCardsSuits().forEach((suit) => {
            Deck._getBasicCardsValue().forEach((card) => {
               this.deck.push({suit: suit, value: card.value, name: card.name});
            });
        });
    }

    static _getBasicCardsValue(){
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
            { value: 14, name: 'Ace' }
        ];
    }

    static _getFacesCardsValue(){
        return [
            { value: 11, name: 'Jack' },
            { value: 12, name: 'Queen' },
            { value: 13, name: 'King' }
        ];
    }

    static _getCardsSuits(){
        return [ 'Clubs' , 'Diamonds' , 'Hearts' , 'Spades' ];
    }

    static shuffle(deck){
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
}

Deck.Builder = class {
    constructor() {
        this.deck = [];
    };

    withJoker(){
        this.deck.push({suit: 'none', value: 9000, name: 'Joker'});
        this.deck.push({suit: 'none', value: 9001, name: 'Colored Joker'});
        return this;
    }

    withFaces(){
        Deck._getCardsSuits().forEach((suit) => {
            Deck._getFacesCardsValue().forEach((card) => {
                this.deck.push({suit: suit, value: card.value, name: card.name});
            });
        });
        return this;
    }

    build(){
        return new Deck(this);
    }
};

module.exports = Deck;