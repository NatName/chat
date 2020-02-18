import express from 'express';
import { checkAuth } from '../middlewares/checkAuth'
import { validateAuth, validateMessage } from '../middlewares/validator'
const { check } = require('express-validator');
import {
  getMessages,
  postMessage
} from '../controllers/messages'
import {
  register,
  login,
  logout
} from '../controllers/auth'
const router = express.Router();

router.get('/list/:page', checkAuth, getMessages);
router.post('/list', postMessage);

router.post('/register', validateAuth(), register);
router.post('/login', login);
router.post('/logout', logout);
export default router;