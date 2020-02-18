import Message      from '../models/message';
import cookieParser from "cookie-parser";
import passport     from "passport";

function auth(socket, next) {
    // Parse cookie
    cookieParser()(socket.request, socket.request.res, () => {});
  
    // JWT authenticate
    passport.authenticate(
      "jwt",
      { session: false },
      (error, decryptToken, jwtError) => {
        
        if (!error && !jwtError && decryptToken) {
          next(decryptToken.username);
        } else {
          next();
        }
      }
    )(socket.request, socket.request.res);
  }

async function postMessage(data) {
    try {
        const message = await Message.create(data);
        message.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = io => {
    io.on('connection', function (socket) {
        auth(socket, (user = "Guest") => {
              socket.join("all");
              socket.username = user;
              socket.emit(
                "connected",
                `you are connected to chat as ${user}`
              );
            
          });

        socket.join('all');

        socket.on('msg', data => {
            postMessage({
                text: data,
                author: socket.username
            })
            socket.emit("message", {
                message: data,
                author: socket.username
            });
            socket.to('all').emit("message", {
                message: data,
                author: socket.username
            });
        });
    })
}