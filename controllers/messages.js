import Message from '../models/message';
import mongoose from 'mongoose';

module.exports = {
    async getMessages(req, res) {      
        try {
            const page = req.params.page,
                  limit = 10,
                  skip  = page * limit;
            
            let sortData = await Message.find().sort({createdAt: -1}).limit(limit).skip(skip);         
            const data = sortData.sort((a, b) => a.createdAt - b.createdAt);
            
            
            res.render('chat', {
                username: req.user ? req.user.username : 'Guest',
                data,
                error: req.error ? req.error : '',
                page: page - 0 + 1
            });
        } catch (e) {
            console.log(e);
            
        }
    },
    async getMessage(req, res) {      
        try {         
            const id = req.params.id
            const data = await Message.findOne({"_id" : mongoose.Types.ObjectId(id)})
            
            if (!data) {
                return res.status(400).send({ message: "wrong id" });
            }

            res.render('singleMessage', {
                data
            });
        } catch (e) {
            console.log(e);
            return res.status(400).send({ message: "wrong id" });
        }
    }
}