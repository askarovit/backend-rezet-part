import { Application } from 'express';

/**
 * methods GET, POST, Controller that decorators
 */
const MethodEnum = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  USE: 'use',
  DELETE: 'delete'
};

interface IPropertyRoute {
  method: string;
  path: string;
  func: Function;
  validate?: Object;
  propertyKey?: string;
}

let targets = new Set();

export const initRoute = (app: Application) => {
  try {
    if (app) {
      targets.forEach((item: {ctrl: Array<IPropertyRoute>, path: string}) => {
        item.ctrl.forEach((route: IPropertyRoute) => {
          app[route.method](item.path + route.path, route.func);
        });
      });

      /**
       *  If not found any API
       */
      app.use((req, res) => {
        res.status(404)
          .send({
            error: 'Not found API',
            data: null
          })
      });
    }
  } catch (err) {
    console.log('ERROR ', err.message)
  }

};

export const Controller = (path: string) => {
  return (controller: Function) => {
    if (controller.prototype.routes) {
      const body = {
        path,                              // path controller
        ctrl: controller.prototype.routes, // path to controller methods
      };
      targets.add(body);
    }
  };
};

export const GET = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    addEndpointPath(MethodEnum.GET, path, target, descriptor, propertyKey);
  };
};

export const POST = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    addEndpointPath(MethodEnum.POST, path, target, descriptor, propertyKey);
  };
};

export const PUT = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    addEndpointPath(MethodEnum.PUT, path, target, descriptor, propertyKey);
  };
};

export const DELETE = (path: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    addEndpointPath(MethodEnum.DELETE, path, target, descriptor, propertyKey);
  };
};

const addEndpointPath = (method: string,
                         path: string,
                         target: any,
                         descriptor: PropertyDescriptor,
                         propertyKey: string) => {
  if (!target.hasOwnProperty('routes')) {
    Object.defineProperty(target, 'routes', {
      value: [],
      configurable: false,
      writable: false,
      enumerable: false
    });
  }
  const propertyRoute: IPropertyRoute = {
    method,
    path,
    func: descriptor.value,
    propertyKey
  };
  target.routes.push(propertyRoute);
};