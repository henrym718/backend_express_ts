import express, { Router, Response, Request } from "express";

class ProductRoutes {
  private router: express.Router;

  constructor() {
    this.router = Router();
    this.handleRoutes();
  }

  getRouter() {
    return this.router;
  }

  private handleRoutes() {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Hola mundo desde una router v1");
    });
  }
}

const productRouter = new ProductRoutes().getRouter();
export { productRouter };
