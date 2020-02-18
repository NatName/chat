import { Schema, model } from 'mongoose';

let messagesSchema = new Schema({
  author : String,
  text   : String,
},
{
  timestamps: true
}, 
{ 
    collection: 'messages' 
} 
);

module.exports = model('Message', messagesSchema);