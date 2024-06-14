// lib/models/Promotion.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

export interface PromotionAttributes {
  id: number;
  platform: string;
  code: string;
  title: string;
  description: string;
  url: string;
  image: string;
  postedDatetime: Date;
  leagueName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PromotionCreationAttributes
  extends Optional<PromotionAttributes, "id"> {}

class Promotion
  extends Model<PromotionAttributes, PromotionCreationAttributes>
  implements PromotionAttributes
{
  public id!: number;
  public platform!: string;
  public code!: string;
  public title!: string;
  public description!: string;
  public url!: string;
  public image!: string;
  public postedDatetime!: Date;
  public leagueName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Promotion.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    leagueName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Promotion",
    tableName: "promotions",
  }
);

export default Promotion;
