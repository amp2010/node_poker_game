'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Readline {

    /**
     * returns the answer
     */
    static read(question){
        return new Promise((resolve) => {
            rl.question(question, (value) => { resolve(value) })
        });
    }
}

module.exports = Readline;
/*rl.question('Please enter a color? ', (value) => {
    let color = value;
    console.log(`You entered ${color}`);
    rl.close();
});*/