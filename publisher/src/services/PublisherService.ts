import { injectable } from 'inversify';

import { Queue } from '../events/Queue';
import { ISubscriberAttributes, IPublishDataProp } from '../interfaces/subscriber.interface';
import { IPublisherService } from '../interfaces/topic.interface';
import TopicRepository from '../repositories/PublisherRepository';
import SubscriberRepository from '../repositories/SubscriberRepository';

@injectable()
export default class PublisherService implements IPublisherService {
  constructor(private _topicRepo: TopicRepository, private _subscriberRepo: SubscriberRepository, private _queue: Queue) {}

  public async publish(topic: string, data: any): Promise<void> {
    let tpx = await this._topicRepo.findTopic({ name: topic });

    if (!tpx) {
      tpx = await this._topicRepo.createTopic({ name: topic });
    }
    const subscriber = await this._subscriberRepo.findSubscribers({ topic_id: tpx.id });

    await this.sendMessageToQueue({ topic: topic, data }, subscriber);
  }

  private async sendMessageToQueue(data: IPublishDataProp, subscriber: ISubscriberAttributes[]): Promise<void> {
    const arr = [];
    for (let i = 0; i < subscriber.length; i++) {
      const sub = subscriber[i];
      arr.push(this._queue.publishMessage({ url: sub.url, body: data }));
    }
    Promise.all(arr);
  }
}
