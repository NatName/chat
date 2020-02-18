const { check } = require('express-validator');

module.exports = {
    validateMessage() {
        return [ 
            check('username', 'userName doesn\'t exists').exists(),
            check('message').exists().isLength({ max: 100 })
           ]; 
    },
    validateAuth() {       
        return [
            check('username').exists(),
            check('email').exists().isEmail(),
            check('password').exists().isLength({ min: 5 })
          ]; 
    }   
}