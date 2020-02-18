import User     from '../models/user';
import _        from 'lodash';
import config   from "../config/config";
import bcrypt   from 'bcrypt';
import jwt      from "jsonwebtoken";
const { validationResult } = require('express-validator');



module.exports = {
    async register(req, res, next) {
        const errors = validationResult(req);

        if(errors.errors.length !== 0) {
            console.log(errors);
            return res.status(400).send({ message: "incorrect email or password" });
        }
        
        try {
            let user = await User.findOne({
                username: req.body.username
              })
                .lean()
                .exec();
            if (user) {
                return res.status(400).send({ message: "User already exist" });
            }
            user = await User.create(req.body);
            
            const token = jwt.sign({ id: user._id, username: user.username }, config.jwt.secretOrKey, {
                expiresIn: config.expiresIn
              });

            res.cookie("token", token, {
              httpOnly: true
            });
            res.status(200).send({ message: "User created." });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "some error" });
        }
    },
    async login(req, res) {
        try {
            let user = await User.findOne({
                username: req.body.username
            }).lean().exec();

            if (user && bcrypt.compareSync(req.body.password, user.password)) {
              const token = jwt.sign({ id: user._id, username: user.username }, config.jwt.secretOrKey, {
                expiresIn: config.expiresIn
              });
              res.cookie("token", token, {
                httpOnly: true
              });
      
              res.status(200).send({ message: "User login success." });
            } else
              res
                .status(400)
                .send({ message: "User not exist or password not correct" });
          } catch (e) {
            console.error(e);
            res.status(500).send({ message: "some error" });
          }
    },
    logout (req, res) {
        
        res.clearCookie("token");
        res.status(200).send({ message: "Logout success." });
    }
}