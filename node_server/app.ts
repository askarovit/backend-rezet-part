import express, { Application }  from 'express';
import { json, urlencoded } from 'body-parser';
import cors  from 'cors';

const WHITE_LIST = [
  'https://localhost:433'
];

class App {
  private static instance: App;
  private static app: Application;

  private constructor() {
    App.app = express();

    App.app.use((req, res, next) => {
      const h = req.headers;

      /** On the PROD this condition need to change on the REAL-IP */
      const getIp = `${h['x-forwarded-proto']}://${h['x-forwarded-host']}:${h['x-forwarded-port']}`;

      if (WHITE_LIST.includes(getIp)) {
        return next();
      }
      res.status(405).json('The request Not Allowed');
    });

    App.app.use(cors());
    App.app.use(json());
    App.app.use(urlencoded({
      extended: false
    }));
  }

  public static getApp() {
    if(!App.instance) {
      App.instance = new App();
    }
    return this.app;
  }
}

export default App.getApp();