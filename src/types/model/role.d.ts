import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    id: CreationOptional<number>;
    name: string;
    status: number;
    priority: number;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}