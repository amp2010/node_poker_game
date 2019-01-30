'use strict';

const rl = require('./services/readline.js');

class App {

    async test(){
        let value = await rl.read("gros ? ");
        console.log(value);
    }
}





module.exports = App;