import { Request, Response, Next } from 'express';
import { Controller, GET, POST } from '@route-layer';
import * as service from  './service';

@Controller('/carts')
class CartsController {

  @GET('/')
  async getCarts(req: Request, res: Response, next: Next) {
    try {
      const { data } = await service.getListCarts();
      res.json({ data })
    } catch(err) {
      next(err.message);
    }
  }

  @POST('/makepayment')
  async payment(req: Request, res: Response, next) {
    try {
      const data = await service.makePayment(req.body);
      res.json({ data })
    } catch(err) {
      next(err.message);
    }
  }
}


