import { Container } from 'inversify';
import PublisherController from '../controllers/PublisherController';
import SubscriberController from '../controllers/SubscriberController';
import { Queue } from '../events/Queue';
import { ISubscriberRepository, ISubscriberService } from '../interfaces/subscriber.interface';
import { IPublisherService, ITopicRepository } from '../interfaces/topic.interface';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';
import PublisherService from '../services/PublisherService';
import SubscriberService from '../services/SubscriberService';

const container = new Container();
// publishers
container.bind<ITopicRepository>(TopicRepository).toSelf();
container.bind<IPublisherService>(PublisherService).toSelf();
container.bind<PublisherController>(PublisherController).toSelf();

// subscribers
container.bind<ISubscriberRepository>(SubscriberRepository).toSelf();
container.bind<ISubscriberService>(SubscriberService).toSelf();
container.bind<SubscriberController>(SubscriberController).toSelf();

// Queue
container.bind<Queue>(Queue).toSelf();

export { container };
