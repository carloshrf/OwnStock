import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import ClassificationController from './app/controllers/ClassificationController';
import UnitController from './app/controllers/UnitController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.get('/users/', UserController.index);
routes.get('/classifications', ClassificationController.index);
routes.post('/classifications', ClassificationController.store);
routes.put('/classifications/:id', ClassificationController.update);
routes.delete('/classifications/:id', ClassificationController.delete);
routes.get('/units', UnitController.index);
routes.post('/units', UnitController.store);
routes.put('/units/:id', UnitController.update);
routes.delete('/units/:id', UnitController.delete);

export default routes;
