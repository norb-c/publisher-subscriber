import 'reflect-metadata';

import { Queue } from '../events/Queue';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';
import PublisherService from './PublisherService';

describe('PublisherService', () => {
  const topic = {
    id: 1,
    name: 'topic'
  };

  const subscribers = {
    id: 1,
    topic_id: 2,
    url: 'https://facebook.com'
  };

  it('Successfully publish to existing topic', async () => {
    const _topicRepo = new TopicRepository();
    const _subsRepo = new SubscriberRepository();
    const queue = new Queue();

    _topicRepo.findTopic = jest.fn().mockImplementation(() => Promise.resolve(topic));
    _topicRepo.createTopic = jest.fn().mockImplementation(() => {});
    _subsRepo.findSubscribers = jest.fn().mockImplementation(() => Promise.resolve([subscribers]));
    queue.publishMessage = jest.fn().mockImplementation(() => {});

    const publisherService = new PublisherService(_topicRepo, _subsRepo, queue);

    expect(publisherService.publish).toBeDefined();
    expect(_topicRepo.findTopic).toBeDefined();
    expect(_topicRepo.createTopic).toBeDefined();

    expect(await publisherService.publish('topic', { hello: 'hello' }));
    expect(_topicRepo.findTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledTimes(0);
    expect(_subsRepo.findSubscribers).toHaveBeenCalledTimes(1);
    expect(_subsRepo.findSubscribers).toBeCalledWith({ topic_id: topic.id });
    expect(queue.publishMessage).toHaveBeenCalled();
  });

  it('not publish event if topic has no susbscribers', async () => {
    const _topicRepo = new TopicRepository();
    const _subsRepo = new SubscriberRepository();
    const queue = new Queue();

    _topicRepo.findTopic = jest.fn().mockImplementation(() => Promise.resolve(null));
    _topicRepo.createTopic = jest.fn().mockImplementation(() => Promise.resolve(topic));
    _subsRepo.findSubscribers = jest.fn().mockImplementation(() => Promise.resolve([]));
    queue.publishMessage = jest.fn().mockImplementation(() => {});

    const publisherService = new PublisherService(_topicRepo, _subsRepo, queue);

    expect(publisherService.publish).toBeDefined();
    expect(_topicRepo.findTopic).toBeDefined();
    expect(_topicRepo.createTopic).toBeDefined();

    expect(await publisherService.publish('topic1', { hello: 'hello' }));
    expect(_topicRepo.findTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledWith({ name: 'topic1' });
    expect(_subsRepo.findSubscribers).toHaveBeenCalledTimes(1);
    expect(_subsRepo.findSubscribers).toBeCalledWith({ topic_id: topic.id });
    expect(queue.publishMessage).toHaveBeenCalledTimes(0);
  });
});
