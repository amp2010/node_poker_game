'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class UserInput {

    /**
     * returns the promise answer
     */
    static read(question){
        return new Promise((resolve) => {
            rl.question(question, (value) => { resolve(value) });
        });
    }
}

module.exports = UserInput;