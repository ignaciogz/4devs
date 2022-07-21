const Winston = require('./winston');

class Logger {
    static singleton;

    constructor() {
        if(Logger.singleton){
            return Logger.singleton;
        }
        
        Logger.singleton = new Winston();
        this.singleton = Logger.singleton;
    }
}

module.exports = new Logger().singleton;
