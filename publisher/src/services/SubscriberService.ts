import { injectable } from 'inversify';

import { ISubscriberService, ISubscribeResponse } from '../interfaces/subscriber.interface';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';

@injectable()
export default class SubscriberService implements ISubscriberService {
  constructor(private readonly _topicRepo: TopicRepository, private _subscriberRepo: SubscriberRepository) {}

  public async subscribe(topic: string, url: string): Promise<ISubscribeResponse> {
    let tpx = await this._topicRepo.findTopic({ name: topic });
    
    if (!tpx) tpx = await this._topicRepo.createTopic({ name: topic });

    await this._subscriberRepo.createSubscriber({ topic_id: tpx.id, url });
    return {
      url,
      topic
    };
  }
}
