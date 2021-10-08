import { injectable } from 'inversify';

import { RequestHandler } from 'express';
import PublisherService from '../services/PublisherService';

@injectable()
export default class PublisherController {
  constructor(private readonly _service: PublisherService) {}

  public publish: RequestHandler = async (req, res, next) => {
    const data = req.body as any;
    const topic = req.params.topic;

    try {
      await this._service.publish(topic, data);
      res.status(200).json({ message: 'Successfully published an event' });
    } catch (error) {
      next(error);
    }
  };
}
