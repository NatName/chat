const { check } = require('express-validator');

module.exports = {

    validateAuth() {       
        return [
            check('username').exists(),
            check('email').exists().isEmail(),
            check('password').exists().isLength({ min: 5 })
          ]; 
    }   
}