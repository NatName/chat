import Message from '../models/message';

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
    async postMessage(req, res, next) {
        console.log("postMessage");
        
        console.log(req.body);
    }
}