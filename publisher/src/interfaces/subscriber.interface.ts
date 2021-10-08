import { WhereOptions, FindAttributeOptions } from 'sequelize/types';

export interface ISubscriberAttributes {
  id?: number;
  topic_id: number;
  url: string;
  deleted_at?: Date;
  created_at?: Date;
}

export interface ISubscriberRepository {
  findSubscribers(whereOptions: WhereOptions<ISubscriberAttributes>, attributesOptions?: FindAttributeOptions): Promise<ISubscriberAttributes[]>;
  createSubscriber(payload: ISubscriberAttributes): Promise<ISubscriberAttributes>;
}

export interface ISubscribeResponse {
  url: string;
  topic: string;
}

export interface IPublishDataProp {
  topic: string;
  data: any;
}

export interface IPublishMessageProp {
  url: string;
  body: IPublishDataProp;
}

export interface ISubscriberService {
  subscribe(topic: string, url: string): Promise<ISubscribeResponse>;
}
