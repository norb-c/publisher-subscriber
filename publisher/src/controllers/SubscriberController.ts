import { injectable } from 'inversify';

import { RequestHandler } from 'express';
import SubscriberService from '../services/SubscriberService';

@injectable()
export default class SubscriberController {
  constructor(private readonly _service: SubscriberService) {}

  public subscribe: RequestHandler = async (req, res, next) => {
    const url = req.body.url as string;
    const topic = req.params.topic;

    try {
      const response = await this._service.subscribe(topic, url);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
