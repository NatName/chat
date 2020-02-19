import express from 'express';
import { checkAuth } from '../middlewares/checkAuth'
import { validateAuth } from '../middlewares/validator'
import {
  getMessages,
  getMessage
} from '../controllers/messages'
import {
  register,
  login,
  logout
} from '../controllers/auth'
const router = express.Router();

router.get('/list/:page', checkAuth, getMessages);
router.get('/single/:id', checkAuth, getMessage);

router.post('/register', validateAuth(), register);
router.post('/login', login);
router.post('/logout', logout);

export default router;