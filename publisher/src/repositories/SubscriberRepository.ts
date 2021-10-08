import { injectable } from 'inversify';

import { FindAttributeOptions, WhereOptions } from 'sequelize';
import { ISubscriberAttributes, ISubscriberRepository } from '../interfaces/subscriber.interface';
import { Subscriber } from '../models/Subscriber';

@injectable()
export default class SubscriberRepository implements ISubscriberRepository {
  private model = Subscriber;

  public async findSubscribers(
    whereOptions: WhereOptions<ISubscriberAttributes>,
    attributesOptions?: FindAttributeOptions
  ): Promise<ISubscriberAttributes[]> {
    return this.model.findAll({ where: whereOptions, ...(attributesOptions && { attributes: attributesOptions }) });
  }

  public async createSubscriber(payload: ISubscriberAttributes): Promise<ISubscriberAttributes> {
    return this.model.create(payload);
  }
}
