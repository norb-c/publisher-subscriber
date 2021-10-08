import { injectable } from 'inversify';

import { FindAttributeOptions, WhereOptions } from 'sequelize';
import { ITopicAttributes, ITopicRepository } from '../interfaces/topic.interface';
import { Topics } from '../models/Topic';

@injectable()
export default class TopicRepository implements ITopicRepository {
  private model = Topics;

  public async findTopic(
    whereOptions: WhereOptions<ITopicAttributes>,
    attributesOptions?: FindAttributeOptions
  ): Promise<ITopicAttributes> {
    return this.model.findOne({ where: whereOptions, ...(attributesOptions && { attributes: attributesOptions }) });
  }

  public async createTopic(payload: ITopicAttributes): Promise<ITopicAttributes> {
    return this.model.create(payload);
  }
}
