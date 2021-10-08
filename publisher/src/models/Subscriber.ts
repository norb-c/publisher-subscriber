import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { ISubscriberAttributes } from '../interfaces/subscriber.interface';

type CreationAttributes = Optional<ISubscriberAttributes, 'id'>;

class Subscriber extends Model<ISubscriberAttributes, CreationAttributes> {
  id: number;

  topic_id: number;

  url: string;

  readonly created_at: Date;

  readonly updated_at: Date;
}

Subscriber.init(
  {
    id: {
      type: DataTypes.INTEGER().UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    topic_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'subscribers',
    sequelize
  }
);

export { Subscriber };
