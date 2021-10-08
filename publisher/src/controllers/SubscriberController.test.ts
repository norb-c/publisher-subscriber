import 'reflect-metadata';

import { getMockReq, getMockRes } from '@jest-mock/express';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';
import SubscriberService from '../services/SubscriberService';
import SubscriberController from './SubscriberController';
import { BadRequestError, InternalServerError } from '../exceptions';

describe('SubscriberController', () => {
  it('Should successfully subscribe to topic', async () => {
    const subscriberService = new SubscriberService(new TopicRepository(), new SubscriberRepository());
    const url = 'https://facebook.com';
    const topic = 'topic1';

    subscriberService.subscribe = jest.fn().mockImplementation(() => {
      return {
        url,
        topic
      };
    });
    const subscriberController = new SubscriberController(subscriberService);

    const req = getMockReq({
      body: { url },
      params: { topic }
    });
    const { res, next } = getMockRes();

    await subscriberController.subscribe(req, res, next);
    expect(subscriberService.subscribe).toHaveBeenCalledTimes(1);
    expect(subscriberService.subscribe).toHaveBeenCalledWith(topic, url);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url, topic });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('Should fail to subscriber to topic', async () => {
    const subscriberService = new SubscriberService(new TopicRepository(), new SubscriberRepository());
    subscriberService.subscribe = jest.fn().mockImplementation(() => {
      throw new BadRequestError('An error occureed');
    });
    const subscriberController = new SubscriberController(subscriberService);

    const req = getMockReq({
      body: { url: 'https://facebook.com' },
      params: { topic: 'topic1' }
    });
    const { res, next } = getMockRes();

    await subscriberController.subscribe(req, res, next);
    expect(subscriberService.subscribe).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new BadRequestError('An error occureed'));
  });
});
