import express        from 'express';
import router         from './routes/router.js';
import bodyParser     from 'body-parser';
import {connect, set} from 'mongoose';
import path           from 'path';
import cookieParser   from "cookie-parser";
import passport       from "passport";
import { jwt }        from "./config/config";
import { Strategy }   from "passport-jwt";

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

passport.use(
    new Strategy(jwt, function(jwt_payload, done) {
      if (jwt_payload != void 0) {
        return done(false, jwt_payload);
      }
      done();
    })
  );

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

connect("mongodb://localhost:27017/messages", { useNewUrlParser: true });
set('useFindAndModify', false);


app.set('views', path.join(__dirname, 'views'));
app.use("/assets", express.static("./views/public"));
app.set('view engine', 'ejs');

app.use(router);

require("./middlewares/socket")(io);


server.listen(+process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})