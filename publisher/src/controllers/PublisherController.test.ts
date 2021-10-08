import 'reflect-metadata';

import { getMockReq, getMockRes } from '@jest-mock/express';
import PublisherService from '../services/PublisherService';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';
import { Queue } from '../events/Queue';
import PublisherController from './PublisherController';
import { InternalServerError } from '../exceptions';

describe('PublisherController', () => {
  it('Should successfully publish event', async () => {
    const publisherService = new PublisherService(new TopicRepository(), new SubscriberRepository(), new Queue());
    publisherService.publish = jest.fn().mockImplementationOnce(() => {});
    const publisherController = new PublisherController(publisherService);

    const req = getMockReq({
      body: { hello: 'hello event' },
      params: { topic: 'topic1' }
    });
    const { res, next } = getMockRes();

    await publisherController.publish(req, res, next);
    expect(publisherService.publish).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully published an event' });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('Should fail to publish event', async () => {
    const _topicRepo = new TopicRepository();

    _topicRepo.findTopic = jest.fn().mockImplementationOnce(() => {
      throw new InternalServerError('An error occured');
    });

    const publisherService = new PublisherService(_topicRepo, new SubscriberRepository(), new Queue());
    const publisherController = new PublisherController(publisherService);

    const req = getMockReq({
      body: { hello: 'hello event' },
      params: { topic: 'topic1' }
    });
    const { res, next } = getMockRes();

    await publisherController.publish(req, res, next);
    // expect(publisherService.publish).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new InternalServerError('An error occured'));
  });
});
