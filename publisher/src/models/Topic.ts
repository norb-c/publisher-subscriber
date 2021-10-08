import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { ITopicAttributes } from '../interfaces/topic.interface';

type CreationAttributes = Optional<ITopicAttributes, 'id'>;

class Topics extends Model<ITopicAttributes, CreationAttributes> {
  id: number;

  name: string;

  readonly created_at: Date;

  readonly updated_at: Date;
}

Topics.init(
  {
    id: {
      type: DataTypes.INTEGER().UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
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
    tableName: 'topics',
    sequelize
  }
);

export { Topics };
