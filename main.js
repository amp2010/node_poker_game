'use strict';

const App = require('./app.js');
new App().start();


/**
 * 'use strict';

 class Poutine {

    constructor(builder) {
        this.cheeseType = builder.cheeseType;
        this.sauce = builder.sauce;
        return builder;
    }
}

 Poutine.Build = class {

    constructor(){};

    withCheese (cheeseType) {
        this.cheeseType = cheeseType;
        return this;
    };

    withSauce (sauce) {
        this.sauce = sauce;
        return this;
    };

    build () {
        return new Poutine(this);
    };
};


 let poutine = new Poutine.Build()
 .withCheese("gros cave")
 .withSauce("big")
 .build();

 console.log(poutine.cheeseType);
 console.log(poutine.sauce);
 */