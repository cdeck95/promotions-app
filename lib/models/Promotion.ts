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
  postedDateTime: Date;
  leagueName: string | null;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  applicableState: string | null;
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
  public postedDateTime!: Date;
  public leagueName!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public featured!: boolean;
  public applicableState!: string | null;
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
    postedDateTime: {
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
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    applicableState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Promotion",
    tableName: "promotions",
  }
);

export default Promotion;
