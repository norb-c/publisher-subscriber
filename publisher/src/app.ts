import express from 'express';
import { Errors } from './common/errors';
import { handleErrors } from './middlewares/error.middleware';
import { routes } from './routes/index.routes';
import { Consumer } from './events/Consumer';

class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PUBLISHER_PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Publisher listening on port ${this.port} ${process.env.NODE_ENV}`);
      this.startConsumer();
    });
  }

  public startConsumer() {
    new Consumer().start();
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/', routes());

    this.app.get('/', (req, res) => {
      return res.status(200).json({
        status: true,
        message: 'success',
        data: {}
      });
    });

    this.app.all('*', (req, res) => {
      return res.status(404).json({
        status: false,
        error: 'not_found',
        message: Errors.RESOURCE_NOT_FOUND,
        path: req.url,
        data: {}
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(handleErrors);
  }
}

export default App;
