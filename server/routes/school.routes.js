import express from 'express';
import { addSchool, allSchools, deleteSchool, getOneSchool, updateSchool } from '../controllers/school.controller.js';

import directorAuthentication from '../middlewares/auth.director.js';

const schoolRouter = express.Router();
schoolRouter.post('/addSchool', directorAuthentication,addSchool);
schoolRouter.get('/allSchools', directorAuthentication, allSchools);
schoolRouter.get('/allSchools/:id', directorAuthentication, getOneSchool);
schoolRouter.patch('/allSchools/:id', directorAuthentication, updateSchool);
schoolRouter.delete('/allSchools/:id', directorAuthentication, deleteSchool);

export default schoolRouter;    