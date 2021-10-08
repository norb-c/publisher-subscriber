import 'reflect-metadata';

import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';
import SubscriberService from './SubscriberService';

describe('SubscriberService', () => {
  const topic = {
    id: 1,
    name: 'topic'
  };

  const subscribers = {
    id: 1,
    topic_id: 2,
    url: 'https://facebook.com'
  };

  it('Successfully subscriber to existing topic', async () => {
    const url = 'https://facebook.com';
    const _topicRepo = new TopicRepository();
    const _subsRepo = new SubscriberRepository();

    _topicRepo.findTopic = jest.fn().mockImplementation(() => Promise.resolve(topic));
    _topicRepo.createTopic = jest.fn().mockImplementation(() => {});
    _subsRepo.createSubscriber = jest.fn().mockImplementation(() => Promise.resolve(subscribers));

    const subscriberService = new SubscriberService(_topicRepo, _subsRepo);

    expect(subscriberService.subscribe).toBeDefined();
    expect(_topicRepo.findTopic).toBeDefined();
    expect(_topicRepo.createTopic).toBeDefined();

    expect(await subscriberService.subscribe('topic1', url)).toMatchObject({ url, topic: 'topic1' });
    expect(_topicRepo.findTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledTimes(0);
    expect(_subsRepo.createSubscriber).toHaveBeenCalledTimes(1);
    expect(_subsRepo.createSubscriber).toHaveBeenCalledWith({ topic_id: topic.id, url });
  });

  it('Successfully create a new topic and subscriber to it', async () => {
    const url = 'https://facebook.com';
    const _topicRepo = new TopicRepository();
    const _subsRepo = new SubscriberRepository();

    _topicRepo.findTopic = jest.fn().mockImplementation(() => Promise.resolve(null));
    _topicRepo.createTopic = jest.fn().mockImplementation(() => Promise.resolve(topic));
    _subsRepo.createSubscriber = jest.fn().mockImplementation(() => Promise.resolve(subscribers));

    const subscriberService = new SubscriberService(_topicRepo, _subsRepo);

    expect(subscriberService.subscribe).toBeDefined();
    expect(_topicRepo.findTopic).toBeDefined();
    expect(_topicRepo.createTopic).toBeDefined();

    expect(await subscriberService.subscribe('topic1', url)).toMatchObject({ url, topic: 'topic1' });
    expect(_topicRepo.findTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledTimes(1);
    expect(_topicRepo.createTopic).toHaveBeenCalledWith({ name: 'topic1' });
    expect(_subsRepo.createSubscriber).toHaveBeenCalledTimes(1);
    expect(_subsRepo.createSubscriber).toHaveBeenCalledWith({ topic_id: topic.id, url });
  });
});
