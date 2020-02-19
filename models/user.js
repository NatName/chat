import { Schema, model } from 'mongoose';
import bcrtypt           from "bcrypt";

let userSchema = new Schema({
  username : String,
  password : String,
  email    : String,
},
{
  timestamps: true
}, 
{ 
    collection: 'users' 
} 
);

userSchema.pre("save", function(next){
  if (this.isModified("password") || this.isNew()) {
    this.password = bcrtypt.hashSync(this.password, 12);
  }
  next();
});

module.exports = model('User', userSchema);