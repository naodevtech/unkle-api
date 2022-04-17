import { createContainer, asClass, Lifetime, asValue } from 'awilix';

import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Server from './config/server';
import config from './config/environment';

import { ApiError, handleError } from './helpers/error';
import responseHandler from './helpers/response';

const container = createContainer();

const router = Router();

container.register({
  config: asValue(config),
  express: asValue(express),
  router: asValue(router),
  cors: asValue(cors),
  path: asValue(path),
  ApiError: asValue(ApiError),
  handleError: asValue(handleError),
  responseHandler: asValue(responseHandler),
  cookieParser: asValue(cookieParser),
  jwt: asValue(jwt),
  bcrypt: asValue(bcrypt)
});

container.loadModules(
  [
    'modules/**/*!(Dao$).js',
    'middlewares/*!(index).js',
    'libs/*!(index).js',
    'helpers/*!(index).js'
  ],
  {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    },
    cwd: __dirname
  }
);

container.loadModules(['modules/**/*Dao.js'], {
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asValue
  },
  cwd: __dirname
});

const routesName = Object.keys(container.registrations).filter((item) =>
  item.match(/Router$/g)
);

const routes = routesName.map((route) => container.resolve(route));

container.register({
  routes: asValue(routes),
  server: asClass(Server).singleton()
});

export default container;