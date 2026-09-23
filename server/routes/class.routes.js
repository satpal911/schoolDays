import express from 'express';
import { addClass } from '../controllers/class.controller.js';
import principalAuthentication from '../middlewares/auth.principal.js';

const classRouter = express.Router();

classRouter.post('/', principalAuthentication, addClass);

export default classRouter;
