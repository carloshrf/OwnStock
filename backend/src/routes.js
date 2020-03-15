import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import ClassificationController from './app/controllers/ClassificationController';
import UnitController from './app/controllers/UnitController';
import ProviderController from './app/controllers/ProviderController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/users/', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/classifications', ClassificationController.index);
routes.post('/classifications', ClassificationController.store);
routes.put('/classifications/:id', ClassificationController.update);
routes.delete('/classifications/:id', ClassificationController.delete);

routes.get('/units', UnitController.index);
routes.post('/units', UnitController.store);
routes.put('/units/:id', UnitController.update);
routes.delete('/units/:id', UnitController.delete);

routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.put('/providers/:id', ProviderController.update);
routes.delete('/providers/:id', ProviderController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
