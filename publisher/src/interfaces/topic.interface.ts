import { WhereOptions, FindAttributeOptions } from 'sequelize/types';
import { IPublishDataProp, ISubscriberAttributes } from './subscriber.interface';

export interface ITopicAttributes {
  id?: number;
  name: string;
  deleted_at?: Date;
  created_at?: Date;
}

export interface ITopicRepository {
  findTopic(whereOptions: WhereOptions<ITopicAttributes>, attributesOptions?: FindAttributeOptions): Promise<ITopicAttributes>;

  createTopic(payload: ITopicAttributes): Promise<ITopicAttributes>;
}

export interface IPublishData {
  topic: string;
  data: { [key: string]: string };
}

export interface IPublisherService {
  publish(topic: string, data: { [key: string]: string }): Promise<void>;
}
